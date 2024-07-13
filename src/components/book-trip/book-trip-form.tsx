import { FormEvent, useState } from "react";
import { TripModel } from "../../common/models/trip";
import { BookingModel } from "../../common/models/booking";
import { formatDateForInput, formatDateIso, getTomorrowDate, parseDateLocal } from "../../common/helpers/utilities";
import styles from './book-trip.module.css';

type Props = {
  trip: TripModel;
  onSubmit: (booking: BookingModel) => void;
};

const BookTripForm = ({ trip, onSubmit }: Props): JSX.Element => {
  const tomorrowDate: Date = getTomorrowDate();
  const tomorrowDateInput: string = formatDateForInput(tomorrowDate);

  const [guests, setGuests] = useState(1);
  const [guestError, setGuestError] = useState("");
  const [date, setDate] = useState(tomorrowDateInput);
  const [dateError, setDateError] = useState("");
  const [totalPrice, setTotalPrice] = useState(trip.price);

  const handleGuestChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let numberGuests = Number(event.target.value);
    if (numberGuests > 10) numberGuests = 10;
    if (numberGuests < 1) numberGuests = 1;

    setGuests(numberGuests);
    handleCalculatePriceChange(numberGuests);
  };

  const handleCalculatePriceChange = (guests: number): void => {
    const totalPrice: number = guests * trip.price;
    setTotalPrice(totalPrice);
    setGuestError("");
  };

  const isNumberOfGuestValid = (): boolean => {
    const isValid: boolean = guests >= 1 && guests <= 10;
    !isValid && setGuestError("Number of guests should be from 1 to 10");

    return isValid;
  };

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const dateSelected = event.target.value;
    setDate(dateSelected);
    setDateError("");
  };

  const isDateValid = (): boolean => {
    const selectedDate: Date = parseDateLocal(date);
    const isValid: boolean = selectedDate >= tomorrowDate;

    !isValid && setDateError("Planned date, should be not earlier than tomorrow");

    return isValid;
  };

  const handleSubmit = (_event: FormEvent): void => {
    _event.preventDefault();

    if (!isNumberOfGuestValid() || !isDateValid()) {
      return;
    }

    const dateOfReservation: Date = parseDateLocal(date);
    const currentDate: string = formatDateIso(new Date());

    const booking: BookingModel = {
      id: crypto.randomUUID(),
      userId: crypto.randomUUID(),
      tripId: trip.id,
      guests: guests,
      date: formatDateIso(dateOfReservation),
      trip: {
        title: trip.title,
        duration: trip.duration,
        price: trip.price,
      },
      totalPrice: totalPrice,
      createdAt: currentDate,
    };

    onSubmit(booking);
    setGuests(1);
    setDate(tomorrowDateInput);
    setTotalPrice(trip.price);
  };

  return (
    <form
      className={styles.bookTripPopup__form}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className={styles.tripInfo}>
        <h3 data-test-id="book-trip-popup-title" className={styles.tripInfo__title}>
          {trip.title}
        </h3>
        <div className={styles.tripInfo__content}>
          <span
            data-test-id="book-trip-popup-duration"
            className={styles.tripInfo__duration}
          >
            <strong>{trip.duration}</strong> days
          </span>
          <span
            data-test-id="book-trip-popup-level"
            className={styles.tripInfo__level}
          >
            {trip.level}
          </span>
        </div>
      </div>
      <label className="input">
        <span className="input__heading">Date</span>
        <input
          data-test-id="book-trip-popup-date"
          name="date"
          type="date"
          value={date}
          min={tomorrowDateInput}
          required
          onChange={handleDateChange}
        />
          {dateError && <p className="field__error">{dateError}</p>}
      </label>
      <label className="input">
        <span className="input__heading">Number of guests</span>
        <input
          data-test-id="book-trip-popup-guests"
          name="guests"
          type="number"
          min="1"
          max="10"
          value={guests}
          required
          onChange={handleGuestChange}
        />
          {guestError && <p className="field__error">{guestError}</p>}
      </label>
      <span className={styles.bookTripPopup__total}>
        Total:
        <output
          data-test-id="book-trip-popup-total-value"
          className={styles.bookTripPopup__totalValue}
        >
          ${totalPrice}
        </output>
      </span>
      <button
        data-test-id="book-trip-popup-submit"
        className="button"
        type="submit"
      >
        Book a trip
      </button>
    </form>
  );
};

export { BookTripForm };
