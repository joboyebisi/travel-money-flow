
import { useState } from "react";
import { networkConfig } from "@/wormhole/config";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChainInfo } from "@/wormhole/types";

interface NetworkSelectorProps {
  selectedChain?: string;
  onSelect: (chain: ChainInfo) => void;
  position: "from" | "to";
}

export function NetworkSelector({ selectedChain, onSelect, position }: NetworkSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectNetwork = (chain: ChainInfo) => {
    onSelect(chain);
    setIsOpen(false);
  };

  const renderNetworkIcon = (icon: string) => {
    switch (icon) {
      case "solana":
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-blue-400 to-teal-300 flex items-center justify-center">
            <span className="text-xs font-bold">S</span>
          </div>
        );
      case "ethereum":
        return (
          <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center">
            <span className="text-xs font-bold">Ξ</span>
          </div>
        );
      case "base":
        return (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-xs font-bold">B</span>
          </div>
        );
      case "bsc":
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-xs font-bold">BSC</span>
          </div>
        );
      case "near":
        return (
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <span className="text-xs font-bold text-white">N</span>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-xs font-bold">?</span>
          </div>
        );
    }
  };

  const selectedNetwork = networkConfig.chains.find(chain => chain.id === selectedChain);

  if (!isOpen && selectedNetwork) {
    return (
      <Button 
        variant="outline" 
        className="flex justify-between items-center w-full p-4 h-auto bg-dark"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-2">
          {renderNetworkIcon(selectedNetwork.icon)}
          <span className="text-lg">{selectedNetwork.name}</span>
        </div>
        <span className="text-muted-foreground">▼</span>
      </Button>
    );
  }

  return (
    <Card className="bg-darker border-border">
      <CardContent className="p-4 space-y-6">
        <h3 className="text-xl font-semibold">Select a network</h3>
        
        <div className="grid grid-cols-5 gap-2">
          {networkConfig.chains.map((chain) => (
            <Button
              key={chain.id}
              variant="outline"
              className={`flex flex-col items-center justify-center h-24 border ${
                selectedChain === chain.id ? "border-green-primary" : "border-border"
              } p-2 bg-dark hover:border-green-primary`}
              onClick={() => handleSelectNetwork(chain)}
            >
              {renderNetworkIcon(chain.icon)}
              <span className="mt-2 text-sm">{chain.name}</span>
            </Button>
          ))}
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 border border-border p-2 bg-dark opacity-50"
            disabled
          >
            <Plus className="w-8 h-8" />
            <span className="mt-2 text-sm">other</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
