
export interface ChainInfo {
  id: string;
  name: string;
  icon: string;
  nativeToken?: string;
}

export interface TokenInfo {
  symbol: string;
  name: string;
  icon: string;
  address?: string;
  decimals?: number;
  chainId?: string;
}

export interface NetworkConfig {
  chains: ChainInfo[];
  supportedTokens: {
    [chainId: string]: TokenInfo[];
  };
}

export interface SwapParams {
  sourceChain: string;
  targetChain: string;
  sourceToken: string;
  targetToken: string;
  amount: string;
}

export interface CCTPMessage {
  messageBytes: Uint8Array;
  attestation: Uint8Array;
  nonce: number;
  sourceChain: number;
  targetChain: number;
  amount: bigint;
}
