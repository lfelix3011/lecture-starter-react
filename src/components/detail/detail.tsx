import { TripModel } from "../../common/models/trip.ts";
import { useParams } from "react-router-dom";
import { isNullOrUndefined } from "../../common/helpers/utilities.ts";
import { TripDetailCard } from "./detail-card.tsx";
import { NotFound } from "../common/not-found/not-found.tsx";
import { BookingModel } from "../../common/models/booking.ts";
import styles from './detail.module.css';

type Props = {
  trips: TripModel[];
  onBookTrip: (booking: BookingModel) => void;
};

const TripDetail = ({ trips, onBookTrip }: Props): JSX.Element => {
  const { tripId } = useParams();
  const trip: TripModel | undefined = trips.find((trip) => trip.id === tripId);

  return (
    <main className={styles.tripPage}>
      <h1 className="visually-hidden">Travel App</h1>
      {!isNullOrUndefined(trip) ? (
        <TripDetailCard trip={trip} onBookTrip={onBookTrip}/>
      ) : (
        <NotFound message="Trip not found" />
      )}
    </main>
  );
};

export { TripDetail };
