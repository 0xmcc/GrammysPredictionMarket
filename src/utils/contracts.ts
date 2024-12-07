//'use client'

import { Contract, JsonRpcSigner } from 'ethers';
// import { abi as MARKET_ABI } from '@/contracts/Market/Market.json';
// import { abi as FACTORY_ABI } from '@/contracts/MarketFactory/MarketFactory.json';
// import { abi as MOCK_ERC20_ABI } from '@/contracts/MockERC20/MockERC20.json';
// import { abi as GRAMMY_ERC20_ABI } from '@/contracts/GrammyERC20/GrammyERC20.json';


import MARKET_CONTRACT from '@/contracts/Market/Market.json';
import FACTORY_CONTRACT from '@/contracts/MarketFactory/MarketFactory.json';
import MOCK_ERC20_CONTRACT from '@/contracts/MockERC20/MockERC20.json';
import GRAMMY_ERC20_CONTRACT from '@/contracts/GrammyERC20/GrammyERC20.json';

// Export the ABIs for use in other files
export const MARKET_ABI = MARKET_CONTRACT.abi;
export const FACTORY_ABI = FACTORY_CONTRACT.abi;
export const MOCK_ERC20_ABI = MOCK_ERC20_CONTRACT.abi;
export const GRAMMY_ERC20_ABI = GRAMMY_ERC20_CONTRACT.abi;

// Export the ABIs for use in other files
///export { FACTORY_ABI, MARKET_ABI, MOCK_ERC20_ABI, GRAMMY_ERC20_ABI };

// Contract addresses
export const FACTORY_ADDRESS = '0x5EDBe9CB83806F7d54062aFc4a3BAcEd75c1cfa2';
export const MARKET_FACTORY_ADDRESS = '0x5EDBe9CB83806F7d54062aFc4a3BAcEd75c1cfa2';
export const MOCK_ERC20_ADDRESS = '0xE32bd061A6Bdee29B97cD35cE36B5ae534Fe640f';
export const GRAMMY_ERC20_ADDRESS = '0x4098E4886D4BE903a30AA3C73F1eBDFF76F0fa20';

// Chain configuration
export const AMOY_CHAIN_CONFIG = {
  chainId: '0x13882', // 80002 in hex
  chainName: 'Polygon Amoy Testnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://rpc-amoy.polygon.technology'],
  blockExplorerUrls: ['https://www.oklink.com/amoy'],
};

// Contract interaction functions
export const getMarketContract = async (address: string, signer: JsonRpcSigner) => {
  try {
    if (!signer.provider) {
      throw new Error('No provider available');
    }
    return new Contract(address, MARKET_ABI, signer);
  } catch (error) {
    console.error('Error creating market contract instance:', error);
    throw error;
  }
};

export const getFactoryContract = (signer: JsonRpcSigner) => {
  if (!signer.provider) {
    throw new Error('No provider available');
  }
  return new Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
};

export const getGrammyERC20Contract = (signer: JsonRpcSigner) => {
  if (!signer.provider) {
    throw new Error('No provider available');
  }
  return new Contract(GRAMMY_ERC20_ADDRESS, GRAMMY_ERC20_ABI, signer);
};