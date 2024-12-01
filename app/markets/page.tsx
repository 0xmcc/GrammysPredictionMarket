import { MarketList } from '@/components/MarketList'
import TrendingMarkets from '@/components/TrendingMarkets'
import PopularArtists from '@/components/PopularArtists'

export default function MarketsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Grammy Predictions</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MarketList />
        </div>
        <div className="space-y-8">
          <TrendingMarkets />
          <PopularArtists />
        </div>
      </div>
    </div>
  )
}