import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Transportation from "./pages/Transportation";
import FoodDelivery from "./pages/FoodDelivery";
import ParcelDelivery from "./pages/ParcelDelivery";
import Travel from "./pages/Travel";
import Emergency from "./pages/Emergency";
import Auth from "./pages/Auth";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transportation"
            element={
              <ProtectedRoute>
                <Transportation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/food-delivery"
            element={
              <ProtectedRoute>
                <FoodDelivery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parcel-delivery"
            element={
              <ProtectedRoute>
                <ParcelDelivery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/travel"
            element={
              <ProtectedRoute>
                <Travel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency"
            element={
              <ProtectedRoute>
                <Emergency />
              </ProtectedRoute>
            }
          />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;