import VisaBookingSection from "@/app/components/Container/VisaBookingSection/VisaBookingSection";
import React from "react";

export const metadata = {
  title: 'Hassle-Free Visa Assistance & Application Services',
  description: 'Need help with travel visas? Get quick tourist and business visa assistance with high approval support for your international trips.',
  keywords: ['Tourist visa assistance Chennai', 'Fast visa application service', 'International travel visa help'],
  alternates: {
    canonical: '/service/visa-booking',
  },
  openGraph: {
    title: 'Hassle-Free Visa Assistance & Application Services | Pals Holidays',
    description: 'Get quick tourist and business visa assistance for your international trips.',
    url: '/service/visa-booking',
    locale: 'en_IN',
    type: 'website',
  },
};

function page() {
  return <VisaBookingSection />;
}

export default page;