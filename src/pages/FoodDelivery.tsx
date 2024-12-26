import { NavBar } from "@/components/NavBar";
import { UtensilsCrossed } from "lucide-react";

const FoodDelivery = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center max-w-2xl mx-auto">
          <UtensilsCrossed className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-3xl font-bold mb-4">Food Delivery</h1>
          <p className="text-gray-600 mb-8">
            Order from your favorite restaurants and get food delivered to your doorstep.
          </p>
        </div>
      </main>
    </div>
  );
};

export default FoodDelivery;