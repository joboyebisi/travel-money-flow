
import { WalletInfo } from "./types";

export const supportedWallets: WalletInfo[] = [
  {
    name: "WalletConnect",
    icon: "walletconnect",
    chain: "SOLANA",
  },
  {
    name: "Torus",
    icon: "torus",
    chain: "SOLANA",
  },
  {
    name: "Install Bitget Wallet",
    icon: "bitget",
    chain: "SOLANA",
    installUrl: "https://web3.bitget.com/en/wallet-download",
  },
  {
    name: "Install Clover",
    icon: "clover",
    chain: "SOLANA",
    installUrl: "https://clover.finance/",
  },
  {
    name: "Install Coin98",
    icon: "coin98",
    chain: "SOLANA",
    installUrl: "https://coin98.com/wallet",
  },
  {
    name: "Install Solong",
    icon: "solong",
    chain: "SOLANA",
    installUrl: "https://solongwallet.io/",
  },
  {
    name: "Install Nightly",
    icon: "nightly",
    chain: "SOLANA",
    installUrl: "https://nightly.app/",
  },
];

export const defaultWallet = supportedWallets[0];
