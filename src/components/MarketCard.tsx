'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import type { Market } from '@/lib/types/market'

interface Nominee {
  name: string;
  odds: number;
  imageUrl: string;
}

interface MarketCardProps {
  market: Market;
  isMock?: boolean;
}

export function MarketCard({ 
  market,
  isMock = false
}: MarketCardProps) {
  const volume = '1.2M';
  const trend = '+5.2%';
  const market_imageUrl = 'https://i.scdn.co/image/ab67616d0000b2735076e4160d018e378f488c33'
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<string>("");
  const [selectedOutcomeId, setSelectedOutcomeId] = useState<string | null>(null);

  const { isConnected, connect } = useWallet();
  
  const isTrendingUp = true// trend.startsWith('+');
  const sortedNominees = [...market.market_outcomes].sort((a, b) => b.odds - a.odds);

  const handleBet = async () => {
    if (!isConnected) {
      await connect();
      return;
    }

    if (!selectedOutcomeId || !betAmount || isMock) return;
    
    try {
      console.log(`Placing bet of ${betAmount} on ${selectedOutcomeId}`);
    } catch (error) {
      console.error('Error placing bet:', error);
    }
  };

  return (
    <div 
      className={`rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition 
      ${isMock 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-gradient-to-br from-purple-900/50 to-gray-800 border border-purple-500/30'}`}
    >
      {/* Demo Banner */}
      {isMock && (
        <div className="bg-yellow-500/10 px-3 py-1 border-b border-yellow-500/20">
          <span className="text-yellow-500 text-sm font-medium">Demo Market</span>
        </div>
      )}
      
      {/* Card Header */}
      <div 
        className="flex cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-1/3">
          <img 
            src={market_imageUrl} 
            alt={market.description} 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-2/3 p-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-purple-400 text-sm font-medium">{market.category}</span>
              <h3 className="text-xl font-bold mt-1">{market.title}</h3>
            </div>
            <div className="flex items-center space-x-2">
              {isTrendingUp ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              <span className={isTrendingUp ? "text-green-500" : "text-red-500"}>
                {trend}
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              <span>Volume: {volume}</span>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6">
          {/* Nominee List */}
          <div className="grid grid-cols-1 gap-4 mt-4">
            {sortedNominees.map((nominee) => (
              <div 
                key={nominee.name}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition
                  ${selectedNominee === nominee.name 
                    ? 'bg-purple-600/20 ring-2 ring-purple-500' 
                    : 'bg-gray-700/50 hover:bg-gray-700'}`}
                onClick={() => setSelectedNominee(nominee.name)}
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={nominee.imageUrl} 
                    alt={nominee.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="font-medium">{nominee.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Likelihood</div>
                  <div className="font-bold text-purple-400">{nominee.odds.toFixed(2)}%</div>
                </div>
              </div>
            ))}
          </div>

          {/* Betting Section */}
          <div className="mt-6 space-y-4">
            <div className="flex space-x-4">
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="Enter bet amount"
                className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isMock}
              />
              <button
                onClick={handleBet}
                disabled={!selectedNominee || isMock || (!isConnected && !betAmount)}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg transition"
              >
                {isMock ? 'Demo Only' : isConnected ? 'Place Bet' : 'Connect Wallet'}
              </button>
            </div>
            {selectedNominee && betAmount && !isMock && (
              <div className="text-sm text-gray-400">
                Potential win: <span className="text-purple-400 font-bold">
                  ${(parseFloat(betAmount) * (market.find(n => n.name === selectedNominee)?.odds || 0)).toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

