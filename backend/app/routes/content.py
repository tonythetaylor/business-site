# backend/app/routes/content.py

from typing import Any, Dict, List, Literal
import json

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ...database import get_db
from ..services.content_service import (
    load_content_from_db,
    save_content_to_db,
    ADMIN_API_KEY,
)
from ...models import ContentVersion

HomeLayoutVariant = Literal["classic", "sleek"]

class HomeLayoutUpdate(BaseModel):
    layoutVariant: HomeLayoutVariant
    
router = APIRouter(tags=["content"])  # no prefix


def verify_admin_api_key(x_api_key: str | None = Header(default=None)) -> None:
    if x_api_key != ADMIN_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")


@router.get("/content", response_model=Dict[str, Any])
def get_content(db: Session = Depends(get_db)):
    """
    Public endpoint: frontend uses this to render the site.
    """
    return load_content_from_db(db)


@router.put("/content")
def update_content(
    new_content: Dict[str, Any],
    _: None = Depends(verify_admin_api_key),
    db: Session = Depends(get_db),
):
    """
    Admin-only: replace entire content with a new version.
    """
    version = save_content_to_db(db, new_content)
    return {"detail": f"Content updated. New version {version}"}


@router.get("/content/versions", response_model=List[Dict[str, Any]])
def list_versions(db: Session = Depends(get_db)):
    """
    Admin-only listing of versions (you can secure this later).
    """
    versions = (
        db.query(ContentVersion)
        .order_by(ContentVersion.version.desc())
        .all()
    )

    return [
        {
            "id": v.id,
            "version": v.version,
            "created_at": v.created_at,
        }
        for v in versions
    ]


@router.post("/content/rollback/{version}")
def rollback_content(
    version: int,
    _: None = Depends(verify_admin_api_key),
    db: Session = Depends(get_db),
):
    """
    Admin-only: rollback to a specific version by copying its JSON into a new version.
    """
    target = (
        db.query(ContentVersion)
        .filter(ContentVersion.version == version)
        .first()
    )

    if not target:
        raise HTTPException(status_code=404, detail="Version not found")

    new_version = save_content_to_db(db, json.loads(target.content_json))
    return {
        "detail": f"Rolled back to version {version}. New version {new_version} created."
    }
    
@router.get("/admin/home-layout", response_model=HomeLayoutUpdate)
def get_home_layout(
    _: None = Depends(verify_admin_api_key),
    db: Session = Depends(get_db),
):
    """
    Admin: get the current homepage layout variant.
    """
    content = load_content_from_db(db)
    hero = content.get("hero") or {}
    layout = hero.get("layoutVariant", "classic")
    if layout not in ("classic", "sleek"):
        layout = "classic"
    return HomeLayoutUpdate(layoutVariant=layout)


@router.put("/admin/home-layout", response_model=HomeLayoutUpdate)
def update_home_layout(
    update: HomeLayoutUpdate,
    _: None = Depends(verify_admin_api_key),
    db: Session = Depends(get_db),
):
    """
    Admin: update only the homepage layout variant, preserving the rest of the content.
    """
    content = load_content_from_db(db)
    hero = content.get("hero") or {}
    hero["layoutVariant"] = update.layoutVariant
    content["hero"] = hero

    # Save as a new ContentVersion row
    save_content_to_db(db, content)

    return update