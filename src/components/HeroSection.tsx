
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function HeroSection() {
  return (
    <div className="hero-gradient min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-full bg-green-primary flex items-center justify-center">
              <span className="text-dark font-bold text-xl">TM</span>
            </div>
            <span className="text-white text-2xl font-bold">Travel Money</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-white">Travel with </span>
            <span className="text-green-primary">USDC</span>
            <span className="text-white"> anywhere</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Securely deposit, swap and withdraw USDC for your travels. Access your funds anywhere in the world through MoneyGram.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="group">
              <Link to="/dashboard" className="flex items-center">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <a href="https://t.me/travelmoney_bot" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                Talk to Telegram Bot
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
