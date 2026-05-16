'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TokenSelectModal } from './TokenSelectModal';

interface TokenInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  tokenAddress: string;
  onTokenSelect: (address: string) => void;
  readOnly?: boolean;
}

export function TokenInput({
  label,
  value,
  onChange,
  tokenAddress,
  onTokenSelect,
  readOnly = false,
}: TokenInputProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-surface rounded-xl p-4 border border-surface-border focus-within:border-brand transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          readOnly={readOnly}
          className="flex-1 bg-transparent text-2xl font-semibold outline-none placeholder-gray-600 min-w-0"
        />
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-surface-hover hover:bg-surface-border px-3 py-2 rounded-xl transition-colors text-sm font-medium shrink-0"
        >
          {tokenAddress ? (
            <span className="font-mono text-xs">{tokenAddress.slice(0, 6)}…</span>
          ) : (
            <span>Select</span>
          )}
          <ChevronDown size={14} />
        </button>
      </div>

      {showModal && (
        <TokenSelectModal
          onSelect={(addr) => { onTokenSelect(addr); setShowModal(false); }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
