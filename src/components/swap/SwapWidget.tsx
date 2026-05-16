'use client';

import { useState } from 'react';
import { ArrowDownUp, Settings, Info } from 'lucide-react';
import { useSwap } from '@/hooks/useSwap';
import { useWalletStore } from '@/store/wallet.store';
import { TokenInput } from './TokenInput';
import { SlippageSettings } from './SlippageSettings';

export function SwapWidget() {
  const [tokenIn, setTokenIn] = useState('');
  const [tokenOut, setTokenOut] = useState('');
  const [amountIn, setAmountIn] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);

  const { isConnected, connect } = useWalletStore();
  const { executeSwap, isPending, error } = useSwap();

  const routerContractId = process.env.NEXT_PUBLIC_ROUTER_CONTRACT_ID ?? '';

  const handleSwap = async () => {
    if (!tokenIn || !tokenOut || !amountIn) return;
    const amountInRaw = BigInt(Math.floor(parseFloat(amountIn) * 1e7)).toString();
    const amountOutMin = '0'; // TODO: calculate from price impact + slippage
    await executeSwap({
      tokenIn,
      tokenOut,
      amountIn: amountInRaw,
      amountOutMin,
      routerContractId,
      path: [tokenIn, tokenOut],
    });
  };

  const flipTokens = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmountIn('');
  };

  return (
    <div className="card p-5 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Swap</span>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg hover:bg-surface-hover transition-colors text-gray-400 hover:text-white"
        >
          <Settings size={16} />
        </button>
      </div>

      {showSettings && (
        <SlippageSettings value={slippage} onChange={setSlippage} />
      )}

      {/* Token In */}
      <TokenInput
        label="You pay"
        value={amountIn}
        onChange={setAmountIn}
        tokenAddress={tokenIn}
        onTokenSelect={setTokenIn}
      />

      {/* Flip */}
      <div className="flex justify-center">
        <button
          onClick={flipTokens}
          className="p-2 rounded-xl bg-surface-hover hover:bg-surface-border transition-colors border border-surface-border"
        >
          <ArrowDownUp size={16} />
        </button>
      </div>

      {/* Token Out */}
      <TokenInput
        label="You receive"
        value=""
        onChange={() => {}}
        tokenAddress={tokenOut}
        onTokenSelect={setTokenOut}
        readOnly
      />

      {/* Price impact info */}
      {amountIn && tokenIn && tokenOut && (
        <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
          <Info size={12} />
          <span>Slippage tolerance: {slippage}%</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-400 text-sm px-1">{error}</div>
      )}

      {/* Action button */}
      {!isConnected ? (
        <button onClick={connect} className="btn-primary w-full">
          Connect Wallet
        </button>
      ) : (
        <button
          onClick={handleSwap}
          disabled={isPending || !tokenIn || !tokenOut || !amountIn}
          className="btn-primary w-full"
        >
          {isPending ? 'Swapping...' : 'Swap'}
        </button>
      )}
    </div>
  );
}
