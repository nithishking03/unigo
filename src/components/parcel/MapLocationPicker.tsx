import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { DialogTitle } from "@/components/ui/dialog";

interface MapLocationPickerProps {
  onLocationSelect: (coordinates: { lat: number; lng: number }) => void;
  defaultCenter?: [number, number];
}

const MapLocationPicker = ({ onLocationSelect, defaultCenter = [-74.006, 40.7128] }: MapLocationPickerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Use a temporary token for development - in production this should come from Supabase secrets
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHRxbXd4Z2gwMDFqMmlsc2VnZzF1c3ZtIn0.a-KxKx9ojVoFPp140sc_7g';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: defaultCenter,
      zoom: 12
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    marker.current = new mapboxgl.Marker({
      draggable: true
    });

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      marker.current?.setLngLat([lng, lat]).addTo(map.current!);
      setSelectedLocation({ lat, lng });
    });

    marker.current.on('dragend', () => {
      const lngLat = marker.current?.getLngLat();
      if (lngLat) {
        setSelectedLocation({ lat: lngLat.lat, lng: lngLat.lng });
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [defaultCenter]);

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    }
  };

  return (
    <div className="space-y-4">
      <DialogTitle className="text-lg font-semibold">
        Select Location
      </DialogTitle>
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="w-full h-full" />
        {selectedLocation && (
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