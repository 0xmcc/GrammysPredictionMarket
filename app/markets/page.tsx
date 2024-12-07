import { getMarkets } from '@/lib/db/market'
import { MarketList } from '@/components/MarketList'
import TrendingMarkets from '@/components/TrendingMarkets'
import PopularArtists from '@/components/PopularArtists'

export const dynamic = 'force-dynamic'

export default async function MarketsPage() {
  try {
    const markets = await getMarkets()

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Grammy Predictions</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MarketList initialMarkets={markets} />
          </div>
          <div className="space-y-8">
            <TrendingMarkets />
            <PopularArtists />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in MarketsPage:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
          <h2 className="text-red-500 font-bold mb-2">Error Loading Markets</h2>
          <p className="text-gray-300">
            Unable to load markets at this time. Please try again later.
          </p>
        </div>
      </div>
    )
  }
}