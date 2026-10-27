import Contactsection from "@/app/components/Container/Contactsection/Contactsection";
import React from "react";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Pals Holidays for holiday packages, flight bookings, and travel assistance. Contact our Chennai office to plan your trip today.",
  keywords: [
    "Contact Pals Holidays",
    "Travel Support Chennai",
    "Holiday Package Enquiries",
    "Travel Agency Contact Number",
  ],
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Us | Pals Holidays",
    description:
      "Contact Pals Holidays for holiday packages and travel assistance.",
    url: "/contact-us",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Pals Holidays",
    description:
      "Contact Pals Holidays for holiday packages and travel assistance.",
  },
};

export default function Page() {
  return <Contactsection />;
}
