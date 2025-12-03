// frontend/src/api/adminHomeLayout.ts

import { apiClient } from "./client";

export type HomeLayoutVariant = "classic" | "sleek";

export interface HomeLayoutResponse {
  layoutVariant: HomeLayoutVariant;
}

const ADMIN_STORAGE_KEY = "adminApiKey";

function getAdminHeaders() {
  if (typeof window === "undefined") return {};
  const apiKey = window.localStorage.getItem(ADMIN_STORAGE_KEY);
  if (!apiKey) return {};
  return {
    "X-API-Key": apiKey,
  };
}

export async function fetchHomeLayout(): Promise<HomeLayoutResponse> {
  const headers = getAdminHeaders();

  const response = await apiClient.get<HomeLayoutResponse>(
    "/api/admin/home-layout",
    { headers }
  );

  return response.data;
}

export async function updateHomeLayout(
  layoutVariant: HomeLayoutVariant
): Promise<HomeLayoutResponse> {
  const headers = getAdminHeaders();

  const response = await apiClient.put<HomeLayoutResponse>(
    "/api/admin/home-layout",
    { layoutVariant },
    { headers }
  );

  return response.data;
}