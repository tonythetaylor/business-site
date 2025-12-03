// src/api/contact.ts

import { apiClient } from "./client";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Submit contact form to FastAPI backend.
 * POST /api/contact
 */
export async function submitContactForm(payload: ContactPayload) {
  try {
    // baseURL is API_BASE_URL, so we include the /api prefix here
    const res = await apiClient.post("/api/contact", payload);
    return res.data;
  } catch (error: any) {
    // Axios error handling
    if (error.response) {
      const data = error.response.data;

      if (typeof data?.detail === "string") {
        throw new Error(data.detail);
      }

      if (typeof data === "string") {
        throw new Error(data);
      }

      throw new Error("Failed to submit contact form");
    }

    if (error.request) {
      throw new Error("Network error while submitting contact form");
    }

    throw new Error(error.message || "Failed to submit contact form");
  }
}