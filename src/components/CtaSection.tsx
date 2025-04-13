
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.1),transparent_60%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Ready to travel with </span>
            <span className="text-green-primary">crypto confidence?</span>
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8">
            Start using Travel Money today and experience the freedom of accessing your funds anywhere in the world.
          </p>
          
          <Button size="lg" asChild className="group">
            <Link to="/dashboard" className="flex items-center">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
