
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp } from "lucide-react";

export function SwapCard() {
  const [fromAmount, setFromAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("usdc");
  const [toCurrency, setToCurrency] = useState("eth");
  
  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };
  
  const calculateToAmount = () => {
    if (!fromAmount) return "";
    
    // Mock exchange rates (in real app, this would come from an API)
    const rates = {
      usdc: {
        eth: 0.00041,
        btc: 0.000016,
        sol: 0.0625
      },
      eth: {
        usdc: 2440,
        btc: 0.039,
        sol: 152.5
      },
      btc: {
        usdc: 62500,
        eth: 25.64,
        sol: 3906.25
      },
      sol: {
        usdc: 16,
        eth: 0.0066,
        btc: 0.00026
      }
    };
    
    // @ts-ignore
    const rate = rates[fromCurrency][toCurrency] || 0;
    const result = parseFloat(fromAmount) * rate;
    return result.toFixed(result < 0.1 ? 6 : 2);
  };
  
  return (
    <Card className="bg-darker border-border max-w-lg w-full">
      <CardHeader>
        <CardTitle className="text-white">Swap Crypto</CardTitle>
        <CardDescription>Exchange your crypto at competitive rates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>From</Label>
            <div className="flex gap-3">
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-[180px] bg-transparent">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usdc">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-500 mr-2"></div>
                      USDC
                    </div>
                  </SelectItem>
                  <SelectItem value="eth">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-500 mr-2"></div>
                      ETH
                    </div>
                  </SelectItem>
                  <SelectItem value="btc">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 mr-2"></div>
                      BTC
                    </div>
                  </SelectItem>
                  <SelectItem value="sol">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-teal-500 mr-2"></div>
                      SOL
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="flex-1 bg-transparent"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Balance: {fromCurrency === "usdc" ? "5,240.00" : fromCurrency === "eth" ? "2.15" : fromCurrency === "btc" ? "0.084" : "325"} {fromCurrency.toUpperCase()}
              </span>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-green-primary hover:text-green-primary hover:bg-transparent" onClick={() => {
                setFromAmount(fromCurrency === "usdc" ? "5240" : fromCurrency === "eth" ? "2.15" : fromCurrency === "btc" ? "0.084" : "325");
              }}>
                Max
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-10 w-10 bg-dark border border-border hover:bg-dark hover:text-green-primary"
              onClick={handleSwapCurrencies}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label>To</Label>
            <div className="flex gap-3">
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-[180px] bg-transparent">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usdc">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-500 mr-2"></div>
                      USDC
                    </div>
                  </SelectItem>
                  <SelectItem value="eth">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-500 mr-2"></div>
                      ETH
                    </div>
                  </SelectItem>
                  <SelectItem value="btc">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 mr-2"></div>
                      BTC
                    </div>
                  </SelectItem>
                  <SelectItem value="sol">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-teal-500 mr-2"></div>
                      SOL
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="0.00"
                value={calculateToAmount()}
                readOnly
                className="flex-1 bg-transparent"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-dark p-4 rounded-lg border border-border">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Exchange Rate</span>
            <span className="text-white">
              1 {fromCurrency.toUpperCase()} = {
                fromCurrency === "usdc" && toCurrency === "eth" ? "0.00041" :
                fromCurrency === "usdc" && toCurrency === "btc" ? "0.000016" :
                fromCurrency === "usdc" && toCurrency === "sol" ? "0.0625" :
                fromCurrency === "eth" && toCurrency === "usdc" ? "2,440.00" :
                fromCurrency === "eth" && toCurrency === "btc" ? "0.039" :
                fromCurrency === "eth" && toCurrency === "sol" ? "152.50" :
                fromCurrency === "btc" && toCurrency === "usdc" ? "62,500.00" :
                fromCurrency === "btc" && toCurrency === "eth" ? "25.64" :
                fromCurrency === "btc" && toCurrency === "sol" ? "3,906.25" :
                fromCurrency === "sol" && toCurrency === "usdc" ? "16.00" :
                fromCurrency === "sol" && toCurrency === "eth" ? "0.0066" :
                fromCurrency === "sol" && toCurrency === "btc" ? "0.00026" :
                "0"
              } {toCurrency.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Fee</span>
            <span className="text-white">0.5%</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="text-muted-foreground">You will receive approximately</span>
            <span className="text-white font-medium">{calculateToAmount()} {toCurrency.toUpperCase()}</span>
          </div>
        </div>
        
        <Button className="w-full">Swap Now</Button>
      </CardContent>
    </Card>
  );
}
