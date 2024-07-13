import styles from './travel-main.module.css';

type Props = {
  filterTitle: string;
  filterDuration: string;
  filterLevel: string;
  onFilterTitleChange: (value: string) => void;
  onFilterDurationChange: (value: string) => void;
  onFilterLevelChange: (value: string) => void;
};

const TravelMainFilter = ({
  filterTitle,
  filterDuration,
  filterLevel,
  onFilterTitleChange,
  onFilterDurationChange,
  onFilterLevelChange,
}: Props): JSX.Element => {
  return (
    <section className={styles.tripsFilter}>
      <h2 className="visually-hidden">Trips filter</h2>
      <form className={styles.tripsFilter__form} autoComplete="off">
        <label className={`${styles.tripsFilter__search} input`}>
          <span className="visually-hidden">Search by name</span>
          <input
            data-test-id="filter-search"
            name="search"
            type="search"
            placeholder="search by title"
            value={filterTitle}
            onChange={(e) => onFilterTitleChange(e.target.value)}
          />
        </label>
        <label className="select">
          <span className="visually-hidden">Search by duration</span>
          <select
            data-test-id="filter-duration"
            name="duration"
            value={filterDuration}
            onChange={(e) => onFilterDurationChange(e.target.value)}
          >
            <option value="">duration</option>
            <option value="0_x_5">&lt; 5 days</option>
            <option value="5_x_10">&lt; 10 days</option>
            <option value="10">&ge; 10 days</option>
          </select>
        </label>
        <label className="select">
          <span className="visually-hidden">Search by level</span>
          <select
            data-test-id="filter-level"
            name="level"
            value={filterLevel}
            onChange={(e) => onFilterLevelChange(e.target.value)}
          >
            <option value="">level</option>
            <option value="easy">easy</option>
            <option value="moderate">moderate</option>
            <option value="difficult">difficult</option>
          </select>
        </label>
      </form>
    </section>
  );
};

export { TravelMainFilter };
