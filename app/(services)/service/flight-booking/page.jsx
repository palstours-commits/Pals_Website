import FlightBookingSection from '@/app/components/Container/FlightBookingsection/FlightBookingsection';
import React from 'react';

export const metadata = {
  title: 'Book Cheap Flights | Domestic & International Flight Tickets',
  description: 'Book domestic and international flight tickets easily at the best prices. Fast booking, great airline options, and helpful customer support.',
  keywords: ['Book flight tickets online', 'Cheap domestic flights India', 'International flight booking service'],
  alternates: {
    canonical: '/service/flight-booking',
  },
  openGraph: {
    title: 'Book Cheap Flights | Domestic & International Flight Tickets | Pals Holidays',
    description: 'Book domestic and international flight tickets easily at the best prices.',
    url: '/service/flight-booking',
    locale: 'en_IN',
    type: 'website',
  },
};

function page() {
  return <FlightBookingSection />;
}

export default page;