// src/api/adminApplications.ts
import { apiClient } from "./client";

export interface AdminApplication {
  id: number;
  full_name: string;
  email: string;
  phone?: string | null;
  position: string;
  created_at: string;
  resume_file_id: number;
}

// Helper to get the admin API key from localStorage
function getAdminApiKey(): string {
  const key = localStorage.getItem("adminApiKey") || "";
  return key;
}

/**
 * Fetch career applications (optionally filtered by role).
 */
export async function fetchAdminApplications(roleFilter?: string) {
  const apiKey = getAdminApiKey();
  if (!apiKey) {
    throw new Error("Missing admin API key; please log in again.");
  }

  const res = await apiClient.get<AdminApplication[]>(
    "/api/admin/applications",
    {
      params: roleFilter ? { role: roleFilter } : {},
      headers: {
        "X-API-Key": apiKey,
      },
    }
  );

  return res.data;
}

/**
 * Download a resume file by ID, using X-API-Key and handling blob.
 */
export async function downloadResume(resumeFileId: number) {
  const apiKey = getAdminApiKey();
  if (!apiKey) {
    throw new Error("Missing admin API key; please log in again.");
  }

  const res = await apiClient.get(`/api/admin/files/${resumeFileId}`, {
    responseType: "blob",
    headers: {
      "X-API-Key": apiKey,
    },
  });

  // Try to derive a nice filename from Content-Disposition if present
  const disposition = res.headers["content-disposition"] || "";
  let filename = "resume.docx";
  const match = /filename="?([^"]+)"?/.exec(disposition);
  if (match?.[1]) {
    filename = match[1];
  }

  const blob = new Blob([res.data], {
    type: res.headers["content-type"] || "application/octet-stream",
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}