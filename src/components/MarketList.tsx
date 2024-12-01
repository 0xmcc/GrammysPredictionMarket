'use client'

import { useState, useEffect } from 'react'
import { MarketCard } from './MarketCard'

// Mock data for initial development
const MOCK_MARKETS = [
  {
    id: '1',
    title: 'Record of the Year',
    category: '67th Annual Grammy Awards',
    description: 'Which artist will win Record of the Year at the Grammy Awards?',
    volume: '1.2M',
    trend: '+5.2%',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33',
    nominees: [
      {
        name: 'Taylor Swift',
        odds: 35.5,
        imageUrl: 'https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62'
      },
      {
        name: 'Billie Eilish',
        odds: 28.3,
        imageUrl: 'https://i.scdn.co/image/ab67616d0000b273659cd4673230913b3918e0d5'
      },
      // Add more nominees as needed
    ]
  },
  // Add more markets as needed
]

export function MarketList() {
  const [markets, setMarkets] = useState(MOCK_MARKETS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        // In the future, replace this with actual API call
        // const response = await fetch('/api/markets')
        // const data = await response.json()
        // setMarkets(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching markets:', error)
        setIsLoading(false)
      }
    }

    fetchMarkets()
  }, [])

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
      {markets.map((market) => (
        <MarketCard
          key={market.id}
          category={market.category}
          description={market.description}
          title={market.title}
          volume={market.volume}
          trend={market.trend}
          imageUrl={market.imageUrl}
          nominees={market.nominees}
          isMock={true} // Set to false when ready for production
        />
      ))}
    </div>
  )
}