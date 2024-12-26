import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            ServiceHub
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/transportation" className="text-gray-600 hover:text-primary transition-colors">
              Transportation
            </Link>
            <Link to="/food-delivery" className="text-gray-600 hover:text-primary transition-colors">
              Food Delivery
            </Link>
            <Link to="/parcel-delivery" className="text-gray-600 hover:text-primary transition-colors">
              Parcel
            </Link>
            <Link to="/travel" className="text-gray-600 hover:text-primary transition-colors">
              Travel
            </Link>
            <Button variant="default">Login</Button>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};