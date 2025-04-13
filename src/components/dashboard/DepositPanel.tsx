
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DepositPanel() {
  const [amount, setAmount] = useState("");
  const [depositTab, setDepositTab] = useState("crypto");
  const { toast } = useToast();
  
  const walletAddress = "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t";
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address copied!",
      description: "Wallet address copied to clipboard",
    });
  };
  
  return (
    <Card className="bg-darker border-border">
      <CardHeader>
        <CardTitle className="text-white">Deposit USDC</CardTitle>
        <CardDescription>Add funds to your Travel Money wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crypto" onValueChange={setDepositTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="crypto">Crypto Deposit</TabsTrigger>
            <TabsTrigger value="fiat">Fiat Deposit</TabsTrigger>
          </TabsList>
          
          <TabsContent value="crypto" className="space-y-6">
            <div className="p-4 bg-dark rounded-lg border border-border space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="wallet-address">Your Deposit Address (USDC)</Label>
                <div className="flex">
                  <Input 
                    id="wallet-address" 
                    value={walletAddress} 
                    readOnly 
                    className="rounded-r-none border-r-0 bg-transparent"
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-l-none border-l-0"
                    onClick={handleCopyAddress}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Only send USDC to this address. Other tokens may be lost.
                </p>
              </div>
              
              <div className="h-40 border border-dashed border-border rounded-md flex items-center justify-center">
                <div className="text-center">
                  <div className="p-3 bg-dark inline-block rounded-md mb-2">QR</div>
                  <div className="text-sm text-muted-foreground">
                    Scan QR code to copy address
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-500/10 text-yellow-500 p-3 rounded-md text-sm">
                Important: Make sure to send only USDC tokens on the Ethereum network to this address.
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fiat" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deposit-amount">Amount (USD)</Label>
                <div className="relative">
                  <Input
                    id="deposit-amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-7 bg-transparent"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-border rounded-md p-3 cursor-pointer hover:border-green-primary/50 transition-colors">
                    <div className="text-white font-medium mb-1">Credit Card</div>
                    <div className="text-sm text-muted-foreground">Instant deposit</div>
                  </div>
                  <div className="border border-border rounded-md p-3 cursor-pointer hover:border-green-primary/50 transition-colors">
                    <div className="text-white font-medium mb-1">Bank Transfer</div>
                    <div className="text-sm text-muted-foreground">1-3 business days</div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                Continue to Payment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="text-sm text-muted-foreground text-center">
                By proceeding, you agree to our <a href="#" className="text-green-primary hover:underline">Terms of Service</a>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-sm">
            <div className="text-muted-foreground mb-2">Need help with your deposit?</div>
            <a href="#" className="text-green-primary hover:underline flex items-center">
              View Deposit Instructions
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
