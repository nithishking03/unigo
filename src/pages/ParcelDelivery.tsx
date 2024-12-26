import React from 'react';
import { NavBar } from "@/components/NavBar";
import { Package, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  pickupAddress: z.string().min(1, "Pickup address is required"),
  dropoffAddress: z.string().min(1, "Dropoff address is required"),
  packageDetails: z.string().min(1, "Package details are required"),
  recipientName: z.string().min(1, "Recipient name is required"),
  recipientPhone: z.string().min(10, "Valid phone number is required"),
});

const ParcelDelivery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupAddress: "",
      dropoffAddress: "",
      packageDetails: "",
      recipientName: "",
      recipientPhone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.from('ride_requests').insert({
        pickup_address: values.pickupAddress,
        dropoff_address: values.dropoffAddress,
        ride_type: 'bike',
        pickup_location: '(0,0)', // We'll update this with actual coordinates later
        dropoff_location: '(0,0)', // We'll update this with actual coordinates later
        user_id: '123', // We'll update this with actual user ID once auth is implemented
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your parcel delivery request has been submitted.",
      });

      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit delivery request. Please try again.",
        variant: "destructive",
      });
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

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Package className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-3xl font-bold mb-4">Send a Parcel</h1>
            <p className="text-gray-600">
              Fill in the details below to schedule your parcel delivery
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="pickupAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter pickup address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dropoffAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dropoff Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter dropoff address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="packageDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your package (size, weight, contents, etc.)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter recipient's full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter recipient's phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Schedule Delivery
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParcelDelivery;