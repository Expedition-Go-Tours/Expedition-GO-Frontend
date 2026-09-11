import { useQuery } from '@tanstack/react-query';
import { fetchTours } from '@/api/tours';
import { adaptTourCard } from '@/lib/tourAdapter';

/**
 * Tours for a single city — used by the homepage search-history rails
 * ("Continue your search in X" / "Previously searched in Y").
 * Lightweight and cached; only fetched when a city is provided.
 */
export function useCityTours(city, limit = 12) {
  return useQuery({
    queryKey: ['tours', 'city', city, limit],
    queryFn: async () => {
      const response = await fetchTours({ city, limit });
      return (response?.tours || []).map(adaptTourCard);
    },
    enabled: !!city,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
