import { BadgeCheck, CircleDollarSign, Handshake, ShieldCheck, Star, WalletCards } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const icons = [BadgeCheck, CircleDollarSign, ShieldCheck, Handshake, WalletCards, Star];

const featureKeys = [
  { titleKey: "instantConfirmation", descKey: "instantConfirmationDesc" },
  { titleKey: "bestPrice", descKey: "bestPriceDesc" },
  { titleKey: "freeCancellation", descKey: "freeCancellationDesc" },
  { titleKey: "trustedOperators", descKey: "trustedOperatorsDesc" },
  { titleKey: "securePayments", descKey: "securePaymentsDesc" },
  { titleKey: "realReviews", descKey: "realReviewsDesc" },
];

export function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section 
      className="py-[2.125rem] bg-slate-50/50 md:py-8"
    >
      {/* Grid layout: 3 columns on all screen sizes */}
      <div className="grid grid-cols-3 gap-[1.1rem] sm:gap-4 lg:gap-6">
        {featureKeys.map((feature, index) => {
          const Icon = icons[index];

          return (
            <div
              key={feature.titleKey}
              className="flex flex-col items-center text-center"
            >
              <div className="grid size-10 sm:size-12 lg:size-14 shrink-0 place-items-center rounded-full border border-[color:var(--brand-green)]/20 bg-white text-[color:var(--brand-green)] shadow-sm">
                <Icon className="size-4 sm:size-5 lg:size-6" />
              </div>
              <div className="mt-2.5 sm:mt-3">
                <p className="text-[13px] sm:text-[12px] lg:text-[13px] font-semibold text-slate-900">{t(`features.${feature.titleKey}`)}</p>
                <p className="mt-1 sm:mt-1 text-[11px] sm:text-[10px] lg:text-[11px] leading-relaxed sm:leading-4 text-slate-500">{t(`features.${feature.descKey}`)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
