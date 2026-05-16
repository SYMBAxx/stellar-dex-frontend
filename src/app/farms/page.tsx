import { FarmsTable } from '@/components/liquidity/FarmsTable';

export const metadata = { title: 'Farms — StellarDEX' };

export default function FarmsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Farms</h1>
      <p className="text-gray-400 mb-8">Stake LP tokens to earn rewards</p>
      <FarmsTable />
    </div>
  );
}
