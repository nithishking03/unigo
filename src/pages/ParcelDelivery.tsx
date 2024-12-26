import { NavBar } from "@/components/NavBar";
import { Package } from "lucide-react";

const ParcelDelivery = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center max-w-2xl mx-auto">
          <Package className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-3xl font-bold mb-4">Parcel Delivery</h1>
          <p className="text-gray-600 mb-8">
            Send packages quickly and securely to any destination.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ParcelDelivery;