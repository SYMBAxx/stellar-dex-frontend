'use client';

import { usePools } from '@/hooks/usePools';
import { useState } from 'react';
import Link from 'next/link';

export function PoolsTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePools(page);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-surface-border text-left text-sm text-gray-400">
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Pool</th>
            <th className="px-6 py-4 text-right">TVL</th>
            <th className="px-6 py-4 text-right">24h Volume</th>
            <th className="px-6 py-4 text-right">Fee</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((pool, i) => (
            <tr
              key={pool.id}
              className="border-b border-surface-border hover:bg-surface-hover transition-colors"
            >
              <td className="px-6 py-4 text-gray-400 text-sm">{(page - 1) * 20 + i + 1}</td>
              <td className="px-6 py-4">
                <Link href={`/pools/${pool.contractId}`} className="font-medium hover:text-brand transition-colors">
                  {pool.token0Symbol}/{pool.token1Symbol}
                </Link>
              </td>
              <td className="px-6 py-4 text-right font-mono text-sm">
                ${parseFloat(pool.tvlUsd).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right font-mono text-sm">
                ${parseFloat(pool.volume24h).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right text-sm text-gray-400">
                {pool.feePercent}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-sm text-gray-400">
          {data?.total ?? 0} pools total
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn-secondary text-sm py-1.5 px-3 disabled:opacity-40"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!data || data.data.length < 20}
            className="btn-secondary text-sm py-1.5 px-3 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
