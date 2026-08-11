import VisaBookingSection from "@/app/components/Container/VisaBookingSection/VisaBookingSection";
import React from "react";

export const metadata = {
  title: "Visa Booking Services | Hassle-Free Visa Assistance",
  description:
    "Get hassle-free visa booking and assistance for your international travel. Explore visa services and get support for your travel plans.",
  alternates: {
    canonical: "/service/visa-booking",
  },
};

function page() {
  return <VisaBookingSection />;
}

export default page;