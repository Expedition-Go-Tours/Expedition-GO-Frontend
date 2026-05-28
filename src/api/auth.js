/**
 * @file api/auth.js
 * @description Backend session exchange after Firebase sign-in.
 *
 * Endpoints:
 *   POST /auth/verify-token — verify Firebase ID token, set session cookies
 *   POST /auth/logout       — clear session cookies
 *
 * @see lib/auth.js — calls verifyToken during sign-in
 */
import { apiRequest, unwrap } from "@/api/client";

/**
 * Exchange a Firebase ID token for httpOnly session cookies and a backend user.
 * @param {string} idToken Firebase ID token
 * @returns {Promise<object>} Backend user record
 */
export async function verifyToken(idToken) {
  const payload = await apiRequest("/auth/verify-token", {
    method: "POST",
    body: { token: idToken },
    auth: false,
  });

  const data = unwrap(payload);
  return data?.user ?? data;
}

/**
 * Clear backend session cookies (best-effort).
 */
export async function logoutFromBackend() {
  return apiRequest("/auth/logout", {
    method: "POST",
    auth: false,
  });
}
