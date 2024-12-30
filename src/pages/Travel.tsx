import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bike, Car, Calendar, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { DatePicker } from "@/components/DatePicker";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { differenceInDays, isBefore, isToday } from "date-fns";
import { RentalHistory } from "@/components/RentalHistory";
import { LocationSelector } from "@/components/travel/LocationSelector";

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

interface LocationDetails {
  fullAddress: string;
  streetNumber: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

const Travel = () => {
  const { toast } = useToast();
  const { session } = useAuth();
  const [location, setLocation] = useState("");
  const [locationDetails, setLocationDetails] = useState<LocationDetails | null>(null);
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

  const validateDates = (start: Date | undefined, end: Date | undefined): boolean => {
    if (!start || !end) {
      toast({
        title: "Missing Dates",
        description: "Please select both start and end dates",
        variant: "destructive",
      });
      return false;
    }

    if (isBefore(end, start)) {
      toast({
        title: "Invalid Dates",
        description: "End date must be after start date",
        variant: "destructive",
      });
      return false;
    }

    if (isBefore(start, new Date()) && !isToday(start)) {
      toast({
        title: "Invalid Start Date",
        description: "Start date cannot be in the past",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const calculateTotalPrice = (pricePerDay: number) => {
    if (!startDate || !endDate) return null;
    const days = differenceInDays(endDate, startDate) + 1;
    return days > 0 ? pricePerDay * days : null;
  };

  const handleBooking = async (vehicleType: VehicleType, model: string, pricePerDay: number) => {
    if (!locationDetails || !startDate || !endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }

    if (!validateDates(startDate, endDate)) {
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

    const totalAmount = calculateTotalPrice(pricePerDay);
    if (!totalAmount) {
      toast({
        title: "Invalid Dates",
        description: "Please select valid rental dates",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    setSelectedVehicle({ type: vehicleType, model, price: pricePerDay });

    try {
      const formattedLocation = `${locationDetails.streetNumber} ${locationDetails.street}, ${locationDetails.city}, ${locationDetails.state} ${locationDetails.postalCode}`;
      
      const { error } = await supabase
        .from('vehicle_rentals')
        .insert({
          user_id: session.user.id,
          vehicle_type: vehicleType,
          vehicle_model: model,
          pickup_location: formattedLocation,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          total_amount: totalAmount,
          status: 'pending',
          admin_email: 'your-email@example.com' // Replace this with your email
        });

      if (error) throw error;

      toast({
        title: "Booking Successful!",
        description: `Your ${model} has been booked from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
      });

      // Reset form
      setLocation("");
      setLocationDetails(null);
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
          <LocationSelector
            location={location}
            onLocationChange={setLocation}
            onDetailsSubmit={setLocationDetails}
          />

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
                  {vehicle.options.map((option) => {
                    const totalPrice = calculateTotalPrice(option.price);
                    return (
                      <div
                        key={option.name}
                        className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/20 hover:bg-primary/5 transition-colors"
                      >
                        <div>
                          <h3 className="font-semibold">{option.name}</h3>
                          <p className="text-sm text-gray-500">₹{option.price}/day</p>
                          {totalPrice && (
                            <p className="text-sm font-medium text-primary">
                              Total: ₹{totalPrice}
                            </p>
                          )}
                        </div>
                        <Button
                          size="sm"
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
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <RentalHistory />
        </div>
      </main>
    </div>
  );
};

export default Travel;
