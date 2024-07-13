import { BookingModel } from "../../common/models/booking";
import { BookingsList } from "./bookings-list";
import styles from './bookings.module.css';

type Props = {
  bookings: BookingModel[];
  cancelBooking: (id: string) => void;
};

const Bookings = ({
  bookings,
  cancelBooking
}: Props): JSX.Element => {
 
  return (
    <main className={styles.bookingsPage}>
      <h1 className="visually-hidden">Travel App</h1>
      <BookingsList bookings={bookings} cancelBooking={cancelBooking} />
    </main>
  );
};

export { Bookings };
