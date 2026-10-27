import AboutSection from "@/app/components/Container/AboutSection/AboutSection";
import React from "react";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Pals Holidays, our travel expertise, customized tour operations, and commitment to creating unforgettable domestic and international trips.",
  keywords: [
    "About Pals Holidays",
    "Travel Company Chennai",
    "Holiday Tour Operators India",
    "Travel Planners",
  ],
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "About Us | Pals Holidays",
    description:
      "Learn about Pals Holidays and our trusted travel planning services.",
    url: "/about-us",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Pals Holidays",
    description: "Learn about Pals Holidays and our travel services.",
  },
};

export default function Page() {
  return <AboutSection />;
}
