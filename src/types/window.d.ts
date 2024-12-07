// File: src/types/window.d.ts
// interface Window {
//     ethereum?: any
//   }

  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: <T>(args: { method: string; params?: unknown[] }) => Promise<T>;
      on: (event: string, callback: (accounts: string[]) => void) => void;
      removeListener: (event: string, callback: (accounts: string[]) => void) => void;
      selectedAddress: string | null;
      networkVersion?: string;
      chainId?: string;
    };
  }