import { useQuery } from '@tanstack/react-query';
import { dexApi } from '@/services/api';

export function usePools(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['pools', page, limit],
    queryFn: () => dexApi.getPairs(page, limit).then((r) => r.data),
    staleTime: 30_000,
  });
}

export function usePool(contractId: string) {
  return useQuery({
    queryKey: ['pool', contractId],
    queryFn: () => dexApi.getPair(contractId).then((r) => r.data),
    enabled: !!contractId,
  });
}
