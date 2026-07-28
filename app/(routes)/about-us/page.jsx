import AboutSection from "@/app/components/Container/AboutSection/AboutSection";
import React from "react";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Pals Holidays, our mission, travel expertise, luxury villa bookings, and commitment to creating unforgettable holiday experiences.",

  keywords: [
    "About Pals Holidays",
    "Travel Company",
    "Holiday Packages",
    "Luxury Villas",
    "Vacation Planning",
  ],

  alternates: {
    canonical: "/about-us",
  },

  openGraph: {
    title: "About Us | Pals Holidays",
    description:
      "Learn about Pals Holidays and our travel services.",
    url: "/about-us",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Pals Holidays",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us | Pals Holidays",
    description:
      "Learn about Pals Holidays and our travel services.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <AboutSection />;
}