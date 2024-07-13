import { TripModel } from "../../common/models/trip.ts";
import { BookTrip } from "../book-trip/book-trip.tsx";
import { useState } from "react";
import { BookingModel } from "../../common/models/booking.ts";
import styles from './detail.module.css';

type Props = {
  trip: TripModel;
  onBookTrip: (booking: BookingModel) => void;
};

const TripDetailCard = ({ trip, onBookTrip }: Props): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  }
  
  return (
    <>
      <div className={styles.trip}>
        <img
          data-test-id="trip-details-image"
          src={trip.image}
          className={styles.trip__img}
          alt={`${trip.title} photo`}
        />
        <div className={styles.trip__content}>
          <div className={styles.tripInfo}>
            <h3 data-test-id="trip-details-title" className={styles.tripInfo__title}>
              {trip.title}
            </h3>
            <div className={styles.tripInfo__content}>
              <span
                data-test-id="trip-details-duration"
                className={styles.tripInfo__duration}
              >
                <strong>{trip.duration}</strong> days
              </span>
              <span
                data-test-id="trip-details-level"
                className={styles.tripInfo__level}
              >
                {trip.level}
              </span>
            </div>
          </div>
          <div
            data-test-id="trip-details-description"
            className={styles.trip__description}
          >
            {trip.description}
          </div>
          <div className={styles.tripPrice}>
            <span>Price</span>
            <strong
              data-test-id="trip-details-price-value"
              className={styles.tripPrice__value}
            >
              ${trip.price}
            </strong>
          </div>
          <button
            data-test-id="trip-details-button"
            className={`${styles.trip__button} button`}
            onClick={handleOpenModal}
          >
            Book a trip
          </button>
        </div>
      </div>
      <BookTrip trip={trip} isModalOpen={openModal} closeModal={setOpenModal} onTripBook={onBookTrip}/>
    </>
  );
};

export { TripDetailCard };
