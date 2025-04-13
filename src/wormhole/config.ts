
import { NetworkConfig } from "./types";

// Network configuration for CCTP-supported chains
export const networkConfig: NetworkConfig = {
  chains: [
    {
      id: "solana",
      name: "Solana",
      icon: "solana",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      icon: "ethereum",
    },
    {
      id: "base",
      name: "Base",
      icon: "base",
    },
    {
      id: "bsc",
      name: "BSC",
      icon: "bsc",
    },
    {
      id: "near",
      name: "Near",
      icon: "near",
    },
  ],
  supportedTokens: {
    solana: [
      {
        symbol: "USDC",
        name: "USD Coin",
        icon: "usdc",
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        chainId: "solana",
      },
      {
        symbol: "SOL",
        name: "SOL",
        icon: "sol",
        chainId: "solana",
      },
      {
        symbol: "WSOL",
        name: "Wrapped SOL",
        icon: "wsol",
        address: "So11111111111111111111111111111111111111112",
        decimals: 9,
        chainId: "solana",
      },
      {
        symbol: "PYTH",
        name: "Pyth Network",
        icon: "pyth",
        chainId: "solana",
      },
      {
        symbol: "CRWNY",
        name: "Crowny",
        icon: "crwny",
        chainId: "solana",
      },
    ],
    ethereum: [
      {
        symbol: "USDC",
        name: "USD Coin",
        icon: "usdc",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        decimals: 6,
        chainId: "ethereum",
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        icon: "eth",
        chainId: "ethereum",
      },
    ],
    base: [
      {
        symbol: "USDC",
        name: "USD Coin",
        icon: "usdc",
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        decimals: 6,
        chainId: "base",
      },
    ],
    bsc: [
      {
        symbol: "USDC",
        name: "USD Coin",
        icon: "usdc",
        address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        decimals: 18,
        chainId: "bsc",
      },
    ],
    near: [
      {
        symbol: "USDC",
        name: "USD Coin",
        icon: "usdc",
        address: "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near",
        decimals: 6,
        chainId: "near",
      },
    ],
  },
};
