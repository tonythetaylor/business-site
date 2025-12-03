from pathlib import Path
import os

# Root of the backend inside the container
BASE_DIR = Path(__file__).resolve().parent.parent

# All media lives under /app/uploads unless overridden
MEDIA_ROOT = Path(os.getenv("MEDIA_ROOT", BASE_DIR / "uploads"))

# Resume upload directory
RESUME_UPLOAD_DIR = MEDIA_ROOT / "resumes"
RESUME_UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Image upload directory (for About page, Services, etc.)
IMAGE_UPLOAD_DIR = MEDIA_ROOT / "images"
IMAGE_UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Admin key for content editing
ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "changeme-admin-key")

# Postgres connection string
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://business_app:super-strong-password-change-me@db:5432/business_site",
)