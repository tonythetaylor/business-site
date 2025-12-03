# Business Website Template (FastAPI + React + Docker)

<img width="1728" height="990" alt="Screenshot 2025-12-02 at 9 35 31 PM" src="https://github.com/user-attachments/assets/cb907301-d13e-40de-9c13-2045d5158591" />

This repository contains a fully functional **business website** template featuring:

- **React + Vite frontend**
- **FastAPI backend with admin API key authentication**
- **Dockerized full‑stack environment**
- **PostgreSQL database**
- **Admin CMS for editing content**
- **Secure resume uploads + media storage**
- **Dark mode + responsive UI**
- **Production‑ready architecture**

---

## Project Structure

```
business-site/
│
├── backend/                # FastAPI application
│   ├── app/
│   │   ├── routes/         # API routes (public + admin)
│   │   ├── services/       # Business logic
│   │   ├── models.py       # SQLAlchemy models
│   │   ├── schemas.py      # Pydantic models
│   │   ├── settings.py     # Config (reads env variables)
│   │   ├── storage.py      # Media storage logic
│   │   ├── main.py         # FastAPI app entrypoint
│   │   └── uploads/        # Private/public media files
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/               # React + Vite site
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   └── api/
│   ├── public/
│   └── package.json
│
├── nginx/
│   ├── Dockerfile
│   └── default.conf        # Serves frontend + proxies backend
│
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### 1. Install Dependencies

**Backend:**
```
cd backend
pip install -r requirements.txt
```

**Frontend:**
```
cd frontend
npm install
```

---

## Running with Docker (Recommended)

At the project root:

```
docker-compose up --build
```

This starts:

- **FastAPI backend** at http://localhost/api
- **React frontend** served through **NGINX** at http://localhost
- **PostgreSQL database**

---

## Admin Authentication

The backend uses a simple **Admin API Key** stored in environment variables:

```
ADMIN_API_KEY=super-secret-key-123
```

The frontend stores this key locally when logging into `/admin/login`.

All protected admin routes require:

```
x-api-key: <ADMIN_API_KEY>
```

---

## CMS Features

The admin dashboard includes:

- Editable **Hero**, **About**, **Services**, **Contact**, **Careers** content
- **Resume submission** from the careers page
- Admin-only **downloadable resumes** with auditing
- **Draft / Preview** workflow before publishing

---

## File Uploads

Uploaded files (resumes, images) are stored in:

```
backend/app/uploads/
```

Private files require a valid Admin API key to access.

---

## Environment Variables

Create a `.env` file in the backend:

```
ADMIN_API_KEY=your-key-here
DATABASE_URL=postgresql+psycopg2://user:pass@db:5432/business_site
```

Frontend `.env`:

```
VITE_API_BASE_URL=http://localhost
```

---

## Testing

FastAPI tests can be added under `backend/tests`.

To run:

```
pytest
```

---

## Production Deployment

You can deploy using:

- Docker Compose on a VPS
- AWS ECS Fargate
- Fly.io
- Render
- Railway

NGINX already reverse‑proxies requests between frontend and backend.

---

## Contributing

This template is modular — customize the:

- UI design
- API endpoints
- CMS structure
- Deployment pipeline

PRs welcome!

---

## License

This project is MIT licensed — free to modify or redistribute.

---

## Author

**Anthony A. Taylor**  
Security‑Focused Full Stack Engineer & DevSecOps Strategist  
GitHub: https://github.com/tonythetaylor
