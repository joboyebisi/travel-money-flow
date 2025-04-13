
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, ArrowUpToLine, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActivityCard() {
  const activities = [
    {
      type: "deposit",
      amount: "+1,000.00 USDC",
      date: "Apr 12, 2025",
      status: "completed"
    },
    {
      type: "withdraw",
      amount: "-500.00 USDC",
      date: "Apr 10, 2025",
      status: "completed"
    },
    {
      type: "swap",
      amount: "250.00 USDC → 0.12 ETH",
      date: "Apr 5, 2025",
      status: "completed"
    },
    {
      type: "deposit",
      amount: "+3,000.00 USDC",
      date: "Mar 28, 2025",
      status: "completed"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownToLine className="h-4 w-4 text-green-primary" />;
      case "withdraw":
        return <ArrowUpToLine className="h-4 w-4 text-red-500" />;
      case "swap":
        return <Repeat className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTitle = (type: string) => {
    switch (type) {
      case "deposit":
        return "Deposit";
      case "withdraw":
        return "Withdrawal";
      case "swap":
        return "Swap";
      default:
        return type;
    }
  };

  return (
    <Card className="bg-darker border-border">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
        <CardDescription>Your recent transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 rounded-lg bg-dark border border-border hover:border-green-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-dark flex items-center justify-center border border-border">
                  {getIcon(activity.type)}
                </div>
                <div>
                  <div className="font-medium text-white">{getTitle(activity.type)}</div>
                  <div className="text-sm text-muted-foreground">{activity.date}</div>
                </div>
              </div>
              <div 
                className={cn(
                  "font-medium",
                  activity.type === "deposit" ? "text-green-primary" : 
                  activity.type === "withdraw" ? "text-red-500" : 
                  "text-white"
                )}
              >
                {activity.amount}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
