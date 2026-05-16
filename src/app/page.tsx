import Link from 'next/link';
import { ArrowRight, Zap, Droplets, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 text-brand text-sm mb-6">
          <Zap size={14} />
          Built on Stellar Soroban
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
          Trade on Stellar
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Swap tokens, provide liquidity, and earn rewards — all on the fastest blockchain.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/swap" className="btn-primary flex items-center gap-2 justify-center">
            Start Trading <ArrowRight size={18} />
          </Link>
          <Link href="/pools" className="btn-secondary flex items-center gap-2 justify-center">
            Explore Pools
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 w-full max-w-3xl">
        {[
          { label: 'Total Value Locked', value: '$—', icon: Droplets },
          { label: '24h Volume', value: '$—', icon: TrendingUp },
          { label: 'Total Pools', value: '—', icon: Zap },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-6 text-center">
            <Icon size={24} className="text-brand mx-auto mb-3" />
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-gray-400 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
