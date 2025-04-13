
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { networkConfig } from "@/wormhole/config";
import { TokenInfo } from "@/wormhole/types";

interface TokenSelectorProps {
  chainId?: string;
  selectedToken?: string;
  onSelect: (token: TokenInfo) => void;
}

export function TokenSelector({ chainId, selectedToken, onSelect }: TokenSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [availableTokens, setAvailableTokens] = useState<TokenInfo[]>([]);

  useEffect(() => {
    if (chainId && networkConfig.supportedTokens[chainId]) {
      setAvailableTokens(networkConfig.supportedTokens[chainId]);
    } else {
      setAvailableTokens([]);
    }
  }, [chainId]);

  const filteredTokens = searchQuery
    ? availableTokens.filter(
        token => 
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : availableTokens;

  const renderTokenIcon = (symbol: string) => {
    switch (symbol.toLowerCase()) {
      case "usdc":
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <span className="text-xs font-bold">$</span>
          </div>
        );
      case "sol":
      case "wsol":
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-blue-400 to-teal-300 flex items-center justify-center">
            <span className="text-xs font-bold">S</span>
          </div>
        );
      case "pyth":
        return (
          <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center">
            <span className="text-xs font-bold">P</span>
          </div>
        );
      case "crwny":
        return (
          <div className="w-8 h-8 rounded-full bg-purple-800 flex items-center justify-center">
            <span className="text-xs font-bold">C</span>
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

  return (
    <Card className="bg-darker border-border">
      <CardContent className="p-4 space-y-4">
        <h3 className="text-xl font-semibold">Select a token</h3>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10 bg-dark border-border"
            placeholder="Search for a token"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {chainId && (
          <div className="space-y-2">
            <h4 className="text-md text-muted-foreground">
              Tokens on {networkConfig.chains.find(c => c.id === chainId)?.name || chainId}
            </h4>
            
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {filteredTokens.map((token) => (
                <Button
                  key={token.symbol}
                  variant="ghost"
                  className={`flex justify-between items-center w-full p-3 hover:bg-dark ${
                    selectedToken === token.symbol ? "bg-dark" : ""
                  }`}
                  onClick={() => onSelect(token)}
                >
                  <div className="flex items-center gap-3">
                    {renderTokenIcon(token.symbol)}
                    <div className="flex flex-col items-start">
                      <span className="font-bold">{token.symbol}</span>
                      <span className="text-xs text-muted-foreground">
                        {token.address ? 
                          `${token.address.substring(0, 4)}...${token.address.substring(token.address.length - 4)}` : 
                          token.name}
                      </span>
                    </div>
                  </div>
                </Button>
              ))}
              
              {filteredTokens.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No tokens found for this search
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
