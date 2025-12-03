from typing import Optional, List, Dict, Any
from pydantic import BaseModel, EmailStr
from datetime import datetime


# ----- Contact -----

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


class ContactResponse(BaseModel):
    detail: str


# ----- Careers -----

class CareerApplicationResponse(BaseModel):
    detail: str

class CareerApplicationAdmin(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str | None = None
    position: str
    created_at: datetime
    resume_file_id: int

    class Config:
        orm_mode = True

# ----- Content versioning -----

class ContentUpdateResponse(BaseModel):
    detail: str


class ContentVersionInfo(BaseModel):
    id: int
    version: int
    is_active: bool
    created_at: str
    created_by: Optional[str]


# ----- Media -----

class MediaUploadResponse(BaseModel):
    id: int
    kind: str
    url: Optional[str]
    storage_path: str