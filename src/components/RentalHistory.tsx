import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Car, Calendar } from "lucide-react";

interface RentalRecord {
  id: string;
  vehicle_type: string;
  vehicle_model: string;
  pickup_location: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  status: string;
}

export const RentalHistory = () => {
  const { session } = useAuth();
  const [rentals, setRentals] = useState<RentalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      if (!session?.user) return;

      try {
        const { data, error } = await supabase
          .from('vehicle_rentals')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setRentals(data || []);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [session]);

  if (loading) {
    return <div>Loading rental history...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Rental History</h2>
      {rentals.length === 0 ? (
        <p className="text-gray-500">No rental history found.</p>
      ) : (
        rentals.map((rental) => (
          <Card key={rental.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {rental.vehicle_model}
              </CardTitle>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Car className="h-4 w-4" />
                <span>{rental.vehicle_type}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {format(new Date(rental.start_date), 'PPP')} - {format(new Date(rental.end_date), 'PPP')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">₹{rental.total_amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`capitalize ${
                    rental.status === 'completed' ? 'text-green-600' :
                    rental.status === 'pending' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {rental.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};