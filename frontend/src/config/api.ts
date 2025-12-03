// src/config/api.ts

// When running behind nginx in Docker, the API and frontend share the same origin.
// But allow override with .env if needed.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin + "/api";