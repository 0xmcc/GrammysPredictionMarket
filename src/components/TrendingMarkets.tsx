import React from 'react';
import { TrendingUp } from 'lucide-react';

const TrendingMarkets = () => {
  const trends = [
    { name: "Best Pop Vocal Album", volume: "156K", change: "+5.2%" },
    { name: "Song of the Year", volume: "98K", change: "+3.8%" },
    { name: "Best Rap Performance", volume: "87K", change: "+2.1%" },
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="h-5 w-5 text-purple-500" />
        <h3 className="text-lg font-bold">Trending Markets</h3>
      </div>

      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-gray-300">{trend.name}</span>
            <div className="text-sm">
              <span className="text-gray-400 mr-2">{trend.volume}</span>
              <span className="text-green-500">{trend.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMarkets;