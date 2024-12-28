import React, { useCallback, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { DialogTitle } from "@/components/ui/dialog";

interface MapLocationPickerProps {
  onLocationSelect: (coordinates: { lat: number; lng: number }) => void;
  defaultCenter?: [number, number];
}

const containerStyle = {
  width: '100%',
  height: '300px'
};

const MapLocationPicker = ({ onLocationSelect, defaultCenter = [-74.006, 40.7128] }: MapLocationPickerProps) => {
  const [marker, setMarker] = useState<google.maps.LatLng | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const center = {
    lat: defaultCenter[1],
    lng: defaultCenter[0]
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarker(e.latLng);
    }
  };

  const handleConfirmLocation = () => {
    if (marker) {
      onLocationSelect({
        lat: marker.lat(),
        lng: marker.lng()
      });
    }
  };

  return (
    <div className="space-y-4">
      <DialogTitle className="text-lg font-semibold">
        Select Location
      </DialogTitle>
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false
            }}
          >
            {marker && (
              <Marker
                position={marker}
                draggable={true}
                onDragEnd={(e) => {
                  if (e.latLng) {
                    setMarker(e.latLng);
                  }
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
        {marker && (
          <Button
            className="absolute bottom-4 right-4 z-10"
            onClick={handleConfirmLocation}
          >
            <MapPin className="mr-2 h-4 w-4" />
            Confirm Location
          </Button>
        )}
      </div>
    </div>
  );
};

export default MapLocationPicker;