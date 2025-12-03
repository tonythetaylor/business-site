from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from ..settings import FRONTEND_ORIGINS, PUBLIC_MEDIA_ROOT
from ..database import Base, engine
from .routes import content as content_routes
from .routes import contact as contact_routes
from .routes import careers as careers_routes
from .routes import media as media_routes
from .routes import admin_applications as admin_applications_routes

# Create tables at startup (simple bootstrapping; Alembic later if you want)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Business Website API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "ok"}


# Routers – everything under /api/*
app.include_router(content_routes.router, prefix="/api")
app.include_router(contact_routes.router, prefix="/api")
app.include_router(careers_routes.router, prefix="/api")
app.include_router(media_routes.router, prefix="/api")
app.include_router(admin_applications_routes.router)

# Public media (hero images, icons, resumes if you expose them)
app.mount(
    "/media",
    StaticFiles(directory=str(PUBLIC_MEDIA_ROOT)),
    name="media",
)