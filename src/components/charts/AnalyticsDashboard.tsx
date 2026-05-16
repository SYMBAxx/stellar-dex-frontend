'use client';

import { useStats } from '@/hooks/useStats';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Droplets, Activity, BarChart2 } from 'lucide-react';

// Placeholder chart data — replace with real candle data from API
const MOCK_VOLUME = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
  volume: Math.random() * 500000 + 100000,
}));

export function AnalyticsDashboard() {
  const { data: stats, isLoading } = useStats();

  const statCards = [
    {
      label: 'Total Value Locked',
      value: stats ? `$${parseFloat(stats.tvlUsd).toLocaleString()}` : '—',
      icon: Droplets,
      color: 'text-blue-400',
    },
    {
      label: '24h Volume',
      value: stats ? `$${parseFloat(stats.volume24hUsd).toLocaleString()}` : '—',
      icon: TrendingUp,
      color: 'text-green-400',
    },
    {
      label: 'Active Pools',
      value: stats?.poolCount ?? '—',
      icon: Activity,
      color: 'text-brand',
    },
    {
      label: 'Total Swaps',
      value: stats?.swapCount?.toLocaleString() ?? '—',
      icon: BarChart2,
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card p-5">
            <Icon size={20} className={`${color} mb-3`} />
            {isLoading ? (
              <div className="skeleton h-7 w-24 mb-1" />
            ) : (
              <div className="text-2xl font-bold">{value}</div>
            )}
            <div className="text-gray-400 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Volume chart */}
      <div className="card p-6">
        <h2 className="font-semibold mb-6">30-Day Volume</h2>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={MOCK_VOLUME}>
            <defs>
              <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fill: '#6B7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#6B7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                background: '#16162A',
                border: '1px solid #2A2A45',
                borderRadius: '12px',
                color: '#fff',
              }}
              formatter={(v: number) => [`$${v.toLocaleString()}`, 'Volume']}
            />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#7C3AED"
              strokeWidth={2}
              fill="url(#volumeGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
