
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

export function WithdrawPanel() {
  const [amount, setAmount] = useState("");
  const [country, setCountry] = useState("");
  
  return (
    <Card className="bg-darker border-border">
      <CardHeader>
        <CardTitle className="text-white">Withdraw via MoneyGram</CardTitle>
        <CardDescription>Convert your USDC to cash at MoneyGram locations worldwide</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Amount (USDC)</Label>
            <div className="relative">
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-auto py-1" onClick={() => setAmount("1000")}>
                  1000
                </Button>
                <Button variant="ghost" size="sm" className="h-auto py-1" onClick={() => setAmount("5000")}>
                  5000
                </Button>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Min: 50 USDC</span>
              <span className="text-muted-foreground">Max: 10,000 USDC</span>
            </div>
          </div>
          
          <div className="p-4 bg-dark rounded-lg border border-border flex justify-between">
            <div>
              <div className="text-sm text-muted-foreground">You'll receive approximately</div>
              <div className="text-xl font-bold text-white">$980.00 USD</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Fee</div>
              <div className="text-white">$20.00 (2%)</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country" className="bg-transparent">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mexico">Mexico</SelectItem>
                <SelectItem value="colombia">Colombia</SelectItem>
                <SelectItem value="brazil">Brazil</SelectItem>
                <SelectItem value="philippines">Philippines</SelectItem>
                <SelectItem value="indonesia">Indonesia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Enter city name" className="bg-transparent" />
          </div>
        </div>
        
        <div className="bg-green-primary/10 border border-green-primary/20 rounded-lg p-4">
          <div className="text-white font-medium mb-2">How it works:</div>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>Enter withdrawal amount and location details</li>
            <li>Receive a reference number</li>
            <li>Visit any MoneyGram location with your ID</li>
            <li>Show reference number and collect cash</li>
          </ol>
        </div>
        
        <Button className="w-full">
          Continue to Withdrawal
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
