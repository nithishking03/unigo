import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";

interface AddressDetailsFormProps {
  form: UseFormReturn<any>;
  type: "pickup" | "dropoff";
  onSubmit: () => void;
}

export const AddressDetailsForm = ({ form, type, onSubmit }: AddressDetailsFormProps) => {
  const prefix = type === "pickup" ? "pickup" : "dropoff";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`${prefix}StreetNumber`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter street number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${prefix}Street`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter street name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`${prefix}City`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter city" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${prefix}PostalCode`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter postal code" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button type="button" className="w-full" onClick={onSubmit}>
        Confirm Address
      </Button>
    </div>
  );
};