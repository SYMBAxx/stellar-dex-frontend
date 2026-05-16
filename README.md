# stellar-dex-frontend

Next.js 14 frontend for the Stellar DEX — swap, liquidity, farms, analytics.

## Stack

- Next.js 14 (App Router)
- TypeScript + Tailwind CSS
- Zustand (wallet state)
- TanStack Query (server state)
- Recharts (analytics charts)
- Freighter wallet integration
- Stellar SDK (transaction building)

## Quick Start

```bash
cp .env.example .env.local
# Fill in contract IDs and API URL
npm install
npm run dev
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with protocol stats |
| `/swap` | Token swap interface |
| `/pools` | Liquidity pool explorer |
| `/farms` | LP staking farms |
| `/analytics` | TVL, volume, charts |

## Wallet Support

- Freighter (primary)
- Albedo (adapter ready in `src/lib/wallet/`)

## Deploy

Vercel (recommended):
```bash
vercel --prod
```

Docker:
```bash
docker build -t stellar-dex-frontend .
docker run -p 3000:3000 stellar-dex-frontend
```
