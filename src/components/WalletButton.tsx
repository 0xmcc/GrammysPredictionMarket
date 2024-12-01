import React from 'react';
import { useWallet } from '../context/WalletContext';
import { Wallet, ChevronDown, LogOut, ExternalLink } from 'lucide-react';
import { formatUnits } from 'ethers';
import { useWalletBalance } from '../hooks/useWalletBalance';
// Utility function to format numbers
const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};
const WalletButton = () => {
  const { isConnected, address, connect, disconnect, signer } = useWallet();
  const rawBalance = useWalletBalance(signer);
  const [formattedBalance, setFormattedBalance] = React.useState<string>('0');

  React.useEffect(() => {
    if (rawBalance) {
      // Convert the raw balance to a human-readable format
      const balanceInTokens = formatUnits(rawBalance, 18); // Assuming 18 decimals
      setFormattedBalance(formatNumber(parseFloat(balanceInTokens)));
    }
  }, [rawBalance]);

  const renderConnectButton = () => (
    <button onClick={connect} className="btn-primary flex items-center space-x-2">
      <Wallet className="h-5 w-5" />
      <span>Connect Wallet</span>
    </button>
  );

  const renderWalletInfo = () => (
    <div className="relative group">
      <button
        className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-all"
      >
        <div className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-green-400" />
          <span className="text-green-400 font-medium">
            {`${address!.slice(0, 6)}...${address!.slice(-4)}`}
          </span>
        </div>
        <div className="h-4 w-px bg-white/10"></div>
        <span className="font-medium">{formattedBalance} GRAM</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg py-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
        <a
          href={`https://amoy.polygonscan.com/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View on Explorer</span>
        </a>
        <button
          onClick={disconnect}
          className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Disconnect</span>
        </button>
      </div>
    </div>
  );

  return isConnected ? renderWalletInfo() : renderConnectButton();
};

export default WalletButton;

// 'use client'

// import React from 'react'
// import { useWallet } from '@/context/WalletContext'
// import { Wallet, ChevronDown, LogOut, ExternalLink } from 'lucide-react'

// // Utility function to format numbers
// const formatNumber = (num: number): string => {
//   if (num >= 1_000_000) {
//     return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
//   }
//   if (num >= 1_000) {
//     return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
//   }
//   return num.toString()
// }

// export function WalletButton() {
//   const { isConnected, address, connect, disconnect } = useWallet()
//   const [isOpen, setIsOpen] = React.useState(false)

//   const renderConnectButton = () => (
//     <button
//       onClick={connect}
//       className="flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
//     >
//       <Wallet className="h-4 w-4" />
//       <span>Connect Wallet</span>
//     </button>
//   )

//   const renderWalletInfo = () => (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
//       >
//         <Wallet className="h-4 w-4" />
//         <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
//         <ChevronDown className="h-4 w-4" />
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-64 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
//           <div className="p-4 border-b border-gray-700">
//             <div className="text-sm text-gray-400">Connected Wallet</div>
//             <div className="font-mono text-sm">{address}</div>
//           </div>

//           <a
//             href={`https://www.oklink.com/amoy/address/${address}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
//           >
//             <ExternalLink className="h-4 w-4" />
//             <span>View on Explorer</span>
//           </a>

//           <button
//             onClick={disconnect}
//             className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
//           >
//             <LogOut className="h-4 w-4" />
//             <span>Disconnect</span>
//           </button>
//         </div>
//       )}
//     </div>
//   )

//   return isConnected ? renderWalletInfo() : renderConnectButton()
// }