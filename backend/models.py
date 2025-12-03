from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    JSON,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base


class ContentVersion(Base):
    __tablename__ = "content_versions"
    id = Column(Integer, primary_key=True, index=True)
    version = Column(Integer, nullable=False, index=True)
    content_json = Column(JSON, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    created_by = Column(String(128), nullable=True)


class MediaAsset(Base):
    __tablename__ = "media_assets"

    id = Column(Integer, primary_key=True, index=True)
    kind = Column(String(64), nullable=False)

    storage_path = Column(String(512), nullable=False)
    storage_bucket = Column(String(256), nullable=True)

    mime_type = Column(String(128), nullable=True)
    size_bytes = Column(Integer, nullable=True)

    # NEW: integrity hash
    sha256_hash = Column(String(64), nullable=True)

    is_public = Column(Boolean, nullable=False, default=False)

    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    created_by = Column(String(128), nullable=True)

    applications = relationship("CareerApplication", back_populates="resume_file")


class CareerApplication(Base):
    __tablename__ = "career_applications"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(256), nullable=False)
    email = Column(String(256), nullable=False)
    phone = Column(String(64), nullable=True)
    position = Column(String(256), nullable=False)
    message = Column(String(4000), nullable=True)

    resume_file_id = Column(Integer, ForeignKey("media_assets.id"), nullable=False)
    resume_file = relationship("MediaAsset", back_populates="applications")

    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)


# NEW: download audit table
class DownloadAudit(Base):
    __tablename__ = "download_audits"

    id = Column(Integer, primary_key=True, index=True)
    asset_id = Column(Integer, ForeignKey("media_assets.id"), nullable=False)
    downloaded_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    downloaded_by = Column(String(128), nullable=True)