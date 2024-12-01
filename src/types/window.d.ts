// File: src/types/window.d.ts
interface Window {
    ethereum?: any
  }

  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (...args: any[]) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      selectedAddress?: string;
      networkVersion?: string;
      chainId?: string;
    };
  }