
import { useState, useEffect } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, ChevronDown, Send } from "lucide-react";
import { NetworkSelector } from "@/components/swap/NetworkSelector";
import { TokenSelector } from "@/components/swap/TokenSelector";
import { ChainInfo, TokenInfo, SwapParams } from "@/wormhole/types";
import { initiateCCTPTransfer } from "@/wormhole/cctpTransfer";
import { networkConfig } from "@/wormhole/config";

export function SwapCard() {
  const { wallet, isConnected, openModal, getBalance } = useWallet();
  const { toast } = useToast();
  
  const [fromAmount, setFromAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [estimatedGas, setEstimatedGas] = useState("0.00");
  
  // Network selection state
  const [fromNetwork, setFromNetwork] = useState<string | undefined>("solana");
  const [toNetwork, setToNetwork] = useState<string | undefined>("ethereum");
  
  // Token selection state
  const [fromToken, setFromToken] = useState<string | undefined>("USDC");
  const [toToken, setToToken] = useState<string | undefined>("USDC");
  
  // Selection modals state
  const [showFromNetworkSelector, setShowFromNetworkSelector] = useState(false);
  const [showToNetworkSelector, setShowToNetworkSelector] = useState(false);
  const [showFromTokenSelector, setShowFromTokenSelector] = useState(false);
  const [showToTokenSelector, setShowToTokenSelector] = useState(false);
  
  // Transfer state
  const [isTransferReady, setIsTransferReady] = useState(false);
  
  useEffect(() => {
    // When network changes, reset token selection if token not available
    if (fromNetwork) {
      const availableTokens = networkConfig.supportedTokens[fromNetwork];
      if (!availableTokens.some(t => t.symbol === fromToken)) {
        // Default to first available token (usually USDC)
        setFromToken(availableTokens[0]?.symbol);
      }
    }
    
    if (toNetwork) {
      const availableTokens = networkConfig.supportedTokens[toNetwork];
      if (!availableTokens.some(t => t.symbol === toToken)) {
        // Default to first available token (usually USDC)
        setToToken(availableTokens[0]?.symbol);
      }
    }
  }, [fromNetwork, toNetwork, fromToken, toToken]);
  
  // Check if transfer is ready when wallet connects and form is valid
  useEffect(() => {
    if (isConnected && fromAmount && parseFloat(fromAmount) > 0 && fromNetwork && toNetwork && fromToken && toToken) {
      setIsTransferReady(true);
    } else {
      setIsTransferReady(false);
    }
  }, [isConnected, fromAmount, fromNetwork, toNetwork, fromToken, toToken]);
  
  const handleSwapNetworks = () => {
    const tempNetwork = fromNetwork;
    const tempToken = fromToken;
    
    setFromNetwork(toNetwork);
    setToNetwork(tempNetwork);
    setFromToken(toToken);
    setToToken(tempToken);
  };
  
  const calculateToAmount = () => {
    if (!fromAmount || !fromToken || !toToken) return "";
    
    // Mock exchange rates (in real app, this would come from an API)
    const rate = 0.99; // Almost 1:1 for USDC to USDC minus fees
    const result = parseFloat(fromAmount) * rate;
    return result.toFixed(result < 0.1 ? 6 : 2);
  };
  
  const handleTransfer = async () => {
    if (!isConnected) {
      openModal();
      return;
    }
    
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to transfer.",
        variant: "destructive"
      });
      return;
    }
    
    if (!fromNetwork || !toNetwork || !fromToken || !toToken) {
      toast({
        title: "Invalid selection",
        description: "Please select networks and tokens for the transfer.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSwapping(true);
    
    // Create swap parameters
    const swapParams: SwapParams = {
      sourceChain: fromNetwork,
      targetChain: toNetwork,
      sourceToken: fromToken,
      targetToken: toToken,
      amount: fromAmount
    };
    
    try {
      // Simulate CCTP transfer
      const txHash = await initiateCCTPTransfer(swapParams);
      
      toast({
        title: "Transfer Initiated",
        description: `Cross-chain transfer initiated. Hash: ${txHash.substring(0, 10)}...`,
      });
      
      // Reset form
      setFromAmount("");
      setIsTransferReady(false);
    } catch (error) {
      console.error("Transfer failed:", error);
      toast({
        title: "Transfer Failed",
        description: "There was an error processing your transfer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSwapping(false);
    }
  };
  
  const renderSelectedNetwork = (chainId?: string) => {
    if (!chainId) return null;
    
    const chain = networkConfig.chains.find(c => c.id === chainId);
    if (!chain) return null;
    
    return (
      <div className="flex items-center gap-2">
        {renderNetworkIcon(chain.icon)}
        <span>{chain.name}</span>
      </div>
    );
  };
  
  const renderSelectedToken = (chainId?: string, symbol?: string) => {
    if (!chainId || !symbol) return null;
    
    const availableTokens = networkConfig.supportedTokens[chainId];
    const token = availableTokens?.find(t => t.symbol === symbol);
    if (!token) return null;
    
    return (
      <div className="flex items-center gap-2">
        {renderTokenIcon(token.symbol)}
        <span className="font-bold">{token.symbol}</span>
      </div>
    );
  };
  
  const renderNetworkIcon = (icon: string) => {
    switch (icon) {
      case "solana":
        return (
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 via-blue-400 to-teal-300 flex items-center justify-center">
            <span className="text-xs font-bold">S</span>
          </div>
        );
      case "ethereum":
        return (
          <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center">
            <span className="text-xs font-bold">Ξ</span>
          </div>
        );
      case "base":
        return (
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-xs font-bold">B</span>
          </div>
        );
      case "bsc":
        return (
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-xs font-bold">BSC</span>
          </div>
        );
      case "near":
        return (
          <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
            <span className="text-xs font-bold text-white">N</span>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-xs font-bold">?</span>
          </div>
        );
    }
  };
  
  const renderTokenIcon = (symbol: string) => {
    switch (symbol.toLowerCase()) {
      case "usdc":
        return (
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <span className="text-xs font-bold">$</span>
          </div>
        );
      case "sol":
      case "wsol":
        return (
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 via-blue-400 to-teal-300 flex items-center justify-center">
            <span className="text-xs font-bold">S</span>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-xs font-bold">?</span>
          </div>
        );
    }
  };
  
  return (
    <Card className="bg-darker border-border max-w-lg w-full">
      <CardHeader>
        <CardTitle className="text-white">Swap Crypto</CardTitle>
        <CardDescription>Cross-chain transfer with Wormhole CCTP</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* FROM SECTION */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">From</span>
            {isConnected && fromToken && (
              <span className="text-muted-foreground">
                Balance: {getBalance(fromToken)} {fromToken}
              </span>
            )}
          </div>
          
          {showFromNetworkSelector ? (
            <NetworkSelector
              selectedChain={fromNetwork}
              onSelect={(chain) => {
                setFromNetwork(chain.id);
                setShowFromNetworkSelector(false);
              }}
              position="from"
            />
          ) : showFromTokenSelector ? (
            <TokenSelector
              chainId={fromNetwork}
              selectedToken={fromToken}
              onSelect={(token) => {
                setFromToken(token.symbol);
                setShowFromTokenSelector(false);
              }}
            />
          ) : (
            <div className="grid grid-cols-5 gap-3">
              <Button
                variant="outline"
                className="col-span-2 flex justify-between items-center bg-dark"
                onClick={() => setShowFromNetworkSelector(true)}
              >
                {renderSelectedNetwork(fromNetwork)}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
              
              <Button
                variant="outline"
                className="col-span-1 flex justify-between items-center bg-dark"
                onClick={() => setShowFromTokenSelector(true)}
              >
                {renderSelectedToken(fromNetwork, fromToken)}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
              
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="bg-dark border-border h-full"
                />
              </div>
            </div>
          )}
          
          {isConnected && fromToken && fromNetwork && !showFromNetworkSelector && !showFromTokenSelector && (
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-auto p-0 text-green-primary hover:text-green-primary hover:bg-transparent" 
                onClick={() => {
                  const balance = getBalance(fromToken);
                  setFromAmount(balance);
                }}
              >
                Max
              </Button>
            </div>
          )}
        </div>
        
        {/* SWAP BUTTON */}
        <div className="flex justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-10 w-10 bg-dark border border-border hover:bg-dark hover:text-green-primary"
            onClick={handleSwapNetworks}
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>
        
        {/* TO SECTION */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">To</span>
          </div>
          
          {showToNetworkSelector ? (
            <NetworkSelector
              selectedChain={toNetwork}
              onSelect={(chain) => {
                setToNetwork(chain.id);
                setShowToNetworkSelector(false);
              }}
              position="to"
            />
          ) : showToTokenSelector ? (
            <TokenSelector
              chainId={toNetwork}
              selectedToken={toToken}
              onSelect={(token) => {
                setToToken(token.symbol);
                setShowToTokenSelector(false);
              }}
            />
          ) : (
            <div className="grid grid-cols-5 gap-3">
              <Button
                variant="outline"
                className="col-span-2 flex justify-between items-center bg-dark"
                onClick={() => setShowToNetworkSelector(true)}
              >
                {renderSelectedNetwork(toNetwork)}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
              
              <Button
                variant="outline"
                className="col-span-1 flex justify-between items-center bg-dark"
                onClick={() => setShowToTokenSelector(true)}
              >
                {renderSelectedToken(toNetwork, toToken)}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
              
              <div className="col-span-2">
                <Input
                  type="text"
                  placeholder="0.00"
                  value={calculateToAmount()}
                  readOnly
                  className="bg-dark border-border h-full"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* SWAP INFO */}
        <div className="bg-dark p-4 rounded-lg border border-border">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Exchange Rate</span>
            <span className="text-white">
              1 {fromToken} = 0.99 {toToken}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Network Fee</span>
            <span className="text-white">$1.50</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="text-muted-foreground">You will receive approximately</span>
            <span className="text-white font-medium">{calculateToAmount()} {toToken}</span>
          </div>
        </div>
        
        {/* Transfer ACTION */}
        {!isConnected ? (
          <Button 
            className="w-full" 
            onClick={openModal}
          >
            Connect Wallet
          </Button>
        ) : (
          <Button 
            className="w-full flex items-center justify-center gap-2" 
            onClick={handleTransfer}
            disabled={!isTransferReady || isSwapping}
          >
            <Send className="h-4 w-4" />
            {isSwapping ? "Processing..." : "Transfer Now"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
