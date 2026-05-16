export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoUrl?: string;
  priceUsd: string;
}

export interface Pool {
  contractId: string;
  token0: Token;
  token1: Token;
  reserve0: string;
  reserve1: string;
  tvlUsd: string;
  volume24h: string;
  feePercent: string;
}

export interface SwapRoute {
  path: string[];
  pairs: string[];
  amountIn: string;
  amountOut: string;
  priceImpact: number;
}

export type WalletType = 'freighter' | 'albedo' | null;
