import * as React from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ChevronLeft, ChevronRight, Star } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const StarRating = ({ rating, className }) => (
  <div className={cn('flex items-center gap-0.5', className)}>
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={cn(
          'size-5',
          index < Math.round(rating)
            ? 'fill-amber-400 text-amber-400'
            : 'text-slate-300'
        )}
      />
    ))}
  </div>
);

const TestimonialCard = React.forwardRef(
  (
    {
      className,
      logo,
      companyName = 'Trustpilot',
      overallRating,
      totalRatingsText,
      title,
      features,
      testimonials,
      ...props
    },
    ref
  ) => {
    const safeTestimonials = testimonials?.length
      ? testimonials
      : [{ name: 'TravioAfrica guest', rating: overallRating, quote: 'A memorable experience.' }];
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentTestimonial = safeTestimonials[currentIndex];

    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % safeTestimonials.length);
    };

    const handlePrev = () => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + safeTestimonials.length) % safeTestimonials.length
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative isolate w-full overflow-hidden rounded-[1.75rem] border border-emerald-900/10 bg-white p-5 text-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-7',
          className
        )}
        {...props}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(135deg,rgba(57,173,108,0.16),rgba(255,185,71,0.12),transparent_72%)]"
          aria-hidden
        />

        <div className="relative space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              {logo}
              <span className="truncate text-lg font-black tracking-tight sm:text-xl">
                {companyName}
              </span>
            </div>
            <span className="rounded-full bg-[color:var(--brand-mist)] px-3 py-1 text-xs font-bold text-[color:var(--brand-green)]">
              {Number(overallRating).toFixed(1)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className="grid size-8 place-items-center rounded-md bg-[#00B67A] text-white shadow-sm"
                >
                  <Star className="size-4 fill-current" />
                </span>
              ))}
            </div>
            <p className="text-sm font-semibold text-slate-500">{totalRatingsText}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
              {title}
            </h3>
            <ul className="grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 shrink-0 text-[color:var(--brand-green)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="min-h-[148px] space-y-3"
              >
                <StarRating rating={currentTestimonial.rating} />
                <p className="font-black text-slate-950">{currentTestimonial.name}</p>
                <blockquote className="text-sm italic leading-7 text-slate-600">
                  "{currentTestimonial.quote}"
                </blockquote>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                {currentIndex + 1} / {safeTestimonials.length}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TestimonialCard.displayName = 'TestimonialCard';

export { TestimonialCard };
