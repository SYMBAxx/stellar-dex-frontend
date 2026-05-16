import { PoolsTable } from '@/components/liquidity/PoolsTable';

export const metadata = { title: 'Pools — StellarDEX' };

export default function PoolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Liquidity Pools</h1>
      <PoolsTable />
    </div>
  );
}
