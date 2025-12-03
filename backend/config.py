import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# --- Database ---
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    # For quick local dev; override with Postgres:
    # e.g. postgresql+psycopg2://user:pass@localhost:5432/yourdb
    f"sqlite:///{BASE_DIR / 'app.db'}",
)

# --- Admin key (zero-trust style gateway) ---
ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "changeme-admin-key")

# --- CORS / frontend origins ---
FRONTEND_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost",
]

# --- Media / file storage ---
PUBLIC_MEDIA_ROOT = Path(os.getenv("PUBLIC_MEDIA_ROOT", BASE_DIR / "media_public"))
PRIVATE_MEDIA_ROOT = Path(os.getenv("PRIVATE_MEDIA_ROOT", BASE_DIR / "media_private"))

PUBLIC_MEDIA_ROOT.mkdir(parents=True, exist_ok=True)
PRIVATE_MEDIA_ROOT.mkdir(parents=True, exist_ok=True)

# URL prefix for public static files (mounted in main.py)
PUBLIC_MEDIA_BASE_URL = "/media"