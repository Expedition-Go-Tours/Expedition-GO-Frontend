import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigationLoader } from "@/contexts/NavigationContext";

const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: "Top 10 Hidden Gems in Ghana You Must Visit",
    excerpt: "Discover lesser-known destinations that will take your breath away, from secret waterfalls to ancient villages.",
    category: "Travel Guide",
    readTime: "5 min read",
    date: "Jan 15, 2026",
    image: "https://images.unsplash.com/photo-1516069677018-3161f875605e?w=800&h=600&fit=crop",
    slug: "hidden-gems-ghana"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Cape Coast Castle",
    excerpt: "Learn about the rich history and cultural significance of one of Ghana's most important heritage sites.",
    category: "Heritage",
    readTime: "8 min read",
    date: "Jan 12, 2026",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=600&fit=crop",
    slug: "cape-coast-castle-guide"
  },
  {
    id: 3,
    title: "Best Street Food Spots in Accra",
    excerpt: "From jollof rice to kelewele, explore the vibrant street food scene in Ghana's capital city.",
    category: "Food & Culture",
    readTime: "4 min read",
    date: "Jan 10, 2026",
    image: "https://images.unsplash.com/photo-1504672281656-e4981d70414b?w=800&h=600&fit=crop",
    slug: "accra-street-food"
  },
  {
    id: 4,
    title: "Planning Your First Safari: What to Expect",
    excerpt: "Everything you need to know before embarking on your African safari adventure, from packing to wildlife spotting.",
    category: "Travel Tips",
    readTime: "6 min read",
    date: "Jan 8, 2026",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop",
    slug: "first-safari-guide"
  },
  {
    id: 5,
    title: "Kakum National Park: Walking Above the Rainforest",
    excerpt: "Experience the thrill of the canopy walkway and discover the biodiversity of Ghana's tropical rainforest.",
    category: "Nature",
    readTime: "5 min read",
    date: "Jan 5, 2026",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop",
    slug: "kakum-national-park"
  }
];

function ArticleCard({ article }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-[color:var(--brand-green)] px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
            {article.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex items-center gap-3 text-[11px] text-slate-500 sm:text-[12px]">
          <div className="flex items-center gap-1">
            <Calendar className="size-3" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <h3 className="mb-2 line-clamp-2 text-[15px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-[color:var(--brand-green)] sm:text-base">
          {article.title}
        </h3>

        <p className="mb-3 line-clamp-2 text-[13px] leading-relaxed text-slate-600 sm:text-sm">
          {article.excerpt}
        </p>

        <div className="mt-auto">
          <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[color:var(--brand-green)] transition-all group-hover:gap-2 sm:text-sm">
            Read more
            <ChevronRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function NewsArticlesSection() {
  const { t } = useTranslation();
  const { navigateWithLoader } = useNavigationLoader();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(max > 6 && scrollLeft < max - 6);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(updateScrollButtons);
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateScrollButtons) : null;
    ro?.observe(el);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      ro?.disconnect();
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const scrollByDirection = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = 320;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(maxScroll, el.scrollLeft + dir * step));
    el.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  const handleViewAll = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "auto" });
    navigateWithLoader("/blog");
  };

  return (
    <section className="py-6 sm:py-10">
      <div className="mb-4 flex items-start justify-between gap-3 sm:mb-6 sm:gap-4">
        <div className="flex-1">
          <h2 className="relative inline-block text-xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Travel Stories & News
            <span className="absolute bottom-[-8px] left-0 h-1 w-16 rounded-full bg-gradient-to-r from-[color:var(--brand-green)] to-emerald-400 sm:bottom-[-10px] sm:w-20" />
          </h2>
          <p className="mt-4 text-[13px] text-slate-600 sm:text-sm">
            Discover travel guides, tips, and stories from across Africa
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/blog"
            onClick={handleViewAll}
            className="group relative inline-flex min-h-[44px] shrink-0 touch-manipulation items-center gap-1 whitespace-nowrap py-2 text-[13px] font-semibold text-slate-700 transition hover:text-slate-950 sm:min-h-0 sm:py-1.5 sm:text-[14px]"
          >
            <span className="relative">
              {t("sections.viewAll")}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[color:var(--brand-green)] transition-all duration-300 group-hover:w-full" />
            </span>
            <ChevronRight className="size-4 text-slate-500 transition group-hover:text-[color:var(--brand-green)]" />
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByDirection(-1)}
              className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[color:var(--brand-green)] hover:text-[color:var(--brand-green)] disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByDirection(1)}
              className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[color:var(--brand-green)] hover:text-[color:var(--brand-green)] disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
      >
        {SAMPLE_ARTICLES.map((article) => (
          <div key={article.id} className="w-[300px] shrink-0 snap-start sm:w-[300px] lg:w-[300px]">
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}
