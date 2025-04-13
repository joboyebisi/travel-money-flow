
import { ArrowDownToLine, ArrowUpToLine, Repeat } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <ArrowDownToLine className="h-12 w-12 text-green-primary" />,
      title: "Deposit USDC",
      description: "Securely deposit USD Coin (USDC) into your digital wallet before or during your travels."
    },
    {
      icon: <Repeat className="h-12 w-12 text-green-primary" />,
      title: "Swap Currencies",
      description: "Exchange your USDC for other cryptocurrencies with competitive rates and low fees."
    },
    {
      icon: <ArrowUpToLine className="h-12 w-12 text-green-primary" />,
      title: "Withdraw Cash",
      description: "Withdraw your USDC to cash using MoneyGram integration at thousands of locations worldwide."
    }
  ];

  return (
    <section className="py-20 bg-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Why Choose </span>
            <span className="text-green-primary">Travel Money</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access your digital assets anywhere in the world with our secure and convenient platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-gradient p-8 rounded-xl border border-border hover:border-green-primary/30 transition-colors"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
