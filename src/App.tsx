import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Transportation from "./pages/Transportation";
import FoodDelivery from "./pages/FoodDelivery";
import ParcelDelivery from "./pages/ParcelDelivery";
import Travel from "./pages/Travel";

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/food-delivery" element={<FoodDelivery />} />
        <Route path="/parcel-delivery" element={<ParcelDelivery />} />
        <Route path="/travel" element={<Travel />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
);

export default App;