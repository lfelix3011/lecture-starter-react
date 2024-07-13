import { TripModel } from "../../common/models/trip";
import { BookTripForm } from "./book-trip-form";
import { BookingModel } from "../../common/models/booking";
import { AppPath } from "../../common/enums/enums";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from './book-trip.module.css';

type Props = {
  trip: TripModel;
  isModalOpen: boolean;
  closeModal: (value: boolean) => void;
  onTripBook: (booking: BookingModel) => void;
};

const BookTrip = ({
  trip,
  isModalOpen,
  closeModal,
  onTripBook,
}: Props): JSX.Element => {
  const [submitted, setSubmitted] = useState(false);
  
  const handleCloseModal = (): void => {
    closeModal(false);
  };

  const handleSubmit = (booking: BookingModel): void => {
    onTripBook(booking);
    handleCloseModal();
    setSubmitted(true);
  };

  if(submitted)
    return <Navigate to={AppPath.BOOKINGS} replace />;


  return (
    <div hidden={!isModalOpen}>
      <div className="modal">
        <div data-test-id="book-trip-popup" className={styles.bookTripPopup}>
          <button
            data-test-id="book-trip-popup-close"
            className={styles.bookTripPopup__close}
            onClick={handleCloseModal}
          >
            ×
          </button>
          <BookTripForm trip={trip} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export { BookTrip };
