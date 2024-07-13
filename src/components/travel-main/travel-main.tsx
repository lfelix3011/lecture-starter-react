import { TravelMainFilter } from "./travel-main-filter.tsx";
import { useState } from "react";
import { TravelMainList } from "./travel-main-list.tsx";
import { TripModel } from "../../common/models/trip.ts";

type Props = {
  trips: TripModel[];
};

const TravelMain = ({ trips }: Props): JSX.Element => {
  const [filterTitle, setFilterTitle] = useState("");
  const [filterDuration, setFilterDuration] = useState("");
  const [filterLevel, setFilterLevel] = useState("");

  return (
    <main>
      <h1 className="visually-hidden">Travel App</h1>
      <TravelMainFilter
        filterTitle={filterTitle}
        filterDuration={filterDuration}
        filterLevel={filterLevel}
        onFilterTitleChange={setFilterTitle}
        onFilterDurationChange={setFilterDuration}
        onFilterLevelChange={setFilterLevel}
      />
      <TravelMainList trips={trips}
        filterTitle={filterTitle}
        filterDuration={filterDuration}
        filterLevel={filterLevel}
      />
    </main>
  );
};

export { TravelMain };
