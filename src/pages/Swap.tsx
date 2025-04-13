
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SwapCard } from "@/components/swap/SwapCard";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";

export function Swap() {
  const { isModalOpen, openModal, closeModal, connect, isConnected } = useWallet();
  
  const handleWalletConnect = (walletName: string) => {
    connect(walletName);
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col md:flex-row">
      <DashboardNav />
      <div className="flex-1 overflow-auto">
        <DashboardHeader title="Swap Crypto" />
        <div className="p-6 flex justify-center">
          <SwapCard />
        </div>
      </div>
      
      <WalletConnectModal
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onConnect={handleWalletConnect}
      />
    </div>
  );
}

export default Swap;
