import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  timeout: 10_000,
});

// Types
export interface Pool {
  id: string;
  contractId: string;
  token0Symbol: string;
  token1Symbol: string;
  token0Address: string;
  token1Address: string;
  reserve0: string;
  reserve1: string;
  tvlUsd: string;
  volume24h: string;
  feePercent: string;
}

export interface Swap {
  id: string;
  txHash: string;
  poolId: string;
  sender: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  amountInUsd: string;
  timestamp: number;
}

export interface Token {
  id: string;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoUrl: string;
  priceUsd: string;
  volume24h: string;
}

export interface Farm {
  id: string;
  contractId: string;
  lpTokenAddress: string;
  rewardTokenSymbol: string;
  totalStaked: string;
  apr: string;
}

export interface ProtocolStats {
  tvlUsd: string;
  volume24hUsd: string;
  poolCount: number;
  swapCount: number;
}

export interface Candle {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

// API methods
export const dexApi = {
  getPairs: (page = 1, limit = 20) =>
    api.get<{ data: Pool[]; total: number }>('/api/v1/pairs', { params: { page, limit } }),

  getPair: (contractId: string) =>
    api.get<Pool>(`/api/v1/pairs/${contractId}`),

  getSwaps: (poolId?: string, page = 1, limit = 20) =>
    api.get<{ data: Swap[]; total: number }>('/api/v1/swaps', { params: { poolId, page, limit } }),

  getTokens: (search?: string, page = 1, limit = 20) =>
    api.get<{ data: Token[]; total: number }>('/api/v1/tokens', { params: { search, page, limit } }),

  getToken: (address: string) =>
    api.get<Token>(`/api/v1/tokens/${address}`),

  getFarms: () =>
    api.get<Farm[]>('/api/v1/farms'),

  getStats: () =>
    api.get<ProtocolStats>('/api/v1/analytics/stats'),

  getCandles: (poolId: string, interval: string, from: number, to: number) =>
    api.get<Candle[]>(`/api/v1/analytics/candles/${poolId}`, {
      params: { interval, from, to },
    }),
};
