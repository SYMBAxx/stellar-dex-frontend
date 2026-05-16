import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StellarDEX — Decentralized Exchange on Stellar',
  description: 'Swap tokens, provide liquidity, and earn rewards on the Stellar network.',
  openGraph: {
    title: 'StellarDEX',
    description: 'The leading DEX on Stellar Soroban',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-surface text-white min-h-screen`}>
        <Providers>
          <Navbar />
          <main className="pt-16">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
