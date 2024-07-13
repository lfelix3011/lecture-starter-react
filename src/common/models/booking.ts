export interface BookingModel {
  id: string;
  userId: string;
  tripId: string;
  guests: number;
  date: string;
  trip: BookingTripModel;
  totalPrice: number;
  createdAt: string;
}

export interface BookingTripModel {
  title: string;
  duration: number;
  price: number;
}
