import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

# --- Database (Postgres-ready) ---
# Example for Postgres:
# export DATABASE_URL="postgresql+psycopg2://user:pass@localhost:5432/yourdb"
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"sqlite:///{BASE_DIR / 'app.db'}",  # fallback for local dev
)

# --- Admin key (zero-trust style gateway for write access) ---
ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "changeme-admin-key")

# --- CORS / frontend origins ---
FRONTEND_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost",
    "http://192.168.1.174:5173"
]

# --- Media / file storage ---
# Keep using your existing uploads/ folder as private storage
PRIVATE_MEDIA_ROOT = BASE_DIR / "uploads"
PRIVATE_MEDIA_ROOT.mkdir(parents=True, exist_ok=True)

# Public media root for hero images, icons, etc.
PUBLIC_MEDIA_ROOT = BASE_DIR / "media_public"
PUBLIC_MEDIA_ROOT.mkdir(parents=True, exist_ok=True)

# URL prefix for static public files (we mount this in main.py)
PUBLIC_MEDIA_BASE_URL = "/media"