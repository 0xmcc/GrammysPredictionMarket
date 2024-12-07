import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { AMOY_CHAIN_CONFIG } from '../utils/contracts';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  signer: JsonRpcSigner | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchToAmoy: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  signer: null,
  connect: async () => {},
  disconnect: () => {},
  switchToAmoy: async () => {},
});

export const useWallet = () => useContext(WalletContext);

interface MetaMaskError extends Error {
  code: number;
}

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  useEffect(() => {
    checkConnection();
    console.log('checkConnection');
    window.ethereum?.on('accountsChanged', checkConnection);
    window.ethereum?.on('chainChanged', () => window.location.reload());

    return () => {
      window.ethereum?.removeListener('accountsChanged', checkConnection);
      window.ethereum?.removeListener('chainChanged', () => {});
    };
  }, []);

  const checkConnection = async () => {
    if (!window.ethereum) return;

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setIsConnected(true);
        setAddress(address);
        setSigner(signer);
      } else {
        disconnect();
      }
    } catch (error) {
      console.error('Error checking connection:', error);
      disconnect();
    }
  };

  const switchToAmoy = async () => {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: AMOY_CHAIN_CONFIG.chainId }],
      });
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        const mmError = error as MetaMaskError;
        if (mmError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [AMOY_CHAIN_CONFIG],
            });
          } catch (addError) {
            console.error('Error adding Amoy network:', addError);
            throw addError;
          }
        }
      }
      throw error;
    }
  };

  const connect = async () => {
    console.log('connect');
    if (!window.ethereum) {
      alert('Please install MetaMask to use this feature!');
      return;
    }

    try {
      await switchToAmoy();
      const provider = new BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setIsConnected(true);
      setAddress(address);
      setSigner(signer);
    } catch (error: unknown) {
      // if (error && typeof error === 'object' && 'message' in error && error.message?.includes('User rejected')) {
      //   console.log('User cancelled wallet connection');
      //   return;
      // }
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please make sure MetaMask is properly configured.');
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setSigner(null);
  };

  return (
    <WalletContext.Provider value={{ 
      isConnected, 
      address, 
      signer, 
      connect, 
      disconnect,
      switchToAmoy
    }}>
      {children}
    </WalletContext.Provider>
  );
};
