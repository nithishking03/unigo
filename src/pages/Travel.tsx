import { NavBar } from "@/components/NavBar";
import { Plane } from "lucide-react";

const Travel = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center max-w-2xl mx-auto">
          <Plane className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-3xl font-bold mb-4">Travel Services</h1>
          <p className="text-gray-600 mb-8">
            Plan your trips with comfortable rides for long-distance travel.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Travel;