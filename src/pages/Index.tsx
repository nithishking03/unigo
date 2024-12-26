import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ServiceGrid } from "@/components/ServiceGrid";
import { NavBar } from "@/components/NavBar";

const Index = () => {
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Hero />
      
      <main className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Our Services</h2>
          <ServiceGrid />
        </div>
      </main>
    </div>
  );
};

export default Index;