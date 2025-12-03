# backend/app/services/content_service.py

from typing import Any, Dict, Optional
import json
import os

from sqlalchemy.orm import Session

from ...database import SessionLocal   # only if you need it directly
from ...models import ContentVersion

# Simple admin API key
ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "changeme-admin-key")


def get_default_content() -> Dict[str, Any]:
    return {
        "hero": {
            "headline": "Helping clients build modern solutions.",
            "subheadline": "Short value prop about what the business actually does.",
            "primaryCtaLabel": "Get in touch",
            "primaryCtaHref": "/contact",
        },
        "about": {
            "title": "About Us",
            "body": [
                "Tell the story of the business, mission, vision, and what makes them different.",
                "Add timeline, credentials, certifications, or leadership bios here later.",
            ],
        },
        "services": [
            {
                "title": "Service One",
                "description": "Short description of service one.",
            },
            {
                "title": "Service Two",
                "description": "Short description of service two.",
            },
            {
                "title": "Service Three",
                "description": "Short description of service three.",
            },
        ],
        "careers": {
            "intro": "We hire smart, self-directed people who thrive in modern cloud, security, and consulting environments.",
            "positions": [
                {
                    "title": "Software Engineer",
                    "summary": "Build modern cloud-native applications using Python, React, and DevSecOps best practices.",
                    "tags": ["Cloud", "DevSecOps", "Backend", "Full-Stack"],
                },
                {
                    "title": "Technical Writer",
                    "summary": "Create clear, accurate documentation for security processes, cloud architectures, and technical deliverables.",
                    "tags": ["Writing", "Documentation", "Security"],
                },
                {
                    "title": "Business Analyst",
                    "summary": "Work with clients to gather requirements, translate needs into technical documentation, and support delivery teams.",
                    "tags": ["Analysis", "Consulting", "Process"],
                },
                {
                    "title": "IT Security Consultant",
                    "summary": "Support compliance, vulnerability assessments, and cybersecurity readiness across client systems.",
                    "tags": ["Cybersecurity", "Compliance", "Consulting"],
                },
                {
                    "title": "General Application",
                    "summary": "If your skillset doesn’t fit a listed role, submit a general application.",
                    "tags": ["General"],
                },
            ],
        },
        "contact": {
            "intro": "Have questions or want to discuss a project? Send us a message.",
            "email": "info@example.com",
            "phone": "+1 (555) 555-5555",
            "address": "123 Business Street, City, State",
        },
    }


def load_content_from_db(db: Session) -> Dict[str, Any]:
    """
    Get the latest content version. If none exists, seed with defaults.
    """
    latest: Optional[ContentVersion] = (
        db.query(ContentVersion)
        .order_by(ContentVersion.version.desc())
        .first()
    )

    if latest is None:
        default = get_default_content()
        seed = ContentVersion(version=1, content_json=json.dumps(default))
        db.add(seed)
        db.commit()
        db.refresh(seed)
        return default

    return json.loads(latest.content_json)


def save_content_to_db(db: Session, new_content: Dict[str, Any]) -> int:
    """
    Save a new version of the content and return version number.
    """
    latest: Optional[ContentVersion] = (
        db.query(ContentVersion)
        .order_by(ContentVersion.version.desc())
        .first()
    )

    new_version = 1 if latest is None else latest.version + 1

    record = ContentVersion(
        version=new_version,
        content_json=json.dumps(new_content),
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return new_version