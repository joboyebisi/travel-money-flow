
import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Search, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supportedWallets } from "@/walletAdapter/walletConfig";
import { WalletInfo } from "@/walletAdapter/types";
import { connectWallet, generateQRCodeUrl } from "@/walletAdapter/walletConnect";
import { useToast } from "@/hooks/use-toast";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletName: string) => void;
}

export function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<WalletInfo | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isOpen) {
      setSelectedWallet(null);
      setConnecting(false);
      setSearchQuery("");
    }
  }, [isOpen]);

  const filteredWallets = searchQuery
    ? supportedWallets.filter(wallet => 
        wallet.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : supportedWallets;

  const handleWalletSelect = async (wallet: WalletInfo) => {
    if (wallet.installUrl) {
      // This is just a link to install the wallet
      window.open(wallet.installUrl, "_blank");
      return;
    }

    setSelectedWallet(wallet);
    setConnecting(true);

    try {
      const connectedWallet = await connectWallet(wallet);
      toast({
        title: "Wallet Connected",
        description: `Connected to ${wallet.name} successfully`,
      });
      onConnect(connectedWallet.name);
      onClose();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to wallet. Please try again.",
        variant: "destructive",
      });
      setConnecting(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generateQRCodeUrl());
    setCopied(true);
    toast({
      title: "Copied",
      description: "WalletConnect URL copied to clipboard",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const renderWalletIcon = (name: string) => {
    if (name.includes("WalletConnect")) {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-xs font-bold text-white">W</span>
        </div>
      );
    } else if (name.includes("Torus")) {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
          <span className="text-xs font-bold text-white">T</span>
        </div>
      );
    } else if (name.includes("Bitget")) {
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-300 to-blue-600 flex items-center justify-center">
          <span className="text-xs font-bold">B</span>
        </div>
      );
    } else if (name.includes("Clover")) {
      return (
        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
          <span className="text-xs font-bold">+</span>
        </div>
      );
    } else if (name.includes("Coin98")) {
      return (
        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
          <span className="text-xs font-bold">98</span>
        </div>
      );
    } else if (name.includes("Solong")) {
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-green-400 flex items-center justify-center">
          <span className="text-xs font-bold">S</span>
        </div>
      );
    } else if (name.includes("Nightly")) {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-xs font-bold text-white">N</span>
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-xs font-bold">?</span>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-darker border-border max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-bold">Connect a wallet</DialogTitle>
          {!selectedWallet && (
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10 bg-dark border-border"
                placeholder="Search for a wallet"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </DialogHeader>

        {!selectedWallet ? (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredWallets.map((wallet) => (
              <Button
                key={wallet.name}
                variant="ghost"
                className="flex justify-between items-center w-full p-3 hover:bg-dark"
                onClick={() => handleWalletSelect(wallet)}
              >
                <div className="flex items-center gap-3">
                  {renderWalletIcon(wallet.name)}
                  <div className="flex flex-col items-start">
                    <span className="font-bold">{wallet.name}</span>
                    <span className="text-xs text-muted-foreground">{wallet.chain}</span>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              {renderWalletIcon(selectedWallet.name)}
              <span className="text-xl font-bold">{selectedWallet.name}</span>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-lg text-muted-foreground mb-4">
                Scan QR code with a {selectedWallet.name}-compatible wallet
              </h3>
              
              <div className="border border-border p-4 bg-white">
                {/* Placeholder for QR code - in real app, this would be a real QR code */}
                <div className="w-64 h-64 bg-white">
                  <img 
                    src="/public/lovable-uploads/ae2d6b20-2517-47bb-8935-f107b0ad0d8e.png" 
                    alt="QR Code" 
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              <Button
                variant="outline" 
                className="mt-4 flex items-center gap-2"
                onClick={handleCopyToClipboard}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                Copy to clipboard
              </Button>
            </div>
            
            <Button 
              onClick={() => setSelectedWallet(null)}
              variant="outline"
              className="mt-2"
            >
              Back to wallet selection
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
