
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export function BalanceCard() {
  return (
    <Card className="bg-darker border-border">
      <CardHeader>
        <CardTitle className="text-white">Your Balance</CardTitle>
        <CardDescription>Real-time balance of your wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <div className="text-muted-foreground mb-2">Total Balance</div>
            <div className="text-3xl font-bold text-white">5,240.00 USDC</div>
            <div className="text-muted-foreground">≈ $5,240.00 USD</div>
          </div>
          
          <div className="bg-dark rounded-lg p-4 border border-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">USD Coin (USDC)</span>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-blue-500 mr-2 flex items-center justify-center text-xs font-bold text-white">U</div>
                <span className="text-white">USDC</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">5,240.00</div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">≈ $5,240.00</span>
              <Button variant="ghost" size="sm" className="text-green-primary p-0 h-auto hover:bg-transparent hover:text-green-secondary">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>View</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
