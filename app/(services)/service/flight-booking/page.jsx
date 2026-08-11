import FlightBookingSection from '@/app/components/Container/FlightBookingsection/FlightBookingsection';
import React from 'react';

export const metadata = {
  title: 'Flight Booking Services | Book Flights Easily',
  description:
    'Book domestic and international flights with ease. Find convenient flight options, competitive fares, and hassle-free flight booking services for your next trip.',

  alternates: {
    canonical: 'service/flight-booking',
  },
};

function page() {
  return <FlightBookingSection />;
}

export default page;