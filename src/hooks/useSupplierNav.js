/**
 * @file useSupplierNav.js
 * @description Resolves supplier menu label/link for the navbar from application status.
 */
import { useEffect, useState } from "react";
import { getMyPayoutMethods } from "@/api/payout";
import { getSupplierApplicationStatus } from "@/api/supplier";
import {
  buildFallbackSupplierStatus,
  extractPayoutMethods,
  getSupplierNavTarget,
  isSupplierApproved,
  isSupplierActive,
  isSupplierPortalReady,
  parseSupplierStatusResponse,
  userHasSupplierRole,
} from "@/lib/supplierPortal";

export function useSupplierNav(user) {
  const [state, setState] = useState({
    loading: Boolean(user),
    hasApplication: userHasSupplierRole(user),
    portalReady: false,
    needsPayout: false,
    reviewStatus: userHasSupplierRole(user) ? "PENDING" : null,
  });

  useEffect(() => {
    if (!user) {
      setState({
        loading: false,
        hasApplication: false,
        portalReady: false,
        needsPayout: false,
        reviewStatus: null,
      });
      return;
    }

    let cancelled = false;
    setState((current) => ({ ...current, loading: true }));

    Promise.allSettled([
      getSupplierApplicationStatus(),
      getMyPayoutMethods(),
    ])
      .then(([statusResult, payoutResult]) => {
        if (cancelled) return;

        const data = statusResult.status === "fulfilled" ? statusResult.value : null;
        const parsed = parseSupplierStatusResponse(data);
        const reviewStatus = parsed?.status ?? null;
        const hasApplication = Boolean(parsed) || userHasSupplierRole(user);
        const hasPayout =
          payoutResult.status === "fulfilled" &&
          extractPayoutMethods(payoutResult.value).length > 0;
        const needsPayout =
          (isSupplierApproved(reviewStatus) || isSupplierActive(reviewStatus)) &&
          !hasPayout;

        setState({
          loading: false,
          hasApplication,
          portalReady: isSupplierPortalReady(reviewStatus, hasPayout),
          needsPayout,
          reviewStatus,
        });
      })
      .catch(() => {
        if (cancelled) return;

        const hasRole = userHasSupplierRole(user);
        setState({
          loading: false,
          hasApplication: hasRole,
          portalReady: false,
          needsPayout: false,
          reviewStatus: hasRole ? "PENDING" : null,
        });
      });

    return () => {
      cancelled = true;
    };
  }, [user?.uid, user?.email, user?.roles]);

  const navTarget = getSupplierNavTarget(state);

  return {
    ...state,
    ...navTarget,
    fallbackStatus: state.hasApplication
      ? buildFallbackSupplierStatus(state.reviewStatus || "PENDING")
      : null,
  };
}
