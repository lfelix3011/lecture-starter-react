import { AppPath } from "../../common/enums/enums";
import { RouterProvider } from "../common/router-provider/router-provider.tsx";
import { SignIn } from "../sign-in/sign-in.tsx";
import { SignUp } from "../sign-up/sign-up.tsx";

import {
  SignUp as SignUpType,
  SignIn as SignInType,
  Booking as BookingType,
} from "../../common/types/types";
import { Layout } from "../common/layout/layout.tsx";
import { TravelMain } from "../travel-main/travel-main.tsx";
import { Navigate } from "react-router-dom";
import { TripDetail } from "../detail/detail.tsx";
import { trips } from "../../data/trips.ts";
import { BookingModel } from "../../common/models/booking.ts";
import { useState } from "react";
import { Bookings } from "../bookings/bookings.tsx";

const App = (): JSX.Element => {
  const [bookings, setBookings] = useState<BookingType>([]);

  const isAuthenticated: boolean = true;
  const handleSignUp = (signUp: SignUpType): void => {};

  const handleSignIn = (signIn: SignInType): void => {};

  const handleBookTrip = (booking: BookingModel): void => {
    setBookings([booking, ...bookings]);
  };

  const handleCancelBooking = (id: string) => {
    const filteredBookings: BookingModel[] = bookings.filter((booking) => booking.id !== id);
    setBookings(filteredBookings);
  };

  const routes = [
    {
      path: AppPath.ROOT,
      children: [
        {
          path: AppPath.SIGN_IN,
          element: (
            <Layout isAuthenticated={false}>
              <SignIn onSignIn={handleSignIn} />
            </Layout>
          ),
        },
        {
          path: AppPath.SIGN_UP,
          element: (
            <Layout isAuthenticated={false}>
              <SignUp onSignUp={handleSignUp} />
            </Layout>
          ),
        },
        {
          path: AppPath.ROOT,
          element: (
            <Layout isAuthenticated={isAuthenticated}>
              <TravelMain trips={trips} />
            </Layout>
          ),
        },
        {
          path: AppPath.BOOKINGS,
          element: (
            <Layout isAuthenticated={isAuthenticated}>
              <Bookings
                bookings={bookings}
                cancelBooking={handleCancelBooking}
              />
            </Layout>
          ),
        },
        {
          path: AppPath.TRIP_$ID,
          element: (
            <Layout isAuthenticated={isAuthenticated}>
              <TripDetail trips={trips} onBookTrip={handleBookTrip} />
            </Layout>
          ),
        },
        {
          path: AppPath.ANY,
          element: <Navigate to={AppPath.ROOT} replace />,
        },
      ],
    },
  ];

  return <RouterProvider routes={routes} />;
};

export default App;
