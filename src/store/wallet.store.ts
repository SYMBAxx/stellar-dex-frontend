import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { freighterConnect, freighterGetAddress } from '@/lib/wallet/freighter';

interface WalletState {
  address: string;
  isConnected: boolean;
  isConnecting: boolean;
  walletType: 'freighter' | 'albedo' | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: '',
      isConnected: false,
      isConnecting: false,
      walletType: null,

      connect: async () => {
        set({ isConnecting: true });
        try {
          await freighterConnect();
          const address = await freighterGetAddress();
          set({ address, isConnected: true, walletType: 'freighter' });
        } catch (err) {
          console.error('Wallet connection failed:', err);
        } finally {
          set({ isConnecting: false });
        }
      },

      disconnect: () => {
        set({ address: '', isConnected: false, walletType: null });
      },
    }),
    {
      name: 'stellar-dex-wallet',
      partialize: (state) => ({
        address: state.address,
        isConnected: state.isConnected,
        walletType: state.walletType,
      }),
    },
  ),
);
