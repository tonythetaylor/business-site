#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Scaffolding full business website (frontend + backend + nginx + docker-compose)..."

# --- Basic layout ---
mkdir -p backend/app
mkdir -p uploads/resumes
mkdir -p nginx

# --- Backend: requirements ---
cat > backend/requirements.txt << 'EOF'
fastapi
uvicorn[standard]
python-multipart
pydantic
EOF

# --- Backend: config.py ---
cat > backend/app/config.py << 'EOF'
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "uploads" / "resumes"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
EOF

# --- Backend: models.py ---
cat > backend/app/models.py << 'EOF'
from pydantic import BaseModel, EmailStr

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactResponse(BaseModel):
    detail: str

class CareerApplicationResponse(BaseModel):
    detail: str
EOF

# --- Backend: main.py ---
cat > backend/app/main.py << 'EOF'
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil
import uuid

from .config import UPLOAD_DIR
from .models import ContactRequest, ContactResponse, CareerApplicationResponse

app = FastAPI(title="Business Website API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactRequest):
    # TODO: integrate with real email or CRM
    print("📩 New contact submission:", contact.dict())
    return ContactResponse(detail="Contact form submitted successfully.")

@app.post("/api/careers/apply", response_model=CareerApplicationResponse)
async def apply_career(
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(None),
    position: str = Form(...),
    message: str = Form(None),
    resume: UploadFile = File(...),
):
    allowed_extensions = {".pdf", ".doc", ".docx"}
    suffix = Path(resume.filename).suffix.lower()

    if suffix not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Allowed: PDF, DOC, DOCX.",
        )

    unique_name = f"{uuid.uuid4().hex}{suffix}"
    dest_path = UPLOAD_DIR / unique_name

    with dest_path.open("wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    print("🧾 New career application:", {
        "full_name": full_name,
        "email": email,
        "phone": phone,
        "position": position,
        "message": message,
        "resume_path": str(dest_path),
    })

    return CareerApplicationResponse(detail="Application received successfully.")
EOF

# --- Backend: Dockerfile ---
cat > backend/Dockerfile << 'EOF'
FROM python:3.12-slim AS base

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/app /app/app
COPY uploads /app/uploads

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

# --- Nginx Dockerfile: multi-stage (build frontend + serve static + proxy to backend) ---
cat > nginx/Dockerfile << 'EOF'
# Frontend build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm install

# Copy rest of frontend source
COPY frontend ./
RUN npm run build

# Nginx runtime
FROM nginx:1.27-alpine

# Remove default config and add our own
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF

# --- Nginx config ---
cat > nginx/nginx.conf << 'EOF'
upstream backend_service {
    server backend:8000;
}

server {
    listen 80;
    server_name _;

    # Serve built frontend
    root   /usr/share/nginx/html;
    index  index.html;

    # API proxy
    location /api/ {
        proxy_pass         http://backend_service;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /health {
        proxy_pass http://backend_service/health;
    }

    # SPA fallback: always serve index.html for unknown routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Basic logging (can be tuned per env)
    access_log  /var/log/nginx/access.log;
    error_log   /var/log/nginx/error.log warn;
}
EOF

# --- docker-compose.yml ---
cat > docker-compose.yml << 'EOF'
services:
  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile
    container_name: business_backend
    expose:
      - "8000"
    networks:
      - webnet

  web:
    build:
      context: .
    # Dockerfile defaults to ./Dockerfile, so we point explicitly:
      dockerfile: nginx/Dockerfile
    container_name: business_web
    depends_on:
      - backend
    ports:
      - "80:80"
    networks:
      - webnet

networks:
  webnet:
    driver: bridge
EOF

# --- Frontend scaffold using Vite + React + TS ---
if [ ! -d "frontend" ]; then
  echo "📦 Creating Vite React TypeScript app in ./frontend..."
  npm create vite@latest frontend -- --template react-ts
fi

cd frontend

echo "📦 Installing frontend dependencies..."
npm install
npm install tailwindcss @tailwindcss/vite react-router-dom

# --- Tailwind v4.1 + Vite config ---
cat > vite.config.ts << 'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
  },
});
EOF

# --- index.css with Tailwind 4.1 ---
cat > src/index.css << 'EOF'
@import "tailwindcss";

@theme {
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
    "Segoe UI", sans-serif;

  --color-brand: #4f46e5;
  --color-brand-foreground: #ffffff;
}

body {
  font-family: var(--font-sans);
  background-color: #f8fafc;
  color: #0f172a;
}
EOF

# --- main.tsx with Router ---
cat > src/main.tsx << 'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
EOF

# --- App.tsx ---
cat > src/App.tsx << 'EOF'
import { AppRouter } from "./routes/Router";

function App() {
  return <AppRouter />;
}

export default App;
EOF

# --- API base client ---
mkdir -p src/api
cat > src/api/client.ts << 'EOF'
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost";

export { API_BASE_URL };
EOF

# --- contact API ---
cat > src/api/contact.ts << 'EOF'
import { API_BASE_URL } from "./client";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(payload: ContactPayload) {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to submit contact form");
  }

  return res.json();
}
EOF

# --- careers API ---
cat > src/api/careers.ts << 'EOF'
import { API_BASE_URL } from "./client";

export interface CareerApplicationPayload {
  fullName: string;
  email: string;
  phone?: string;
  position: string;
  message?: string;
  resumeFile: File;
}

