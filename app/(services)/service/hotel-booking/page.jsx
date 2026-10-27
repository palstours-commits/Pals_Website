import HotelBookingSection from "@/app/components/Container/HotelBookingSection/HotelBookingSection";
import React from "react";

export const metadata = {
  title: 'Best Hotel Booking Deals | Comfortable Stays & Resorts',
  description: 'Find and book the best hotels, resorts, and homestays for your trip. Comfortable stays at pocket-friendly prices with Pals Holidays.',
  keywords: ['Book hotel rooms online', 'Best resort booking deals', 'Family hotels and stays India'],
  alternates: {
    canonical: '/service/hotel-booking',
  },
  openGraph: {
    title: 'Best Hotel Booking Deals | Comfortable Stays & Resorts | Pals Holidays',
    description: 'Find and book the best hotels, resorts, and homestays for your trip.',
    url: '/service/hotel-booking',
    locale: 'en_IN',
    type: 'website',
  },
};

function page() {
  return <HotelBookingSection />;
}

export default page;