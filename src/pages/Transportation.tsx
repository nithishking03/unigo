import { NavBar } from "@/components/NavBar";
import { Car, Bike, Truck } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";

const Transportation = () => {
  const vehicles = [
    {
      title: "Car Ride",
      description: "Comfortable car rides for up to 4 passengers",
      icon: Car,
      to: "#",
    },
    {
      title: "Bike Ride",
      description: "Quick and affordable bike rides for one passenger",
      icon: Bike,
      to: "#",
    },
    {
      title: "Auto Ride",
      description: "Traditional auto rides for up to 3 passengers",
      icon: Truck,
      to: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Transportation Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <ServiceCard key={vehicle.title} {...vehicle} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Transportation;