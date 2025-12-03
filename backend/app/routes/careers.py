from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, Header
from sqlalchemy.orm import Session

from ...database import get_db
from ...models import MediaAsset, CareerApplication
from ...schemas import CareerApplicationResponse, CareerApplicationAdmin
from ...storage import save_file_local
from ...settings import PRIVATE_MEDIA_ROOT, ADMIN_API_KEY

router = APIRouter(tags=["careers"])

def verify_admin_api_key(x_api_key: str = Header(default=None)) -> None:
    if x_api_key != ADMIN_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")

@router.post("/careers/apply", response_model=CareerApplicationResponse)
async def apply_career(
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(None),
    position: str = Form(...),
    message: str = Form(None),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    allowed_types = {
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }
    if resume.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Allowed: PDF, DOC, DOCX.",
        )

    storage_path, _, size_bytes, sha256_hash = await save_file_local(
        file=resume,
        visibility="private",
        kind="resumes",
    )

    media = MediaAsset(
        kind="resume",
        storage_path=storage_path,
        storage_bucket=None,
        mime_type=resume.content_type,
        size_bytes=size_bytes,
        sha256_hash=sha256_hash,
        is_public=False,
        created_by=f"careers_form:{email}",
    )
    db.add(media)
    db.flush()

    application = CareerApplication(
        full_name=full_name,
        email=email,
        phone=phone,
        position=position,
        message=message,
        resume_file_id=media.id,
    )
    db.add(application)
    db.commit()

    print(
        " New career application:",
        {
            "full_name": full_name,
            "email": email,
            "phone": phone,
            "position": position,
            "resume_file_id": media.id,
            "resume_path": str(PRIVATE_MEDIA_ROOT / storage_path),
            "size_bytes": size_bytes,
            "sha256": sha256_hash,
        },
    )

    return CareerApplicationResponse(detail="Application received successfully.")

@router.get(
    "/admin/applications",
    response_model=list[CareerApplicationAdmin],
    dependencies=[Depends(verify_admin_api_key)],
)
def list_applications(
    role: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(CareerApplication)
    if role:
        query = query.filter(CareerApplication.position.ilike(f"%{role}%"))
    apps = query.order_by(CareerApplication.created_at.desc()).all()
    return apps