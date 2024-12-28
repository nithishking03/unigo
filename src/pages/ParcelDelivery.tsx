import React from 'react';
import { NavBar } from "@/components/NavBar";
import { Package, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { ParcelDeliveryForm, ParcelDeliveryFormData } from "@/components/parcel/ParcelDeliveryForm";

const ParcelDelivery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (values: ParcelDeliveryFormData) => {
    if (!session?.user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to send parcels",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const estimatedDeliveryTime = new Date();
      estimatedDeliveryTime.setHours(estimatedDeliveryTime.getHours() + 
        (values.priority === 'express' ? 2 : 4));

      const { error } = await supabase.from('parcel_deliveries').insert({
        user_id: session.user.id,
        pickup_address: values.pickupAddress,
        dropoff_address: values.dropoffAddress,
        package_details: values.packageDetails,
        recipient_name: values.recipientName,
        recipient_phone: values.recipientPhone,
        sender_name: values.senderName,
        sender_phone: values.senderPhone,
        weight_category: values.weightCategory,
        priority: values.priority,
        estimated_delivery_time: estimatedDeliveryTime.toISOString(),
        delivery_instructions: values.deliveryInstructions,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your parcel delivery request has been submitted.",
      });

      navigate('/');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit delivery request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Package className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-3xl font-bold mb-4">Send a Parcel</h1>
            <p className="text-gray-600">
              Fast and reliable parcel delivery at your fingertips
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <ParcelDeliveryForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParcelDelivery;