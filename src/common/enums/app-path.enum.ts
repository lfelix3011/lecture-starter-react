const AppPath = {
  ROOT: '/',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  TRIP: '/trip',
  TRIP_$ID: '/trip/:tripId',
  BOOKINGS: '/bookings',
  ANY: '*',
} as const;

export { AppPath };
