import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchAddress, GeocodingResult } from "@/utils/geocoding";
import { useDebounce } from "@/hooks/use-debounce";

interface LocationInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string, coordinates?: { lat: string; lon: string }) => void;
}

export const LocationInput = ({ placeholder = "Enter your location", value, onChange }: LocationInputProps) => {
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, 500);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedValue.trim()) {
        const results = await searchAddress(debouncedValue);
        setSuggestions(results);
        setIsOpen(true);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    };

    fetchSuggestions();
  }, [debouncedValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion: GeocodingResult) => {
    setInputValue(suggestion.display_name);
    onChange(suggestion.display_name, { lat: suggestion.lat, lon: suggestion.lon });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className="pl-10 bg-white/90 backdrop-blur-sm border-0 focus-visible:ring-primary"
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
      />
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};