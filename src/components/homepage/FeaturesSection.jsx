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
      className="py-[2.125rem] bg-white md:py-8"
    >
      {/* Grid layout: 3 columns on all screen sizes */}
      <div>
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
                <p className="font-bold text-slate-900" style={{ fontSize: 'clamp(0.75rem, 0.8vw + 0.4rem, 0.9375rem)' }}>{t(`features.${feature.titleKey}`)}</p>
                <p className="mt-1 sm:mt-1 leading-relaxed sm:leading-4 font-medium text-slate-500" style={{ fontSize: 'clamp(0.6875rem, 0.6vw + 0.35rem, 0.8125rem)' }}>{t(`features.${feature.descKey}`)}</p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      
    </section>
  );
}
