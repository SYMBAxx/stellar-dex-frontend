'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTokens } from '@/hooks/useTokens';

interface Props {
  onSelect: (address: string) => void;
  onClose: () => void;
}

export function TokenSelectModal({ onSelect, onClose }: Props) {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useTokens(search);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="card w-full max-w-sm p-5 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Select Token</h3>
          <button onClick={onClose} className="p-1 hover:bg-surface-hover rounded-lg transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or address"
            className="input-field pl-9 text-sm"
          />
        </div>

        <div className="space-y-1 max-h-72 overflow-y-auto">
          {isLoading && (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-12 rounded-xl" />
            ))
          )}
          {data?.data.map((token) => (
            <button
              key={token.address}
              onClick={() => onSelect(token.address)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-hover transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-xs font-bold text-brand">
                {token.symbol.slice(0, 2)}
              </div>
              <div>
                <div className="font-medium text-sm">{token.symbol}</div>
                <div className="text-xs text-gray-400">{token.name}</div>
              </div>
              <div className="ml-auto text-xs text-gray-400">
                ${parseFloat(token.priceUsd).toFixed(4)}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
