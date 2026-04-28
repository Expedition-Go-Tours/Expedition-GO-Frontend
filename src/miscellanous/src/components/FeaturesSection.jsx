import { motion } from "framer-motion";
import { Headphones, Leaf, ShieldCheck, BadgeDollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Leaf,
    title: "Eco-Friendly Travel",
    description: "Carbon-conscious itineraries, vetted stays, and low-impact transport options.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Travel with confidence knowing our local team is always ready to help.",
  },
  {
    icon: ShieldCheck,
    title: "Best Price Guarantee",
    description: "Premium experiences at fair rates, with value matching on comparable trips.",
  },

  {
    icon: BadgeDollarSign,
    title: "Secure Payment",
    description: "Fully encrypted transactions via trusted gateways, ensuring total privacy",
  },
];

export function FeaturesSection() {
  return (
    <div className="relative z-10 mx-auto -mt-2 mb-8 grid max-w-full gap-4 px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 sm:px-6 lg:max-w-7xl lg:px-8">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <motion.div key={feature.title} whileHover={{ y: -4 }}>
            <Card>
              <CardContent className="flex gap-3 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-slate-950">{feature.title}</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
