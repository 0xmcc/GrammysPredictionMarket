'use client'

import { useState } from 'react'
import { MarketCard } from './MarketCard'
import type { MarketWithOutcomes } from '@/lib/types/market'
import { MOCK_MARKETS } from '@/lib/mocks/markets'

interface MarketListProps {
  initialMarkets: MarketWithOutcomes[]
}

export function MarketList({ initialMarkets }: MarketListProps) {
  const [markets] = useState<MarketWithOutcomes[]>(
    initialMarkets.length > 0 ? initialMarkets : MOCK_MARKETS
  )
  const [isLoading] = useState(false)
  const [isMock] = useState(initialMarkets.length === 0)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
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
      {markets.map((market) => (
        <MarketCard
          key={market.address}
          market={market}
          isMock={isMock}
        />
      ))}
    </div>
  )
}