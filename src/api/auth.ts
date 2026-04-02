import { api, setAccessToken, getAuthStrategy } from "./client";
import type { User, LoginCredentials, AuthTokens } from "@/types/api";

export async function login(credentials: LoginCredentials): Promise<User> {
  const strategy = getAuthStrategy();

  if (strategy === "token") {
    const tokens = await api.post<AuthTokens>("/auth/login/", credentials);
    setAccessToken(tokens.access);
  } else {
    await api.post("/auth/login/", credentials);
  }

  return getMe();
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout/");
  } finally {
    setAccessToken(null);
  }
}

export async function getMe(): Promise<User> {
  return api.get<User>("/auth/me/");
}
