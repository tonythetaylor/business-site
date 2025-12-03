FROM python:3.12-slim AS base

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install deps
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend package (including app/, settings.py, database.py, uploads/, etc.)
COPY backend /app/backend

# Make sure upload dirs exist (optional safety)
RUN mkdir -p /app/backend/uploads/public /app/backend/uploads/private

EXPOSE 8000

# Note the module path here: backend.app.main:app
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]