import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LocationSection from "./LocationSection";
import FareCalculator, { calculateFare } from "./FareCalculator";
import { useState } from "react";

const formSchema = z.object({
  pickupAddress: z.string().min(1, "Pickup address is required"),
  dropoffAddress: z.string().min(1, "Dropoff address is required"),
  packageDetails: z.string().min(1, "Package details are required"),
  recipientName: z.string().min(1, "Recipient name is required"),
  recipientPhone: z.string().min(10, "Valid phone number is required"),
  senderName: z.string().min(1, "Sender name is required"),
  senderPhone: z.string().min(10, "Valid phone number is required"),
  weightCategory: z.enum(["light", "medium", "heavy"]),
  priority: z.enum(["standard", "express"]),
  deliveryInstructions: z.string().optional(),
});

export type ParcelDeliveryFormData = z.infer<typeof formSchema>;

interface ParcelDeliveryFormProps {
  onSubmit: (data: ParcelDeliveryFormData & {
    pickupCoordinates?: { lat: number; lng: number };
    dropoffCoordinates?: { lat: number; lng: number };
    estimatedFare?: number;
  }) => Promise<void>;
  isSubmitting: boolean;
}

export const ParcelDeliveryForm = ({ onSubmit, isSubmitting }: ParcelDeliveryFormProps) => {
  const [pickupCoordinates, setPickupCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [dropoffCoordinates, setDropoffCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState(0);

  const form = useForm<ParcelDeliveryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupAddress: "",
      dropoffAddress: "",
      packageDetails: "",
      recipientName: "",
      recipientPhone: "",
      senderName: "",
      senderPhone: "",
      weightCategory: "light",
      priority: "standard",
      deliveryInstructions: "",
    },
  });

  const handleSubmit = async (data: ParcelDeliveryFormData) => {
    await onSubmit({
      ...data,
      pickupCoordinates: pickupCoordinates || undefined,
      dropoffCoordinates: dropoffCoordinates || undefined,
      estimatedFare: distance > 0 ? calculateFare(distance, data.weightCategory, data.priority) : undefined,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <LocationSection
          control={form.control}
          form={form}
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
          setPickupCoordinates={setPickupCoordinates}
          setDropoffCoordinates={setDropoffCoordinates}
          onDistanceChange={setDistance}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="senderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sender Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="senderPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sender Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="recipientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter recipient's name" {...field} />
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="weightCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Weight</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select package weight" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="light">Light (up to 5kg)</SelectItem>
                    <SelectItem value="medium">Medium (5-20kg)</SelectItem>
                    <SelectItem value="heavy">Heavy (20kg+)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Priority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="standard">Standard Delivery</SelectItem>
                    <SelectItem value="express">Express Delivery</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {distance > 0 && (
          <FareCalculator
            distance={distance}
            weightCategory={form.watch("weightCategory")}
            priority={form.watch("priority")}
          />
        )}

        <FormField
          control={form.control}
          name="packageDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Details</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your package (size, contents, etc.)" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliveryInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Instructions (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any special instructions for the delivery" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Schedule Delivery'
          )}
        </Button>
      </form>
    </Form>
  );
};