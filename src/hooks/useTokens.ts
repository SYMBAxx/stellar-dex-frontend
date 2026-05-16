import { useQuery } from '@tanstack/react-query';
import { dexApi } from '@/services/api';

export function useTokens(search?: string) {
  return useQuery({
    queryKey: ['tokens', search],
    queryFn: () => dexApi.getTokens(search).then((r) => r.data),
    staleTime: 60_000,
  });
}
