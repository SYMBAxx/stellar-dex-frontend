import { useQuery } from '@tanstack/react-query';
import { dexApi } from '@/services/api';

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => dexApi.getStats().then((r) => r.data),
    refetchInterval: 60_000,
  });
}
