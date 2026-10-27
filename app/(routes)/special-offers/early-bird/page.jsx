import EarlyBirdOffers from '@/app/components/Container/EarlyBirdOfferSection/EarlyBirdOfferSection';
import React from 'react';

export const metadata = {
  title: 'Early Bird Travel Deals | Book Early & Save More',
  description: 'Plan your trip early and grab massive discounts on holiday packages. Book early with Pals Holidays and save big on your next vacation.',
  keywords: ['Early bird holiday offers', 'Advance booking discount travel', 'Cheap holiday packages India'],
  alternates: {
    canonical: '/special-offers/early-bird',
  },
  openGraph: {
    title: 'Early Bird Travel Deals | Book Early & Save More | Pals Holidays',
    description: 'Plan your trip early and grab massive discounts on holiday packages.',
    url: '/special-offers/early-bird',
    locale: 'en_IN',
    type: 'website',
  },
};

function page() {
  return <EarlyBirdOffers />;
}

export default page;