# backend/app/routes/admin_applications.py
from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from ...database import get_db
from ...models import CareerApplication, MediaAsset
from ...settings import ADMIN_API_KEY

router = APIRouter(prefix="/api/admin", tags=["admin-applications"])

def verify_admin_api_key(x_api_key: str | None = Header(default=None)) -> None:
    if x_api_key != ADMIN_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")

@router.get("/applications", dependencies=[Depends(verify_admin_api_key)])
def list_applications(db: Session = Depends(get_db)):
    apps = (
        db.query(CareerApplication)
        .order_by(CareerApplication.created_at.desc())
        .all()
    )
    return [
        {
            "id": a.id,
            "full_name": a.full_name,
            "email": a.email,
            "position": a.position,
            "created_at": a.created_at,
            "resume_file_id": a.resume_file_id,
        }
        for a in apps
    ]