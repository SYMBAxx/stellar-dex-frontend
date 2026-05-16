'use client';

import { useWalletStore } from '@/store/wallet.store';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function WalletButton() {
  const { address, isConnected, connect, disconnect, isConnecting } = useWalletStore();
  const [open, setOpen] = useState(false);

  if (!isConnected) {
    return (
      <button
        onClick={connect}
        disabled={isConnecting}
        className="btn-primary flex items-center gap-2 py-2 px-4 text-sm"
      >
        <Wallet size={16} />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  const short = `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="btn-secondary flex items-center gap-2 text-sm"
      >
        <div className="w-2 h-2 rounded-full bg-green-400" />
        {short}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 card p-2 shadow-xl animate-fade-in">
          <div className="px-3 py-2 text-xs text-gray-400 font-mono break-all">{address}</div>
          <hr className="border-surface-border my-1" />
          <button
            onClick={() => { disconnect(); setOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-surface-hover rounded-lg transition-colors"
          >
            <LogOut size={14} />
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
