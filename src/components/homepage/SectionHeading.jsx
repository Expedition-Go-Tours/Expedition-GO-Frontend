import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function SectionHeading({ title, subtitle, categoryId, onScrollLeft, onScrollRight }) {
  const { t } = useTranslation();
  const hasScrollButtons = onScrollLeft && onScrollRight;

  return (
    <div className="mb-2.5 xl:mb-3 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-[17px] font-bold tracking-tight text-slate-900 sm:text-[18px] xl:text-[22px]">{title}</h2>
        {subtitle ? <p className="mt-0.5 xl:mt-1 text-[11px] leading-5 text-slate-500 xl:text-[12px]">{subtitle}</p> : null}
      </div>

      <div className="flex items-center gap-3">
        <Link 
          to={`/tours?category=${categoryId || 'all'}`}
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-[color:var(--brand-green)] transition hover:text-[color:var(--brand-green-2)]"
        >
          {t('sections.viewAll')}
          <ChevronRight className="size-4" />
        </Link>
        {hasScrollButtons && (
          <div className="hidden items-center gap-2 xl:flex">
            <button 
              onClick={onScrollLeft}
              className="grid size-8 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[color:var(--brand-green)] hover:text-[color:var(--brand-green)]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button 
              onClick={onScrollRight}
              className="grid size-8 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[color:var(--brand-green)] hover:text-[color:var(--brand-green)]"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
