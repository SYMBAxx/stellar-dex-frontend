'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { WalletButton } from '@/components/wallet/WalletButton';
import { Zap } from 'lucide-react';

const NAV_LINKS = [
  { href: '/swap', label: 'Swap' },
  { href: '/pools', label: 'Pools' },
  { href: '/farms', label: 'Farms' },
  { href: '/analytics', label: 'Analytics' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface/80 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Zap size={20} className="text-brand" />
          StellarDEX
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-brand/10 text-brand'
                  : 'text-gray-400 hover:text-white hover:bg-surface-hover',
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <WalletButton />
      </div>
    </nav>
  );
}
