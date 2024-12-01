import Link from 'next/link'
import { usePathname } from 'next/navigation'
import WalletButton from './WalletButton'

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-gray-800 border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link 
              href="/markets"
              className={`text-sm font-medium ${
                pathname === '/markets' 
                  ? 'text-purple-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Markets
            </Link>
            <Link 
              href="/leaderboard"
              className={`text-sm font-medium ${
                pathname === '/leaderboard' 
                  ? 'text-purple-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Leaderboard
            </Link>
            <Link 
              href="/talent-search"
              className={`text-sm font-medium ${
                pathname === '/talent-search' 
                  ? 'text-purple-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Talent Search
            </Link>
          </div>
          <WalletButton />
        </div>
      </div>
    </nav>
  )
}