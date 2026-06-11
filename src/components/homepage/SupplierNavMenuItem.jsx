/**
 * @file SupplierNavMenuItem.jsx
 * @description User-menu supplier entry: Become a supplier, pending status, or dashboard.
 */
import { Link } from "react-router-dom";
import { AlertTriangle, Clock, LayoutDashboard, Store } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/components/auth/AuthProvider";
import { useSupplierNav } from "@/hooks/useSupplierNav";

const PENDING_HINT_KEYS = {
  payout: {
    key: "nav.supplierPendingPayoutHint",
    defaultMessage:
      "Add your payout method to continue. Dashboard access unlocks after admin activation.",
  },
  activation: {
    key: "nav.supplierPendingActivationHint",
    defaultMessage:
      "Your payout method is saved. Your supplier dashboard will unlock once an admin activates your account.",
  },
  review: {
    key: "nav.supplierPendingReviewHint",
    defaultMessage:
      "Your supplier application is being reviewed. Complete any outstanding steps from the supplier portal.",
  },
};

export function SupplierNavMenuItem({ onNavigate, className }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { menuVariant, pendingReason, href, external, loading, isRefreshing } =
    useSupplierNav(user);

  const baseClassName =
    className ||
    "flex w-full items-center gap-3 px-4 py-2 text-sm transition";

  const refreshClass = isRefreshing ? "opacity-80" : "";

  if (loading) {
    return (
      <span
        className={`${baseClassName} text-slate-700 opacity-50`}
        aria-busy="true"
        aria-label={t("nav.becomeSupplier", "List an experience")}
      />
    );
  }

  if (menuVariant === "dashboard") {
    const itemClassName = `${baseClassName} text-slate-700 hover:bg-slate-50 hover:text-slate-900 ${refreshClass}`;

    if (external) {
      return (
        <a
          href={href}
          onClick={onNavigate}
          className={itemClassName}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LayoutDashboard className="size-4" />
          <span>{t("footer.supplierDashboard", "Supplier Dashboard")}</span>
        </a>
      );
    }

    return (
      <Link to={href} onClick={onNavigate} className={itemClassName}>
        <LayoutDashboard className="size-4" />
        <span>{t("footer.supplierDashboard", "Supplier Dashboard")}</span>
      </Link>
    );
  }

  if (menuVariant === "pending") {
    const hint = PENDING_HINT_KEYS[pendingReason] ?? PENDING_HINT_KEYS.review;

    return (
      <div className="group relative">
        <Link
          to={href}
          onClick={onNavigate}
          title={t(hint.key, hint.defaultMessage)}
          className={`${baseClassName} text-amber-800 hover:bg-amber-50 ${refreshClass}`}
        >
          <Clock className="size-4 shrink-0 text-amber-600" />
          <span className="font-medium">
            {t("nav.supplierStatusPending", "Supplier status pending")}
          </span>
        </Link>

        <div
          role="tooltip"
          className="pointer-events-none absolute right-0 top-full z-[60] mt-1 hidden w-56 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900 shadow-md group-hover:block"
        >
          <div className="mb-1 flex items-center gap-1.5 font-semibold text-amber-800">
            <AlertTriangle className="size-3.5 shrink-0" />
            <span>{t("nav.supplierPendingWarning", "Action required")}</span>
          </div>
          <p>{t(hint.key, hint.defaultMessage)}</p>
        </div>
      </div>
    );
  }

  const itemClassName = `${baseClassName} text-slate-700 hover:bg-slate-50 hover:text-slate-900 ${refreshClass}`;

  return (
    <Link to={href} onClick={onNavigate} className={itemClassName}>
      <Store className="size-4" />
      <span>{t("nav.becomeSupplier", "List an experience")}</span>
    </Link>
  );
}
