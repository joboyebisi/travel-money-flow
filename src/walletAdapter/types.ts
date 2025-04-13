
export interface WalletInfo {
  name: string;
  icon: string;
  chain: string;
  installUrl?: string;
}

export interface ConnectedWallet {
  name: string;
  address: string;
  chain: string;
  balance?: {
    [symbol: string]: string;
  };
}

export type WalletConnectionStatus = 'disconnected' | 'connecting' | 'connected';
