/**
 * @file SupplierNavMenuItem.jsx
 * @description User-menu link that switches between "Become a supplier" and "Supplier dashboard".
 */
import { Link } from "react-router-dom";
import { LayoutDashboard, Store } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/components/auth/AuthProvider";
import { useSupplierNav } from "@/hooks/useSupplierNav";

export function SupplierNavMenuItem({ onNavigate, className }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isSupplier, href, external, loading } = useSupplierNav(user);

  const label = isSupplier
    ? t("footer.supplierDashboard", "Supplier Dashboard")
    : t("nav.becomeSupplier", "Become a supplier");

  const Icon = isSupplier ? LayoutDashboard : Store;
  const itemClassName =
    className ||
    "flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900";

  if (loading) {
    return (
      <span className={`${itemClassName} opacity-60`} aria-hidden="true">
        <Store className="size-4" />
        <span>{t("nav.becomeSupplier", "Become a supplier")}</span>
      </span>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        onClick={onNavigate}
        className={itemClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="size-4" />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <Link to={href} onClick={onNavigate} className={itemClassName}>
      <Icon className="size-4" />
      <span>{label}</span>
    </Link>
  );
}
