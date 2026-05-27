/**
 * @file supplierPortal.js
 * @description External supplier dashboard URLs and approval-status helpers.
 */
/** Approved suppliers manage tours via the external supplier dashboard. */
export const SUPPLIER_PORTAL_LOGIN_URL = "https://supplier.travioafrica.com/login";

export function getSupplierReviewStatus(statusResponse) {
  const profile = statusResponse?.data?.supplierProfile || statusResponse?.data || {};
  return profile.status || "PENDING";
}

export function isSupplierPortalReady(status) {
  return status === "APPROVED" || status === "ACTIVE";
}

export function redirectToSupplierPortalLogin() {
  if (typeof window === "undefined") return;
  window.location.replace(SUPPLIER_PORTAL_LOGIN_URL);
}
