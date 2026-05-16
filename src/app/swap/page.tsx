import { SwapWidget } from '@/components/swap/SwapWidget';

export const metadata = { title: 'Swap — StellarDEX' };

export default function SwapPage() {
  return (
    <div className="flex items-start justify-center min-h-[calc(100vh-4rem)] pt-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Swap</h1>
        <SwapWidget />
      </div>
    </div>
  );
}
