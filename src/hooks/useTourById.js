import { useQuery } from '@tanstack/react-query';
import { fetchTourById } from '@/api/tours';

export function useTourById(id) {
  return useQuery({
    queryKey: ['tour', 'detail', id],
    queryFn: async () => {
      const data = await fetchTourById(id);
      return data?.tour || data || null;
    },
    enabled: !!id,
    // Tour content (title, description, pricing, photos) is edited by
    // suppliers and only becomes visible after an admin approves it. The
    // global 30s default staleTime + no-focus-refetch could keep a just-
    // approved version hidden for minutes, so always treat this query as
    // stale and refresh on mount + window focus.
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    gcTime: 1000 * 60 * 30,
  });
}
