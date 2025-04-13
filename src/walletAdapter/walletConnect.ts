
import { ConnectedWallet, WalletInfo } from "./types";

// Simulate wallet connection - in a real implementation, this would use the WalletConnect SDK
export async function connectWallet(wallet: WalletInfo): Promise<ConnectedWallet> {
  console.log(`Connecting to wallet: ${wallet.name}`);
  
  // Simulate connection delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockAddress = `${wallet.chain === "SOLANA" ? 
        Array(44).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("") : 
        "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("")}`;
      
      resolve({
        name: wallet.name,
        address: mockAddress,
        chain: wallet.chain,
        balance: {
          USDC: "5240.00",
          SOL: wallet.chain === "SOLANA" ? "325.00" : "0.00",
          ETH: wallet.chain === "ETHEREUM" ? "2.15" : "0.00",
        },
      });
    }, 2000);
  });
}

export async function disconnectWallet(): Promise<void> {
  console.log("Disconnecting wallet");
  
  // Simulate disconnection delay
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
}

export function generateQRCodeUrl(): string {
  // In a real implementation, this would generate a proper WalletConnect URI
  return "wc:00000000-0000-0000-0000-000000000000@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=00000000000000000000000000000000000000000000000000000000000000";
}
