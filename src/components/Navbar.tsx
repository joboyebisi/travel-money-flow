
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  return (
    <header className={cn(
      "w-full py-4",
      transparent ? "absolute top-0 left-0 z-10" : "bg-dark border-b border-border"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-green-primary flex items-center justify-center">
            <span className="text-dark font-bold">TM</span>
          </div>
          <span className="text-xl font-bold text-white">Travel Money</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white hover:text-green-primary transition-colors">Home</Link>
          <Link to="/dashboard" className="text-white hover:text-green-primary transition-colors">Dashboard</Link>
          <Link to="/swap" className="text-white hover:text-green-primary transition-colors">Swap</Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/dashboard" className="hidden md:flex">Connect Wallet</Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
