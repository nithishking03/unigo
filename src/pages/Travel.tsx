import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bike, Car, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { LocationInput } from "@/components/LocationInput";
import { DatePicker } from "@/components/DatePicker";

const Travel = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const vehicles = [
    {
      type: "Bike",
      icon: Bike,
      options: [
        { name: "Honda Activa", price: "499/day" },
        { name: "Royal Enfield", price: "999/day" },
        { name: "TVS Jupiter", price: "449/day" },
      ],
    },
    {
      type: "Car",
      icon: Car,
      options: [
        { name: "Swift Dzire", price: "1999/day" },
        { name: "Hyundai i20", price: "1799/day" },
        { name: "Toyota Innova", price: "2999/day" },
      ],
    },
  ];

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
                      className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/20 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <div>
                        <h3 className="font-semibold">{option.name}</h3>
                        <p className="text-sm text-gray-500">Available Now</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">₹{option.price}</p>
                        <Button size="sm" className="mt-2">
                          Book Now
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