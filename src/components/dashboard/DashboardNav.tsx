
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ArrowDownToLine, 
  ArrowUpToLine, 
  History, 
  Home, 
  LayoutDashboard, 
  Repeat, 
  Wallet 
} from "lucide-react";

export function DashboardNav() {
  const location = useLocation();
  const { pathname, search } = location;
  
  const currentTab = search.includes('tab=withdraw') 
    ? 'withdraw' 
    : search.includes('tab=deposit') 
      ? 'deposit' 
      : 'dashboard';
  
  const isActive = (path: string, tab?: string) => {
    if (tab) {
      return pathname === path && search.includes(`tab=${tab}`);
    }
    return pathname === path && !search.includes('tab=');
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: "Deposit",
      path: "/dashboard?tab=deposit",
      icon: <ArrowDownToLine className="h-5 w-5" />
    },
    {
      name: "Swap",
      path: "/swap",
      icon: <Repeat className="h-5 w-5" />
    },
    {
      name: "Withdraw",
      path: "/dashboard?tab=withdraw",
      icon: <ArrowUpToLine className="h-5 w-5" />
    },
    {
      name: "History",
      path: "/dashboard?tab=history",
      icon: <History className="h-5 w-5" />
    }
  ];

  return (
    <div className="bg-darker border-r border-border w-full md:w-72 md:min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8 pl-2">
        <div className="h-8 w-8 rounded-full bg-green-primary flex items-center justify-center">
          <span className="text-dark font-bold">TM</span>
        </div>
        <span className="text-xl font-bold text-white">Travel Money</span>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  (item.path === "/dashboard" && isActive("/dashboard")) ||
                  (item.path === "/swap" && pathname === "/swap") ||
                  (item.path.includes("tab=") && search.includes(item.path.split("tab=")[1]))
                    ? "bg-green-primary/10 text-green-primary"
                    : "text-muted-foreground hover:text-white hover:bg-green-primary/5"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto pt-6 border-t border-border mt-8">
        <div className="card-gradient rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Wallet className="h-5 w-5 text-green-primary" />
            <span className="text-white font-medium">Wallet Balance</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">5,240.00 USDC</div>
          <div className="text-muted-foreground text-sm">≈ $5,240.00 USD</div>
        </div>
        
        <Link 
          to="/"
          className="flex items-center gap-3 mt-4 px-3 py-2 rounded-md text-muted-foreground hover:text-white hover:bg-green-primary/5 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
