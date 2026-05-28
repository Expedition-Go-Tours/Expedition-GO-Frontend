/**
 * @file useSupplierNav.js
 * @description Resolves supplier menu label/link for the navbar from application status.
 *   Uses React Query (shared cache) + sessionStorage so dashboard/pending show immediately.
 */
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  fetchSupplierAccessForNav,
  getSupplierAccessInitialData,
  supplierAccessQueryKey,
} from "@/api/supplierAccessQuery";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  buildFallbackSupplierStatus,
  getOptimisticSupplierNavState,
  persistSupplierNavState,
  resolveSupplierNavState,
} from "@/lib/supplierPortal";

export function useSupplierNav(user) {
  const { loading: authLoading } = useAuth();
  const userId = user?.uid ?? user?.id ?? null;

  const optimistic = useMemo(
    () => getOptimisticSupplierNavState(user),
    [user?.uid, user?.id, user?.roles, user?.supplierProfile?.status]
  );

  const initialSnapshot = useMemo(
    () => getSupplierAccessInitialData(user),
    [userId]
  );

  const { data: snapshot, isPending, isFetching, isError } = useQuery({
    queryKey: supplierAccessQueryKey(user),
    queryFn: fetchSupplierAccessForNav,
    enabled: Boolean(userId) && !authLoading,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: "always",
    retry: (failureCount, error) => {
      if (error?.code === "AUTH_NOT_READY" && failureCount < 8) return true;
      return failureCount < 2;
    },
    retryDelay: (attempt) => Math.min(250 * (attempt + 1), 2000),
    placeholderData: (previousData) => previousData ?? initialSnapshot,
    initialData: initialSnapshot,
  });

  const resolved = useMemo(() => {
    if (!user) return optimistic;

    const hasFreshSnapshot =
      snapshot &&
      (snapshot.route != null || snapshot.statusNotFound || snapshot.statusError);

    if (hasFreshSnapshot) {
      const next = resolveSupplierNavState(user, snapshot);
      persistSupplierNavState(user, next);
      return next;
    }

    if (snapshot?.reviewStatus != null || snapshot?.hasPayout) {
      return resolveSupplierNavState(user, snapshot);
    }

    if (isError) return optimistic;

    return optimistic;
  }, [user, snapshot, optimistic, isError]);

  const showPlaceholder =
    Boolean(userId) &&
    !authLoading &&
    isPending &&
    !snapshot?.reviewStatus &&
    !snapshot?.hasPayout &&
    resolved.menuVariant === "become" &&
    !resolved.hasApplication;

  return {
    ...resolved,
    loading: showPlaceholder,
    isRefreshing: isFetching && !isPending,
    fallbackStatus: resolved.hasApplication
      ? buildFallbackSupplierStatus(resolved.reviewStatus || "PENDING")
      : null,
  };
}
