import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LocationInput } from "./LocationInput";

export const Hero = () => {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: string; lon: string } | undefined>();

  const handleLocationChange = (value: string, coords?: { lat: string; lon: string }) => {
    setLocation(value);
    setCoordinates(coords);
  };

  return (
    <div className="relative bg-gradient-to-br from-[#9b87f5] to-[#8B5CF6] text-white py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Your Daily Services,
            <br />
            One App
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in">
            Food delivery, rides, parcels, and rentals - all in one place.
            Experience the convenience of UniGo.
          </p>
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg p-4 animate-fade-in">
            <LocationInput 
              placeholder="Enter your delivery location"
              value={location}
              onChange={handleLocationChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};