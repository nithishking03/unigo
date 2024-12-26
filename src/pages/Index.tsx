import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ServiceGrid } from "@/components/ServiceGrid";
import { NavBar } from "@/components/NavBar";
import { LocationInput } from "@/components/LocationInput";

const Index = () => {
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Hero />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto mb-12">
          <LocationInput
            value={location}
            onChange={setLocation}
            placeholder="Enter your location to get started"
          />
        </div>
        
        <ServiceGrid />
      </main>
    </div>
  );
};

export default Index;