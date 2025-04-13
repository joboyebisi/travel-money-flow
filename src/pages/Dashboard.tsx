
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { DepositPanel } from "@/components/dashboard/DepositPanel";
import { WithdrawPanel } from "@/components/dashboard/WithdrawPanel";

export function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab");
  
  useEffect(() => {
    // Make sure the tab is valid, otherwise redirect to the main dashboard
    if (tab && !["deposit", "withdraw", "history"].includes(tab)) {
      navigate("/dashboard");
    }
  }, [tab, navigate]);
  
  const renderContent = () => {
    switch (tab) {
      case "deposit":
        return (
          <>
            <DashboardHeader title="Deposit USDC" />
            <div className="p-6">
              <DepositPanel />
            </div>
          </>
        );
      case "withdraw":
        return (
          <>
            <DashboardHeader title="Withdraw via MoneyGram" />
            <div className="p-6">
              <WithdrawPanel />
            </div>
          </>
        );
      case "history":
        return (
          <>
            <DashboardHeader title="Transaction History" />
            <div className="p-6">
              <ActivityCard />
            </div>
          </>
        );
      default:
        return (
          <>
            <DashboardHeader title="Dashboard" />
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BalanceCard />
                <ActivityCard />
              </div>
            </div>
          </>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-dark flex flex-col md:flex-row">
      <DashboardNav />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
