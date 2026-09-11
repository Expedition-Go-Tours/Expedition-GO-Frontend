import { useQuery } from '@tanstack/react-query';
import { fetchSearchFallback } from '@/api/tours';
import { adaptTourCard } from '@/lib/tourAdapter';

async function load(q) {
  const data = await fetchSearchFallback({ q, limit: 8 });
  const map = (arr) => (Array.isArray(arr) ? arr.map(adaptTourCard) : []);
  return {
    query: q,
    resolvedLocation: data?.resolvedLocation ?? null,
    nearbyLocations: Array.isArray(data?.nearbyLocations) ? data.nearbyLocations : [],
    recommended: map(data?.recommended),
    youMayAlsoLike: map(data?.youMayAlsoLike),
  };
}

/**
 * Powers the "no experiences here yet" empty state: close-by destinations plus
 * two curated rails. Only fetches for a real query.
 */
export function useSearchFallback(q) {
  const query = (q || '').trim();
  return useQuery({
    queryKey: ['search-fallback', query],
    queryFn: () => load(query),
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
}
