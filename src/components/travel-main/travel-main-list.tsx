import { isStringNullOrEmpty } from "../../common/helpers/utilities";
import { TripCard } from "./trip-card";
import { TripModel } from "../../common/models/trip.ts";
import { JSX } from "react/jsx-runtime";
import { NotFound } from "../common/not-found/not-found.tsx";
import styles from './travel-main.module.css';

type Props = {
  trips: TripModel[];
  filterTitle: string;
  filterDuration: string;
  filterLevel: string;
};

const TravelMainList = ({
  trips,
  filterTitle,
  filterDuration,
  filterLevel,
}: Props): JSX.Element => {
  const tripCards: JSX.Element[] = [];

  const filterByTitle = (filterTitle: string, title: string): boolean => {
    if (isStringNullOrEmpty(filterTitle)) {
      return true;
    }

    return title.toLowerCase().search(filterTitle.toLowerCase()) !== -1;
  };

  const filterByDuration = (
    filterDuration: string,
    duration: number
  ): boolean => {
    if (isStringNullOrEmpty(filterDuration)) {
      return true;
    }

    switch (filterDuration) {
      case "0_x_5":
        return duration >= 1 && duration <= 5;
      case "5_x_10":
        return duration >= 6 && duration <= 10;
      case "10":
        return duration >= 11;
      default:
        return true;
    }
  };

  const filterByLevel = (filterLevel: string, level: string): boolean => {
    if (isStringNullOrEmpty(filterLevel)) {
      return true;
    }

    return filterLevel === level;
  };

  trips.forEach((trip: TripModel) => {
    if (!filterByTitle(filterTitle, trip.title)) {
      return;
    }

    if (!filterByDuration(filterDuration, trip.duration)) {
      return;
    }

    if (!filterByLevel(filterLevel, trip.level)) {
      return;
    }

    tripCards.push(<TripCard key={trip.id} trip={trip} />);
  });

  return (
    <section className={styles.trips}>
      <h2 className="visually-hidden">Trips List</h2>
      {tripCards.length === 0 ? (
        <NotFound message="No trips available to show" />
      ) : (
        <ul className={styles.tripList}>{tripCards}</ul>
      )}
    </section>
  );
};

export { TravelMainList };
