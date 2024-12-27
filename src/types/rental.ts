export interface VehicleRental {
  id: string;
  userId: string;
  vehicleType: 'Bike' | 'Car';
  vehicleModel: string;
  pickupLocation: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}