import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LocationInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const LocationInput = ({ placeholder = "Enter your location", value, onChange }: LocationInputProps) => {
  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};