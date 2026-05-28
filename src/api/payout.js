/**
 * @file api/payout.js
 * @description Supplier payout methods and history. All endpoints require authentication.
 *
 * Endpoints:
 *   GET    /payout-methods/me     — list user's payout methods
 *   POST   /payout-methods        — add method
 *   PATCH  /payout-methods/:id  — update or set default
 *   DELETE /payout-methods/:id    — remove method
 *   GET    /payouts/me            — payout history (supports query params)
 *
 * @see pages/SupplierPayoutPage.jsx
 */
import { apiRequest, unwrap } from "@/api/client";

/** Extract created payout method from POST /payout-methods response. */
export function parseCreatedPayoutMethod(response) {
  if (!response) return null;
  const data = unwrap(response);
  return data?.method ?? data ?? null;
}

/**
 * Get current user's payout methods.
 * Requires authentication.
 */
export async function getMyPayoutMethods() {
  return apiRequest("/payout-methods/me", {
    method: "GET",
    auth: true,
  });
}

/**
 * Add a new payout method.
 * Requires authentication.
 */
export async function addPayoutMethod(payload) {
  const response = await apiRequest("/payout-methods", {
    method: "POST",
    body: payload,
    auth: true,
  });

  const method = parseCreatedPayoutMethod(response);
  if (!method?.id) {
    throw new Error("Server did not return a saved payout method. Please try again.");
  }

  return { ...response, data: { ...(response?.data || {}), method } };
}

/**
 * Update an existing payout method.
 * Requires authentication.
 */
export async function updatePayoutMethod(id, payload) {
  return apiRequest(`/payout-methods/${id}`, {
    method: "PATCH",
    body: payload,
    auth: true,
  });
}

/**
 * Delete a payout method.
 * Requires authentication.
 */
export async function deletePayoutMethod(id) {
  return apiRequest(`/payout-methods/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

/**
 * Set a payout method as default.
 * Requires authentication.
 */
export async function setDefaultPayoutMethod(id) {
  return updatePayoutMethod(id, { isDefault: true });
}

/**
 * Get current user's payout history.
 * Requires authentication.
 */
export async function getMyPayouts(params = {}) {
  return apiRequest("/payouts/me", {
    method: "GET",
    params,
    auth: true,
  });
}
