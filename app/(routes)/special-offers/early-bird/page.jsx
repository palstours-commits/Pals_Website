import EarlyBirdOffers from '@/app/components/Container/EarlyBirdOfferSection/EarlyBirdOfferSection';
import React from 'react';

export const metadata = {
  title: 'Early Bird Offers | Exclusive Travel Deals',
  description:
    'Explore our early bird travel offers and enjoy exclusive deals on holiday packages, stays, and unforgettable travel experiences.',
  alternates: {
    canonical: '/special-offers/early-bird',
  },
};

function page() {
  return <EarlyBirdOffers />;
}

export default page;