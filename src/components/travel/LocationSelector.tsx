import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationInput } from "@/components/LocationInput";
import { MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LocationDetails {
  fullAddress: string;
  streetNumber: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

interface LocationSelectorProps {
  location: string;
  onLocationChange: (location: string) => void;
  onDetailsSubmit: (details: LocationDetails) => void;
}

export const LocationSelector = ({
  location,
  onLocationChange,
  onDetailsSubmit,
}: LocationSelectorProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState<LocationDetails>({
    fullAddress: "",
    streetNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const { toast } = useToast();

  const handleLocationSelect = (value: string, coordinates?: { lat: string; lon: string }) => {
    onLocationChange(value);
    setShowDetails(true);
    setDetails(prev => ({
      ...prev, 
      fullAddress: value,
      // Attempt to parse coordinates if available
      streetNumber: coordinates ? coordinates.lat : "",
      street: coordinates ? coordinates.lon : "",
    }));
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['streetNumber', 'street', 'city', 'state', 'postalCode'];
    const missingFields = requiredFields.filter(field => !details[field]);

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    onDetailsSubmit(details);
    setShowDetails(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();
            if (data.results[0]) {
              handleLocationSelect(data.results[0].formatted_address, {
                lat: position.coords.latitude.toString(),
                lon: position.coords.longitude.toString()
              });
            }
          } catch (error) {
            console.error("Error getting location details:", error);
            toast({
              title: "Location Error",
              description: "Could not retrieve location details",
              variant: "destructive"
            });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Access Denied",
            description: "Please enable location access or enter location manually",
            variant: "destructive"
          });
        }
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Pick-up Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <LocationInput
              placeholder="Enter pick-up location"
              value={location}
              onChange={(value, coordinates) => {
                handleLocationSelect(value, coordinates);
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={getCurrentLocation}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>

          {showDetails && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="streetNumber">Street Number</Label>
                  <Input
                    id="streetNumber"
                    value={details.streetNumber}
                    onChange={(e) => setDetails(prev => ({ ...prev, streetNumber: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    value={details.street}
                    onChange={(e) => setDetails(prev => ({ ...prev, street: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={details.city}
                    onChange={(e) => setDetails(prev => ({ ...prev, city: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={details.state}
                    onChange={(e) => setDetails(prev => ({ ...prev, state: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={details.postalCode}
                    onChange={(e) => setDetails(prev => ({ ...prev, postalCode: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Confirm Address
              </Button>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  );
};