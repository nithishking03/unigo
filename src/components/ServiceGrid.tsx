import { Car, UtensilsCrossed, Package, Plane } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

export const ServiceGrid = () => {
  const services = [
    {
      title: "Transportation",
      description: "Book bikes, cars, and autos for your daily commute",
      icon: Car,
      to: "/transportation",
    },
    {
      title: "Food Delivery",
      description: "Order from your favorite restaurants",
      icon: UtensilsCrossed,
      to: "/food-delivery",
    },
    {
      title: "Parcel Delivery",
      description: "Send packages quickly and securely",
      icon: Package,
      to: "/parcel-delivery",
    },
    {
      title: "Travel",
      description: "Plan your trips with comfortable rides",
      icon: Plane,
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