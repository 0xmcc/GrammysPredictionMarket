// File: src/components/providers.tsx
'use client'

import { WalletProvider } from '@/context/WalletContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ReactNode, useState, useEffect } from 'react'


interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [supabase] = useState(() => createClientComponentClient())

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('SIGNED_IN', session)
      } else if (event === 'SIGNED_OUT') {
        console.log('SIGNED_OUT', session)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])
  return (
    <WalletProvider>
      {children} 
    </WalletProvider>
  )
}