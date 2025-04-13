
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SwapCard } from "@/components/swap/SwapCard";

export function Swap() {
  return (
    <div className="min-h-screen bg-dark flex flex-col md:flex-row">
      <DashboardNav />
      <div className="flex-1 overflow-auto">
        <DashboardHeader title="Swap Crypto" />
        <div className="p-6 flex justify-center">
          <SwapCard />
        </div>
      </div>
    </div>
  );
}

export default Swap;
