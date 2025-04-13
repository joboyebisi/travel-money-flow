
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { Wallet, ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  title: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  const { 
    wallet, 
    isConnected, 
    isConnecting, 
    isModalOpen, 
    openModal, 
    closeModal, 
    connect,
    disconnect
  } = useWallet();
  
  const handleWalletConnect = (walletName: string) => {
    connect(walletName);
  };

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        
        {!isConnected ? (
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={openModal}
            disabled={isConnecting}
          >
            <Wallet className="h-4 w-4" />
            <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span>{truncateAddress(wallet?.address || "")}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-darker border-border">
              <DropdownMenuLabel>Wallet</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <span className="text-muted-foreground">Address:</span>
                <span className="text-xs">{truncateAddress(wallet?.address || "")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <span className="text-muted-foreground">Chain:</span>
                <span>{wallet?.chain || ""}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive flex items-center gap-2" onClick={disconnect}>
                <LogOut className="h-4 w-4" />
                <span>Disconnect</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <WalletConnectModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onConnect={handleWalletConnect} 
      />
    </>
  );
}
