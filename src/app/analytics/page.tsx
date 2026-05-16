import { AnalyticsDashboard } from '@/components/charts/AnalyticsDashboard';

export const metadata = { title: 'Analytics — StellarDEX' };

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>
      <AnalyticsDashboard />
    </div>
  );
}
