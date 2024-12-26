import { Bike, UtensilsCrossed, Package, Car } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

export const ServiceGrid = () => {
  const services = [
    {
      title: "Book Rides",
      description: "Quick and affordable rides with bikes, cars, and autos",
      icon: Bike,
      to: "/transportation",
    },
    {
      title: "Food Delivery",
      description: "Order from your favorite restaurants",
      icon: UtensilsCrossed,
      to: "/food-delivery",
    },
    {
      title: "Send Parcels",
      description: "Fast and secure parcel delivery services",
      icon: Package,
      to: "/parcel-delivery",
    },
    {
      title: "Rent Vehicles",
      description: "Rent bikes and cars for your needs",
      icon: Car,
      to: "/travel",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  );
};