export async function submitApplication(payload: CareerApplicationPayload) {
  const formData = new FormData();
  formData.append("full_name", payload.fullName);
  formData.append("email", payload.email);
  if (payload.phone) formData.append("phone", payload.phone);
  formData.append("position", payload.position);
  if (payload.message) formData.append("message", payload.message);
  formData.append("resume", payload.resumeFile);

  const res = await fetch(`${API_BASE_URL}/api/careers/apply`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to submit application");
  }

  return res.json();
}
EOF

# --- Router + Layout + Pages ---
mkdir -p src/routes src/components src/pages

cat > src/routes/Router.tsx << 'EOF'
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import CareersPage from "../pages/CareersPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";

export const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};
EOF

# Layout
cat > src/components/Layout.tsx << 'EOF'
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
EOF

# Navbar
cat > src/components/Navbar.tsx << 'EOF'
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          <span className="text-slate-900">Client</span>
          <span className="text-indigo-600">Company</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "text-sm font-medium transition hover:text-indigo-600",
                  isActive ? "text-indigo-600" : "text-slate-700",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
EOF

# Footer
cat > src/components/Footer.tsx << 'EOF'
const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Client Company. All rights reserved.</p>
        <p>Designed & built by Your Name.</p>
      </div>
    </footer>
  );
};

export default Footer;
EOF

# Pages
cat > src/pages/HomePage.tsx << 'EOF'
const HomePage = () => {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Helping <span className="text-indigo-600">clients</span> build modern solutions.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Short value prop here – what your client&apos;s business actually does.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold">Service 1</h3>
          <p className="mt-2 text-sm text-slate-600">
            Brief description of a core offering.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold">Service 2</h3>
          <p className="mt-2 text-sm text-slate-600">
            Another main service offered.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold">Service 3</h3>
          <p className="mt-2 text-sm text-slate-600">
            A third offering to highlight.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
EOF

cat > src/pages/AboutPage.tsx << 'EOF'
const AboutPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
      <p className="text-slate-700">
        Tell the story of the business, mission, vision, and what makes them
        different. This is where you humanize the brand.
      </p>
      <p className="text-slate-700">
        Add timeline, credentials, certifications, or leadership bios here later.
      </p>
    </div>
  );
};

export default AboutPage;
EOF

cat > src/pages/ServicesPage.tsx << 'EOF'
const ServicesPage = () => {
  const services = [
    {
      title: "Service One",
      description: "Short description of service one.",
    },
    {
      title: "Service Two",
      description: "Short description of service two.",
    },
    {
      title: "Service Three",
      description: "Short description of service three.",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Services</h1>
      <p className="text-slate-700">
        Overview of the main services your client offers.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold">{service.title}</h2>
            <p className="mt-2 text-sm text-slate-600">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
EOF

cat > src/pages/CareersPage.tsx << 'EOF'
import { FormEvent, useState } from "react";
import { submitApplication } from "../api/careers";

const CareersPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setStatus("Please attach your resume.");
      return;
    }

    try {
      setSubmitting(true);
      setStatus(null);

      await submitApplication({
        fullName,
        email,
        phone,
        position,
        message,
        resumeFile,
      });

      setStatus("Application submitted successfully.");
      setFullName("");
      setEmail("");
      setPhone("");
      setPosition("");
      setMessage("");
      setResumeFile(null);
    } catch (err: any) {
      setStatus(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Careers</h1>
      <p className="text-slate-700">
        Interested in joining the team? Submit your information and resume below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Phone (optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Position
            </label>
            <input
              type="text"
              required
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Cover Letter / Message
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Resume (PDF / DOC)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            required
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setResumeFile(file);
            }}
            className="mt-1 w-full text-sm"
          />
        </div>

        {status && (
          <p className="text-sm text-slate-700">
            {status}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default CareersPage;
EOF

cat > src/pages/ContactPage.tsx << 'EOF'
import { FormEvent, useState } from "react";
import { submitContactForm } from "../api/contact";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setStatus(null);

      await submitContactForm({ name, email, subject, message });

      setStatus("Thanks for reaching out. We’ll be in touch soon.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setStatus(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="text-slate-700">
        Have questions or want to discuss a project? Send us a message.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Subject
          </label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1"
          />
        </div>

        {status && (
          <p className="text-sm text-slate-700">
            {status}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
EOF

cat > src/pages/NotFoundPage.tsx << 'EOF'
const NotFoundPage = () => (
  <div className="space-y-4 text-center">
    <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
    <p className="text-slate-600">
      The page you’re looking for doesn’t exist or has been moved.
    </p>
  </div>
);

export default NotFoundPage;
EOF

cd ..

# --- Root README ---
cat > README.md << 'EOF'
# Business Website Starter (React + Tailwind v4.1 + FastAPI + Nginx + Docker)

This is a full-stack starter for building a small business website with:

- **Frontend**: React + Vite + TypeScript + Tailwind CSS v4.1
- **Backend**: FastAPI (Python)
- **Web Server / Reverse Proxy**: Nginx
- **Container Orchestration**: Docker Compose

It supports:

- Marketing pages: **Home, About, Services**
- **Careers**: form with resume upload (PDF/DOC)
- **Contact**: form that posts to FastAPI
- Nginx serving built React app and proxying `/api/*` to the FastAPI backend.

---

## Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── config.py
│   │   ├── main.py
│   │   └── models.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── vite.config.ts
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf
├── uploads/
│   └── resumes/
├── docker-compose.yml
└── README.md
