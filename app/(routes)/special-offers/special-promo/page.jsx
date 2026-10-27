import SpecialPromotionalOffersSection from '@/app/components/Container/Specialpromotionalofferssection/Specialpromotionalofferssection';
import React from 'react';

export const metadata = {
  title: "Special Tour Offers & Holiday Discount Deals",
  description:
    "Looking for the best travel deals? Explore our special promotional offers on holiday packages and getaways. Grab discounted prices today.",
  keywords: [
    "Special travel discounts",
    "Holiday package promo codes",
    "Best vacation deals India",
  ],
  alternates: {
    canonical: "/special-offers/special-promo",
  },
  openGraph: {
    title: "Special Tour Offers & Holiday Discount Deals | Pals Holidays",
    description:
      "Explore our special promotional offers on holiday packages and getaways.",
    url: "/special-offers/special-promo",
    locale: "en_IN",
    type: "website",
  },
};

function page() {
    return <SpecialPromotionalOffersSection />;
}

export default page;