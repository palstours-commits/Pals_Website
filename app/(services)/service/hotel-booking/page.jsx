import HotelBookingSection from "@/app/components/Container/HotelBookingSection/HotelBookingSection";
import React from "react";

export const metadata = {
  title: "Hotel Booking Services | Book Hotels Easily",
  description:
    "Book hotels easily with our reliable hotel booking services. Find comfortable stays, great options, and convenient accommodation for your next trip.",
  alternates: {
    canonical: "/service/hotel-booking",
  },
};

function page() {
  return <HotelBookingSection />;
}

export default page;