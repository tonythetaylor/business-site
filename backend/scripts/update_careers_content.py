# backend/app/scripts/update_careers_content.py

import json

from backend.database import SessionLocal
from backend.models import ContentVersion
from backend.app.services.content_service import (
    get_default_content,
    save_content_to_db,
)


def main() -> None:
    db = SessionLocal()
    try:
        # 1) Load the latest content from DB
        latest = (
            db.query(ContentVersion)
            .order_by(ContentVersion.version.desc())
            .first()
        )
        if latest is None:
            # If nothing exists yet, just seed with full defaults
            new_content = get_default_content()
            save_content_to_db(db, new_content)
            print("No existing content. Seeded defaults including new careers.")
            return

        current = json.loads(latest.content_json)

        # 2) Get the *updated* defaults (where you added ~50 positions + salaries)
        defaults = get_default_content()

        # 3) Replace ONLY the careers section
        current["careers"] = defaults["careers"]

        # 4) Save as a new version
        new_version = save_content_to_db(db, current)
        print(f"Updated careers content saved as version {new_version}.")

    finally:
        db.close()


if __name__ == "__main__":
    main()