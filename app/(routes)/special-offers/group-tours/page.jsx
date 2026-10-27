import GroupTourOffersSection from '@/app/components/Container/Grouptourofferssection/Grouptourofferssection';
import React from 'react';

export const metadata = {
  title: "Group Tour Packages | Best Deals for Family & Friends",
  description:
    "Traveling with family or friends? Check out our budget-friendly group tour packages with fun itineraries, comfortable stays, and great group discounts.",
  keywords: [
    "Group tour packages from Chennai",
    "Family group holiday trips",
    "Friends vacation packages India",
  ],
  alternates: {
    canonical: "/special-offers/group-tours",
  },
  openGraph: {
    title:
      "Group Tour Packages | Best Deals for Family & Friends | Pals Holidays",
    description:
      "Check out our budget-friendly group tour packages with fun itineraries.",
    url: "/special-offers/group-tours",
    locale: "en_IN",
    type: "website",
  },
};

function page() {
  return <GroupTourOffersSection />;
}

export default page;