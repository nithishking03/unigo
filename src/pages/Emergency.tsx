import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Ambulance, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { LocationInput } from "@/components/LocationInput";
import { useToast } from "@/components/ui/use-toast";

const Emergency = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  const handleEmergencyRequest = async () => {
    if (!location) {
      toast({
        title: "Location Required",
        description: "Please enter your location for the ambulance service",
        variant: "destructive",
      });
      return;
    }

    setIsRequesting(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Emergency Request Sent",
        description: "An ambulance has been dispatched to your location. Stay calm and follow the instructions provided.",
      });
      setIsRequesting(false);
    }, 1500);
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
          <h1 className="text-3xl font-bold text-gray-900">Emergency Services</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-red-50 border-red-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Ambulance className="h-6 w-6" />
                Request Ambulance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <LocationInput
                placeholder="Enter your current location"
                value={location}
                onChange={setLocation}
              />
              <Button 
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={handleEmergencyRequest}
                disabled={isRequesting}
              >
                {isRequesting ? "Requesting..." : "Request Emergency Ambulance"}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Phone className="h-6 w-6 text-red-600" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="font-semibold text-xl text-red-600">102</p>
                    <p className="text-gray-600">Ambulance Emergency</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="font-semibold text-xl text-red-600">108</p>
                    <p className="text-gray-600">Medical Emergency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Clock className="h-6 w-6 text-red-600" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our emergency response team typically arrives within <span className="font-semibold text-red-600">10-15 minutes</span> of your request. Stay calm and follow the instructions provided by our team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Emergency;