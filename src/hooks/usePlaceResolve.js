import { useQuery } from '@tanstack/react-query';
import { fetchPlaceResolve } from '@/api/tours';

/**
 * Resolve a search query to a place (city / region / attraction / locality) so
 * the listing can be scoped to it the way GetYourGuide scopes a destination
 * search. Returns null when the query isn't a place (then the caller keeps a
 * plain text search).
 */
export function usePlaceResolve(q, scope) {
  const query = (q || '').trim();
  return useQuery({
    queryKey: ['place-resolve', query, scope || 'all'],
    queryFn: async () => {
      const data = await fetchPlaceResolve(scope ? { q: query, scope } : { q: query });
      return data?.place ?? null;
    },
    enabled: query.length >= 2,
    staleTime: 10 * 60 * 1000,
  });
}
