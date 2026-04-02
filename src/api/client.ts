import type { ApiError, QueryParams } from "@/types/api";
import { toast } from "sonner";

// ===== Config =====
export type AuthStrategy = "cookie" | "token";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";
const AUTH_STRATEGY: AuthStrategy = (import.meta.env.VITE_AUTH_STRATEGY as AuthStrategy) ?? "cookie";

// ===== Token storage (in-memory + localStorage fallback) =====
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    localStorage.setItem("crm_access_token", token);
  } else {
    localStorage.removeItem("crm_access_token");
  }
}

export function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  const stored = localStorage.getItem("crm_access_token");
  if (stored) accessToken = stored;
  return accessToken;
}

export function getAuthStrategy(): AuthStrategy {
  return AUTH_STRATEGY;
}

// ===== CSRF (for cookie strategy) =====
function getCsrfToken(): string | null {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : null;
}

// ===== Query string builder =====
function buildQueryString(params?: QueryParams): string {
  if (!params) return "";
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== "" && v !== null
  );
  if (entries.length === 0) return "";
  const qs = new URLSearchParams();
  entries.forEach(([k, v]) => qs.append(k, String(v)));
  return `?${qs.toString()}`;
}

// ===== Error handling =====
function formatError(data: ApiError | string): string {
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  if (data.message) return data.message;
  const firstKey = Object.keys(data)[0];
  if (firstKey) {
    const val = data[firstKey];
    if (Array.isArray(val)) return `${firstKey}: ${val.join(", ")}`;
    return `${firstKey}: ${String(val)}`;
  }
  return "Ocorreu um erro inesperado.";
}

// ===== Core fetch wrapper =====
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  params?: QueryParams
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}${buildQueryString(params)}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  // Auth headers
  if (AUTH_STRATEGY === "token") {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  if (AUTH_STRATEGY === "cookie") {
    const method = (options.method ?? "GET").toUpperCase();
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      const csrf = getCsrfToken();
      if (csrf) headers["X-CSRFToken"] = csrf;
    }
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: AUTH_STRATEGY === "cookie" ? "include" : "same-origin",
  };

  const response = await fetch(url, config);

  // Handle 204 No Content
  if (response.status === 204) return undefined as T;

  // Handle 401 → redirect to login
  if (response.status === 401) {
    if (AUTH_STRATEGY === "token") {
      setAccessToken(null);
    }
    // Only redirect if not already on login
    if (!window.location.pathname.startsWith("/login")) {
      window.location.href = "/login";
    }
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  let data: T | ApiError;
  try {
    data = await response.json();
  } catch {
    throw new Error("Resposta inválida do servidor.");
  }

  if (!response.ok) {
    const errorMsg = formatError(data as ApiError);
    toast.error(errorMsg);
    throw new Error(errorMsg);
  }

  return data as T;
}

// ===== Convenience methods =====
export const api = {
  get<T>(endpoint: string, params?: QueryParams) {
    return apiRequest<T>(endpoint, { method: "GET" }, params);
  },
  post<T>(endpoint: string, body?: unknown) {
    return apiRequest<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },
  patch<T>(endpoint: string, body?: unknown) {
    return apiRequest<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  },
  delete<T = void>(endpoint: string) {
    return apiRequest<T>(endpoint, { method: "DELETE" });
  },
};
