// Freighter wallet adapter
// Install: npm install @stellar/freighter-api

declare global {
  interface Window {
    freighter?: {
      isConnected: () => Promise<boolean>;
      getPublicKey: () => Promise<string>;
      signTransaction: (xdr: string, opts?: { network?: string }) => Promise<string>;
    };
  }
}

export async function freighterConnect(): Promise<void> {
  if (typeof window === 'undefined') throw new Error('Not in browser');
  if (!window.freighter) throw new Error('Freighter not installed');
  const connected = await window.freighter.isConnected();
  if (!connected) throw new Error('Freighter not connected');
}

export async function freighterGetAddress(): Promise<string> {
  if (!window.freighter) throw new Error('Freighter not installed');
  return window.freighter.getPublicKey();
}

export async function freighterSignTransaction(
  xdr: string,
  network = 'TESTNET',
): Promise<string> {
  if (!window.freighter) throw new Error('Freighter not installed');
  return window.freighter.signTransaction(xdr, { network });
}
