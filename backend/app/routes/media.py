from fastapi import APIRouter, UploadFile, File, HTTPException, Header, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import select

from ...database import get_db
from ...models import MediaAsset, DownloadAudit
from ...schemas import MediaUploadResponse
from ...storage import save_file_local
from ...settings import ADMIN_API_KEY, PRIVATE_MEDIA_ROOT

router = APIRouter(tags=["media"])  # main.py mounts with prefix="/api"


def verify_admin_api_key(x_api_key: str = Header(default=None)) -> None:
    if x_api_key != ADMIN_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")


ALLOWED_PUBLIC_MEDIA_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}


@router.post(
    "/media/upload-public",
    response_model=MediaUploadResponse,
    dependencies=[Depends(verify_admin_api_key)],
)
async def upload_public_media(
    file: UploadFile = File(...),
    kind: str = "hero_image",
    db: Session = Depends(get_db),
):
    if file.content_type not in ALLOWED_PUBLIC_MEDIA_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type for public media.",
        )

    storage_path, public_url, size_bytes, sha256_hash = await save_file_local(
        file=file,
        visibility="public",
        kind=kind,
    )

    asset = MediaAsset(
        kind=kind,
        storage_path=storage_path,
        storage_bucket=None,
        mime_type=file.content_type,
        size_bytes=size_bytes,
        sha256_hash=sha256_hash,
        is_public=True,
        created_by="admin",
    )
    db.add(asset)
    db.commit()
    db.refresh(asset)

    return MediaUploadResponse(
        id=asset.id,
        kind=asset.kind,
        url=public_url or None,
        storage_path=storage_path,
    )


@router.get(
    "/admin/files/{file_id}",
    dependencies=[Depends(verify_admin_api_key)],
)
def download_private_file(
    file_id: int,
    x_api_key: str = Header(default=None),
    db: Session = Depends(get_db),
):
    stmt = select(MediaAsset).where(MediaAsset.id == file_id)
    asset = db.execute(stmt).scalar_one_or_none()
    if not asset:
        raise HTTPException(status_code=404, detail="File not found")

    if asset.is_public:
        raise HTTPException(
            status_code=400,
            detail="This is a public asset; access it via its public URL.",
        )

    file_path = PRIVATE_MEDIA_ROOT / asset.storage_path
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File missing on disk")

    # Optional: verify integrity on download
    # (can be disabled if you think it's overkill)
    if asset.sha256_hash:
        import hashlib

        h = hashlib.sha256()
        with file_path.open("rb") as f:
            for chunk in iter(lambda: f.read(8192), b""):
                h.update(chunk)
        current_hash = h.hexdigest()
        if current_hash != asset.sha256_hash:
            raise HTTPException(
                status_code=500,
                detail="File hash mismatch. Stored file may be corrupted.",
            )

    # Audit log
    audit = DownloadAudit(
        asset_id=asset.id,
        downloaded_by=f"admin_api:{x_api_key[:4]}..." if x_api_key else "unknown",
    )
    db.add(audit)
    db.commit()

    return FileResponse(
        path=str(file_path),
        media_type=asset.mime_type or "application/octet-stream",
        filename=f"{asset.kind}-{asset.id}{file_path.suffix}",
    )