import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const NavBar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            UniGo
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/transportation" className="text-gray-600 hover:text-primary transition-colors">
              Rides
            </Link>
            <Link to="/food-delivery" className="text-gray-600 hover:text-primary transition-colors">
              Food
            </Link>
            <Link to="/parcel-delivery" className="text-gray-600 hover:text-primary transition-colors">
              Parcel
            </Link>
            <Link to="/travel" className="text-gray-600 hover:text-primary transition-colors">
              Rentals
            </Link>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};