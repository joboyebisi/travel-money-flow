
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SwapCard } from "@/components/swap/SwapCard";

export function Swap() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { toast } = useToast();
  
  const handleWalletConnect = () => {
    // This would be replaced with actual wallet connection logic
    setIsWalletConnected(true);
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been connected successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col md:flex-row">
      <DashboardNav />
      <div className="flex-1 overflow-auto">
        <DashboardHeader 
          title="Swap Crypto" 
          isWalletConnected={isWalletConnected}
          onConnectWallet={handleWalletConnect}
        />
        <div className="p-6 flex justify-center">
          <SwapCard isWalletConnected={isWalletConnected} />
        </div>
      </div>
    </div>
  );
}

export default Swap;
