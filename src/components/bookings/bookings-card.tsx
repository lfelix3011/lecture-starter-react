import { BookingModel } from "../../common/models/booking";
import styles from './bookings.module.css';

type Props = {
  booking: BookingModel;
  cancelBooking: (id: string) => void;
};

const BookingCard = ({ booking, cancelBooking }: Props): JSX.Element => {
  const bookingDate: string = booking.date.split("T")[0];
  const guestMessage = `${booking.guests} guest${
    booking.guests > 1 ? "s" : ""
  }`;

  const handleOnCancelBooking = () => {
    cancelBooking(booking.id);
  };

  return (
    <li data-test-id="booking" className={styles.booking}>
      <h3 data-test-id="booking-title" className={styles.booking__title}>
        {booking.trip.title}
      </h3>
      <span data-test-id="booking-guests" className={styles.booking__guests}>
        {guestMessage}
      </span>
      <span data-test-id="booking-date" className={styles.booking__date}>
        {bookingDate}
      </span>
      <span data-test-id="booking-total" className={styles.booking__total}>
        ${booking.totalPrice}
      </span>
      <button
        data-test-id="booking-cancel"
        className={styles.booking__cancel}
        title="Cancel booking"
        onClick={handleOnCancelBooking}
      >
        <span className="visually-hidden">Cancel booking</span>×
      </button>
    </li>
  );
};

export { BookingCard };
