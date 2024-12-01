import { useState, useEffect } from 'react';
import { JsonRpcSigner } from 'ethers';
import { getGrammyERC20Contract } from '../utils/contracts';

export const useWalletBalance = (signer: JsonRpcSigner | null) => {
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    const fetchBalance = async () => {
      if (!signer) return;

      try {
        const contract = getGrammyERC20Contract(signer);
        const address = await signer.getAddress();
        const balance = await contract.balanceOf(address);
        setBalance(balance.toString());
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, [signer]);

  return balance;
}; 