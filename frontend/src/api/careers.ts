// src/api/careers.ts

import { apiClient } from "./client";

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

  try {
    const res = await apiClient.post("/api/careers/apply", formData);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const data = error.response.data;
      if (typeof data?.detail === "string") {
        throw new Error(data.detail);
      }
      if (typeof data === "string") {
        throw new Error(data);
      }
      throw new Error("Failed to submit application");
    }

    if (error.request) {
      throw new Error("Network error while submitting application");
    }

    throw new Error(error.message || "Failed to submit application");
  }
}