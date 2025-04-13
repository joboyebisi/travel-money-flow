
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function DashboardHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-6 border-b border-border">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      
      <Button variant="outline" className="flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        <span>Connect Wallet</span>
      </Button>
    </div>
  );
}
