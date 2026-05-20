import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "smarter2026";
const AUTH_COOKIE_NAME = "smarter_admin_session";

export async function checkCredentials(username?: string, password?: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function setAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.has(AUTH_COOKIE_NAME);
}
