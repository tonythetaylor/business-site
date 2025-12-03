import os
import secrets
import hashlib
from pathlib import Path
from typing import Literal, Tuple

from fastapi import UploadFile

from .settings import PUBLIC_MEDIA_ROOT, PRIVATE_MEDIA_ROOT, PUBLIC_MEDIA_BASE_URL

StorageVisibility = Literal["public", "private"]


def _safe_ext(filename: str) -> str:
    _, ext = os.path.splitext(filename)
    ext = ext.lower()
    if ext in {
        ".jpg", ".jpeg", ".png", ".webp", ".gif",
        ".pdf", ".doc", ".docx",
    }:
        return ext or ".bin"
    return ext or ".bin"


def _write_and_hash(src_file, dest: Path) -> tuple[int, str]:
    """
    Copy bytes from src_file → dest and compute size + SHA256.
    src_file must be a binary file-like object.
    """
    hasher = hashlib.sha256()
    size = 0

    with dest.open("wb") as out:
        while True:
            chunk = src_file.read(1024 * 1024)
            if not chunk:
                break
            size += len(chunk)
            hasher.update(chunk)
            out.write(chunk)

    return size, hasher.hexdigest()


async def save_file_local(
    file: UploadFile,
    *,
    visibility: StorageVisibility,
    kind: str,
) -> Tuple[str, str, int, str]:
    """
    Save file to local storage.
    Returns (storage_path, public_url, size_bytes, sha256_hex).
    """
    ext = _safe_ext(file.filename or "")
    token = secrets.token_hex(16)
    filename = f"{token}{ext}"

    if visibility == "public":
        base_dir: Path = PUBLIC_MEDIA_ROOT / kind
        base_dir.mkdir(parents=True, exist_ok=True)
        dest = base_dir / filename
        storage_path = f"{kind}/{filename}"
        public_url = f"{PUBLIC_MEDIA_BASE_URL}/{storage_path}"
    else:
        base_dir = PRIVATE_MEDIA_ROOT / kind
        base_dir.mkdir(parents=True, exist_ok=True)
        dest = base_dir / filename
        storage_path = f"{kind}/{filename}"
        public_url = ""

    # Make sure we're at the start of the upload stream
    await file.seek(0)
    size_bytes, sha256_hex = _write_and_hash(file.file, dest)
    # Reset again if caller wants to re-read
    await file.seek(0)

    return storage_path, public_url, size_bytes, sha256_hex