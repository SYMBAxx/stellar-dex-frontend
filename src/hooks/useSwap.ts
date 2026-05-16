import { useState, useCallback } from 'react';
import { useWalletStore } from '@/store/wallet.store';
import { buildSwapTransaction } from '@/lib/stellar/swap';
import { freighterSignTransaction } from '@/lib/wallet/freighter';
import { SorobanRpc } from '@stellar/stellar-sdk';

interface SwapParams {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOutMin: string;
  routerContractId: string;
  path: string[];
}

export function useSwap() {
  const { address } = useWalletStore();
  const [isPending, setIsPending] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const executeSwap = useCallback(
    async (params: SwapParams) => {
      if (!address) throw new Error('Wallet not connected');
      setIsPending(true);
      setError(null);
      setTxHash(null);

      try {
        const { xdr } = await buildSwapTransaction({ ...params, caller: address });
        const network = process.env.NEXT_PUBLIC_STELLAR_NETWORK === 'mainnet'
          ? 'PUBLIC'
          : 'TESTNET';
        const signedXdr = await freighterSignTransaction(xdr, network);

        const rpc = new SorobanRpc.Server(
          process.env.NEXT_PUBLIC_STELLAR_RPC_URL ?? 'https://soroban-testnet.stellar.org',
        );
        const result = await rpc.sendTransaction(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          signedXdr as any,
        );
        setTxHash(result.hash);
        return result;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Swap failed';
        setError(msg);
        throw err;
      } finally {
        setIsPending(false);
      }
    },
    [address],
  );

  return { executeSwap, isPending, txHash, error };
}
