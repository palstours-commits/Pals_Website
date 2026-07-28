import Contactsection from "@/app/components/Container/Contactsection/Contactsection";
import React from "react";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Pals Holidays for holiday packages, villa bookings, travel assistance, and customer support. We're here to help plan your perfect trip.",

  keywords: [
    "Contact Pals Holidays",
    "Travel Support",
    "Holiday Packages",
    "Villa Booking",
    "Customer Service",
    "Travel Agency Contact",
  ],

  alternates: {
    canonical: "/contact-us",
  },

  openGraph: {
    title: "Contact Us | Pals Holidays",
    description:
      "Contact Pals Holidays for holiday packages, villa bookings, and travel assistance.",
    url: "/contact",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Pals Holidays",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Pals Holidays",
    description:
      "Contact Pals Holidays for holiday packages, villa bookings, and travel assistance.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <Contactsection />;
}