import { useQuery } from '@tanstack/react-query';
import { fetchPlaceResolve } from '@/api/tours';

/**
 * Resolve a search query to a place (city / attraction / landmark) so the
 * listing can be scoped to it the way GetYourGuide scopes a destination search.
 * Returns null when the query isn't a place (then the caller keeps text search).
 */
export function usePlaceResolve(q) {
  const query = (q || '').trim();
  return useQuery({
    queryKey: ['place-resolve', query],
    queryFn: async () => {
      const data = await fetchPlaceResolve({ q: query });
      return data?.place ?? null;
    },
    enabled: query.length >= 2,
    staleTime: 10 * 60 * 1000,
  });
}
