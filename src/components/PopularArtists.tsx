import React from 'react';
import { Music } from 'lucide-react';

const PopularArtists = () => {
  const artists = [
    {
      name: "Taylor Swift",
      markets: 12,
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=60"
    },
    {
      name: "SZA",
      markets: 8,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop&q=60"
    },
    {
      name: "Olivia Rodrigo",
      markets: 6,
      imageUrl: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=400&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Music className="h-5 w-5 text-purple-500" />
        <h3 className="text-lg font-bold">Popular Artists</h3>
      </div>

      <div className="space-y-4">
        {artists.map((artist, index) => (
          <div key={index} className="flex items-center space-x-4">
            <img 
              src={artist.imageUrl} 
              alt={artist.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-gray-300">{artist.name}</p>
              <p className="text-sm text-gray-400">{artist.markets} active markets</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularArtists;