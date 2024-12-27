import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bike, Car, Calendar, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { LocationInput } from "@/components/LocationInput";
import { DatePicker } from "@/components/DatePicker";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { differenceInDays } from "date-fns";
import { Tables } from "@/integrations/supabase/types";

type VehicleType = "car" | "bike";

interface VehicleOption {
  name: string;
  price: number;
}

interface VehicleCategory {
  type: VehicleType;
  icon: any;
  options: VehicleOption[];
}

const Travel = () => {
  const { toast } = useToast();
  const { session } = useAuth();
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isBooking, setIsBooking] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<{
    type: VehicleType;
    model: string;
    price: number;
  } | null>(null);

  const vehicles: VehicleCategory[] = [
    {
      type: "bike",
      icon: Bike,
      options: [
        { name: "Honda Activa", price: 499 },
        { name: "Royal Enfield", price: 999 },
        { name: "TVS Jupiter", price: 449 },
      ],
    },
    {
      type: "car",
      icon: Car,
      options: [
        { name: "Swift Dzire", price: 1999 },
        { name: "Hyundai i20", price: 1799 },
        { name: "Toyota Innova", price: 2999 },
      ],
    },
  ];

  const handleBooking = async (vehicleType: VehicleType, model: string, pricePerDay: number) => {
    if (!location || !startDate || !endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }

    if (!session?.user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book a vehicle",
        variant: "destructive",
      });
      return;
    }

    const days = differenceInDays(endDate, startDate) + 1;
    if (days < 1) {
      toast({
        title: "Invalid Dates",
        description: "End date must be after start date",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    setSelectedVehicle({ type: vehicleType, model, price: pricePerDay });

    try {
      const rental: Omit<Tables<'vehicle_rentals'>, 'id' | 'created_at' | 'updated_at'> = {
        user_id: session.user.id,
        vehicle_type: vehicleType,
        vehicle_model: model,
        pickup_location: location,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        total_amount: pricePerDay * days,
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('vehicle_rentals')
        .insert(rental)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Booking Successful!",
        description: `Your ${model} has been booked from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
      });

      // Reset form
      setLocation("");
      setStartDate(undefined);
      setEndDate(undefined);
      setSelectedVehicle(null);
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Rent Vehicles</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Pick-up Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LocationInput
                placeholder="Enter pick-up location"
                value={location}
                onChange={setLocation}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Rental Period
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <DatePicker
                placeholder="Start Date"
                date={startDate}
                onDateChange={setStartDate}
              />
              <DatePicker
                placeholder="End Date"
                date={endDate}
                onDateChange={setEndDate}
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.type} className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <vehicle.icon className="h-6 w-6 text-primary" />
                  {vehicle.type} Options
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {vehicle.options.map((option) => (
                    <div
                      key={option.name}
                      className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/20 hover:bg-primary/5 transition-colors"
                    >
                      <div>
                        <h3 className="font-semibold">{option.name}</h3>
                        <p className="text-sm text-gray-500">Available Now</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">₹{option.price}/day</p>
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => handleBooking(vehicle.type, option.name, option.price)}
                          disabled={isBooking && selectedVehicle?.model === option.name}
                        >
                          {isBooking && selectedVehicle?.model === option.name ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Booking...
                            </>
                          ) : (
                            'Book Now'
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Travel;