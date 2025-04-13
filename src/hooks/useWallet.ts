
import { useState, useCallback } from "react";
import { ConnectedWallet, WalletConnectionStatus } from "@/walletAdapter/types";
import { connectWallet, disconnectWallet } from "@/walletAdapter/walletConnect";
import { useToast } from "@/hooks/use-toast";
import { supportedWallets, defaultWallet } from "@/walletAdapter/walletConfig";

export function useWallet() {
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null);
  const [status, setStatus] = useState<WalletConnectionStatus>("disconnected");
  const [isModalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const connect = useCallback(async (walletName: string) => {
    try {
      setStatus("connecting");
      const walletInfo = supportedWallets.find(w => w.name === walletName) || defaultWallet;
      const connected = await connectWallet(walletInfo);
      setWallet(connected);
      setStatus("connected");
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${connected.name} successfully`,
      });
      
      return connected;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setStatus("disconnected");
      
      toast({
        title: "Connection Failed",
        description: "Failed to connect to wallet. Please try again.",
        variant: "destructive",
      });
      
      return null;
    }
  }, [toast]);

  const disconnect = useCallback(async () => {
    try {
      await disconnectWallet();
      setWallet(null);
      setStatus("disconnected");
      
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
      });
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const getBalance = useCallback((symbol: string): string => {
    if (!wallet || !wallet.balance) return "0";
    return wallet.balance[symbol] || "0";
  }, [wallet]);

  return {
    wallet,
    status,
    isConnected: status === "connected",
    isConnecting: status === "connecting",
    isModalOpen,
    openModal,
    closeModal,
    connect,
    disconnect,
    getBalance
  };
}
