import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { LocationInput } from "@/components/LocationInput";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import MapLocationPicker from "./MapLocationPicker";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { calculateDistance } from "@/utils/distance";
import { AddressDetailsForm } from "./AddressDetailsForm";

interface LocationSectionProps {
  control: any;
  pickupCoordinates: { lat: number; lng: number } | null;
  dropoffCoordinates: { lat: number; lng: number } | null;
  setPickupCoordinates: (coords: { lat: number; lng: number } | null) => void;
  setDropoffCoordinates: (coords: { lat: number; lng: number } | null) => void;
  onDistanceChange: (distance: number) => void;
}

export const LocationSection = ({
  control,
  pickupCoordinates,
  dropoffCoordinates,
  setPickupCoordinates,
  setDropoffCoordinates,
  onDistanceChange
}: LocationSectionProps) => {
  const [activeLocation, setActiveLocation] = useState<'pickup' | 'dropoff' | null>(null);
  const [showPickupDetails, setShowPickupDetails] = useState(false);
  const [showDropoffDetails, setShowDropoffDetails] = useState(false);

  const handleLocationSelect = (coordinates: { lat: number; lng: number }) => {
    if (activeLocation === 'pickup') {
      setPickupCoordinates(coordinates);
    } else if (activeLocation === 'dropoff') {
      setDropoffCoordinates(coordinates);
    }

    // Calculate distance if both coordinates are available
    if (activeLocation === 'pickup' && dropoffCoordinates) {
      const distance = calculateDistance(
        coordinates.lat,
        coordinates.lng,
        dropoffCoordinates.lat,
        dropoffCoordinates.lng
      );
      onDistanceChange(distance);
    } else if (activeLocation === 'dropoff' && pickupCoordinates) {
      const distance = calculateDistance(
        pickupCoordinates.lat,
        pickupCoordinates.lng,
        coordinates.lat,
        coordinates.lng
      );
      onDistanceChange(distance);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <FormField
          control={control}
          name="pickupAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Address</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <LocationInput
                    placeholder="Enter pickup address"
                    value={field.value}
                    onChange={(value, coordinates) => {
                      field.onChange(value);
                      if (coordinates) {
                        const coords = { lat: Number(coordinates.lat), lng: Number(coordinates.lon) };
                        setPickupCoordinates(coords);
                        setShowPickupDetails(true);
                        if (dropoffCoordinates) {
                          const distance = calculateDistance(
                            coords.lat,
                            coords.lng,
                            dropoffCoordinates.lat,
                            dropoffCoordinates.lng
                          );
                          onDistanceChange(distance);
                        }
                      }
                    }}
                  />
                </FormControl>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setActiveLocation('pickup')}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogDescription className="sr-only">
                      Select pickup location on the map
                    </DialogDescription>
                    <MapLocationPicker
                      onLocationSelect={handleLocationSelect}
                      defaultCenter={pickupCoordinates ? [pickupCoordinates.lng, pickupCoordinates.lat] : undefined}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              {showPickupDetails && (
                <AddressDetailsForm
                  form={control._formState.form}
                  type="pickup"
                  onSubmit={() => setShowPickupDetails(false)}
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-6">
        <FormField
          control={control}
          name="dropoffAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dropoff Address</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <LocationInput
                    placeholder="Enter dropoff address"
                    value={field.value}
                    onChange={(value, coordinates) => {
                      field.onChange(value);
                      if (coordinates) {
                        const coords = { lat: Number(coordinates.lat), lng: Number(coordinates.lon) };
                        setDropoffCoordinates(coords);
                        setShowDropoffDetails(true);
                        if (pickupCoordinates) {
                          const distance = calculateDistance(
                            pickupCoordinates.lat,
                            pickupCoordinates.lng,
                            coords.lat,
                            coords.lng
                          );
                          onDistanceChange(distance);
                        }
                      }
                    }}
                  />
                </FormControl>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setActiveLocation('dropoff')}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogDescription className="sr-only">
                      Select dropoff location on the map
                    </DialogDescription>
                    <MapLocationPicker
                      onLocationSelect={handleLocationSelect}
                      defaultCenter={dropoffCoordinates ? [dropoffCoordinates.lng, dropoffCoordinates.lat] : undefined}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              {showDropoffDetails && (
                <AddressDetailsForm
                  form={control._formState.form}
                  type="dropoff"
                  onSubmit={() => setShowDropoffDetails(false)}
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default LocationSection;