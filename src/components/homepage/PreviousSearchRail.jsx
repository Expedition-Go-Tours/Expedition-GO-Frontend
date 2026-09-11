/**
 * @file PreviousSearchRail.jsx
 * @description A single homepage search-history rail: a city the traveller
 *   searched earlier, shown as a tour carousel so they can pick up where they
 *   left off. Reuses TourCarouselSection for consistent layout and arrows.
 */
import { SectionHeading } from './SectionHeading';
import { TourCarouselSection } from './TourCarouselSection';
import { CarouselCardsSkeleton } from './skeletons/CarouselCardsSkeleton';
import { RecommendedExperiencesCard } from './RecommendedExperiencesCard';
import { useCityTours } from '@/hooks/useCityTours';

export function PreviousSearchRail({ location, title, note }) {
  const { data: tours, isLoading } = useCityTours(location, 12);

  if (isLoading) {
    return (
      <section className="py-4 md:py-4 xl:py-5">
        <SectionHeading title={title} subtitle={note} hideViewAll />
        <CarouselCardsSkeleton cardWidth={280} gap={12} />
      </section>
    );
  }

  // Never render an empty rail.
  if (!tours || tours.length === 0) return null;

  const slug = `history-${location.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <TourCarouselSection
      id={slug}
      title={title}
      subtitle={note}
      items={tours}
      CardComponent={RecommendedExperiencesCard}
      viewAllTo={`/tours?location=${encodeURIComponent(location)}`}
    />
  );
}
