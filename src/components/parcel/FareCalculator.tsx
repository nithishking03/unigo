import React from 'react';
import { Card } from "@/components/ui/card";

interface FareCalculatorProps {
  distance: number;
  weightCategory: string;
  priority: string;
}

export const calculateFare = (distance: number, weightCategory: string, priority: string): number => {
  let baseFare = 5.00; // Base fare in dollars
  
  // Distance rate (per km)
  const distanceRate = distance * 0.5;
  
  // Weight multiplier
  const weightMultiplier = 
    weightCategory === 'heavy' ? 2.0 :
    weightCategory === 'medium' ? 1.5 : 1.0;
  
  // Priority multiplier
  const priorityMultiplier = priority === 'express' ? 1.5 : 1.0;
  
  const totalFare = (baseFare + distanceRate) * weightMultiplier * priorityMultiplier;
  
  return Math.round(totalFare * 100) / 100; // Round to 2 decimal places
};

const FareCalculator: React.FC<FareCalculatorProps> = ({ distance, weightCategory, priority }) => {
  const estimatedFare = calculateFare(distance, weightCategory, priority);

  return (
    <Card className="p-4 bg-primary/5">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Distance:</span>
          <span>{distance.toFixed(2)} km</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Weight Category:</span>
          <span className="capitalize">{weightCategory}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Priority:</span>
          <span className="capitalize">{priority}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Estimated Fare:</span>
            <span>${estimatedFare.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FareCalculator;