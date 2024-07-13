import { BookingCard } from "./bookings-card";
import { BookingModel } from "../../common/models/booking";
import { NotFound } from "../common/not-found/not-found";
import styles from "./bookings.module.css";

type Props = {
  bookings: BookingModel[];
  cancelBooking: (id: string) => void;
};

const BookingsList = ({ bookings, cancelBooking }: Props): JSX.Element => {
  const sortBookingOnDate = (
    firstBooking: BookingModel,
    secondBooking: BookingModel
  ) => {
    const firstBookingTimestamp: number = new Date(
      firstBooking.date
    ).getTime();
    const secondBookingTimestamp: number = new Date(
      secondBooking.date
    ).getTime();

    return firstBookingTimestamp - secondBookingTimestamp;
  };

  const sortedBookings: BookingModel[] = bookings.sort(sortBookingOnDate);
  const bookingCards: JSX.Element[] = sortedBookings.map((booking) => (
    <BookingCard
      key={booking.id}
      booking={booking}
      cancelBooking={cancelBooking}
    />
  ));

  return (
    <>
      {bookingCards.length === 0 ? (
        <NotFound message="No bookings available to show" />
      ) : (
        <ul className={styles.bookings__list}>{bookingCards}</ul>
      )}
    </>
  );
};

export { BookingsList };
