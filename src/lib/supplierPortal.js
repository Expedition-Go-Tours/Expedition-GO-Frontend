/**
 * @file supplierPortal.js
 * @description External supplier dashboard URLs and approval-status helpers.
 */
import { getMyPayoutMethods } from "@/api/payout";

/** Active suppliers manage tours via the external supplier dashboard. */
export const SUPPLIER_PORTAL_LOGIN_URL = "https://supplier.travioafrica.com/login";

export const SUPPLIER_PAYOUT_PATH = "/supplier/payout";
export const SUPPLIER_SIGNIN_PATH = "/supplier/signin";

/**
 * Normalize API payloads from GET /suppliers/application/status.
 * @returns {{ profile: object, status: string } | null}
 */
export function parseSupplierStatusResponse(statusResponse) {
  if (!statusResponse || typeof statusResponse !== "object") return null;

  const payload = statusResponse.data ?? statusResponse;
  const profile = payload?.supplierProfile ?? payload;

  if (!profile || typeof profile !== "object") return null;
  if (!profile.status && !profile.id) return null;

  return {
    profile,
    status: profile.status || "PENDING",
  };
}

export function userHasSupplierRole(user) {
  return Array.isArray(user?.roles) && user.roles.includes("supplier");
}

export function userIsSupplierAccount(user, statusResponse) {
  return Boolean(parseSupplierStatusResponse(statusResponse)) || userHasSupplierRole(user);
}

export function getSupplierReviewStatus(statusResponse) {
  return parseSupplierStatusResponse(statusResponse)?.status ?? "PENDING";
}

export function isSupplierApproved(status) {
  return status === "APPROVED";
}

export function isSupplierActive(status) {
  return status === "ACTIVE";
}

/** External dashboard is only for ACTIVE suppliers who have set up payout. */
export function isSupplierPortalReady(status, hasPayoutMethod = true) {
  return isSupplierActive(status) && hasPayoutMethod;
}

export function requiresPayoutSetup(status) {
  return isSupplierApproved(status) || isSupplierActive(status);
}

export function extractPayoutMethods(payload) {
  const data = payload?.data ?? payload;
  return data?.methods ?? [];
}

export async function supplierHasPayoutMethod() {
  try {
    const response = await getMyPayoutMethods();
    return extractPayoutMethods(response).length > 0;
  } catch {
    return false;
  }
}

/**
 * Resolve post-auth route for a supplier by status and payout setup.
 * @returns {"portal"|"payout"|"signin"}
 */
export async function resolveSupplierRoute(reviewStatus) {
  const hasPayout = await supplierHasPayoutMethod();

  if (isSupplierActive(reviewStatus)) {
    return hasPayout ? "portal" : "payout";
  }

  if (isSupplierApproved(reviewStatus)) {
    return hasPayout ? "signin" : "payout";
  }

  return "signin";
}

/** Fallback status payload when the API is unavailable but the user has the supplier role. */
export function buildFallbackSupplierStatus(status = "PENDING") {
  return {
    data: {
      supplierProfile: {
        status,
      },
    },
  };
}

/**
 * Navbar / menu link for the signed-in user's supplier entry point.
 */
export function getSupplierNavTarget({ hasApplication, portalReady, needsPayout }) {
  if (portalReady) {
    return {
      href: SUPPLIER_PORTAL_LOGIN_URL,
      external: true,
      isSupplier: true,
    };
  }

  if (needsPayout) {
    return {
      href: SUPPLIER_PAYOUT_PATH,
      external: false,
      isSupplier: true,
    };
  }

  if (hasApplication) {
    return {
      href: SUPPLIER_SIGNIN_PATH,
      external: false,
      isSupplier: true,
    };
  }

  return {
    href: "/supplier/register",
    external: false,
    isSupplier: false,
  };
}

export function redirectToSupplierPortalLogin() {
  if (typeof window === "undefined") return;
  window.location.replace(SUPPLIER_PORTAL_LOGIN_URL);
}
