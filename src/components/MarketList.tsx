'use client'

import { useState } from 'react'
import { MarketCard } from './MarketCard'
import type { Market } from '@/lib/types/market'
import { MOCK_MARKETS } from '@/lib/mocks/markets'

interface MarketListProps {
  initialMarkets: Market[]
}

export function MarketList({ initialMarkets }: MarketListProps) {
  const [markets] = useState<Market[]>(
    initialMarkets.length > 0 ? initialMarkets : MOCK_MARKETS
  )
  const [isLoading] = useState(false)
  const [isMock] = useState(initialMarkets.length === 0)
  const [error] = useState<Error | null>(null);

  if (error) {
    return (
      <div className="text-red-500">
        Failed to load markets. Please try again.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
          <div 
          key={`skeleton-${i}`}
            className="h-48 bg-gray-800 rounded-xl animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {isMock && (
        <div className="text-amber-500 text-sm mb-4 p-2 bg-amber-500/10 rounded-lg">
          Showing mock data - database connection unavailable
        </div>
      )}
      {markets.map(market => (
        <MarketCard
          key={market.id}
          market={{
            ...market,
          }}
          isMock={isMock}
        />
      ))}
    </div>
  )
}