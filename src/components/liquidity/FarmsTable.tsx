'use client';

import { useQuery } from '@tanstack/react-query';
import { dexApi } from '@/services/api';
import { Sprout } from 'lucide-react';

export function FarmsTable() {
  const { data: farms, isLoading } = useQuery({
    queryKey: ['farms'],
    queryFn: () => dexApi.getFarms().then((r) => r.data),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-40 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!farms?.length) {
    return (
      <div className="text-center py-20 text-gray-400">
        <Sprout size={40} className="mx-auto mb-4 opacity-40" />
        No active farms yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {farms.map((farm) => (
        <div key={farm.id} className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sprout size={18} className="text-green-400" />
              <span className="font-semibold text-sm">{farm.rewardTokenSymbol} Farm</span>
            </div>
            <span className="text-green-400 font-bold text-sm">{farm.apr}% APR</span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Total Staked</span>
              <span className="text-white font-mono">
                {parseFloat(farm.totalStaked).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Reward Token</span>
              <span className="text-white">{farm.rewardTokenSymbol}</span>
            </div>
          </div>

          <button className="btn-primary w-full text-sm py-2">
            Stake LP
          </button>
        </div>
      ))}
    </div>
  );
}
