from fastapi import APIRouter
from ...schemas import ContactRequest, ContactResponse

router = APIRouter(tags=["contact"])


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactRequest):
    # TODO: hook into email/CRM
    print("📩 New contact submission:", contact.dict())
    return ContactResponse(detail="Contact form submitted successfully.")