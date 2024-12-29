import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationInput } from "@/components/LocationInput";
import { MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";

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

  const handleLocationSelect = (value: string) => {
    onLocationChange(value);
    setShowDetails(true);
    setDetails(prev => ({ ...prev, fullAddress: value }));
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              handleLocationSelect(data.results[0].formatted_address);
            }
          } catch (error) {
            console.error("Error getting location details:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
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
              onChange={handleLocationSelect}
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