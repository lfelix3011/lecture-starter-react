import { Link } from "react-router-dom";
import { AppPath } from "../../common/enums/enums.ts";
import icelandImg from "../../assets/images/iceland.jpg";
import { TripModel } from "../../common/models/trip.ts";
import styles from "./travel-main.module.css";

type Props = {
  trip: TripModel;
};

const TripCard = ({ trip }: Props): JSX.Element => {
  return (
    <li data-test-id="trip-card" className={styles.tripCard}>
      <img
        data-test-id="trip-card-image"
        src={trip.image || icelandImg}
        alt={`${trip.title} photo`}
      />
      <div className={styles.tripCard__content}>
        <div className={styles.tripInfo}>
          <h3 data-test-id="trip-card-title" className={styles.tripInfo__title}>
            {trip.title}
          </h3>
          <div className={styles.tripInfo__content}>
            <span
              data-test-id="trip-card-duration"
              className={styles.tripInfo__duration}
            >
              <strong>{trip.duration}</strong> days
            </span>
            <span
              data-test-id="trip-card-level"
              className={styles.tripInfo__level}
            >
              {trip.level}
            </span>
          </div>
        </div>
        <div className="trip-price">
          <span>Price</span>
          <strong
            data-test-id="trip-card-price-value"
            className={styles.tripPrice__value}
          >
            ${trip.price}
          </strong>
        </div>
      </div>
      <Link
        data-test-id="trip-card-link"
        to={`${AppPath.TRIP}/${trip.id}`}
        className="button"
      >
        Discover a trip
      </Link>
    </li>
  );
};

export { TripCard };
