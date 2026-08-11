import GroupTourOffersSection from '@/app/components/Container/Grouptourofferssection/Grouptourofferssection';
import React from 'react';

export const metadata = {
  title: 'Group Tour Offers | Affordable Group Travel Packages',
  description:
    'Explore our group tour offers and enjoy affordable holiday packages, exciting destinations, and memorable group travel experiences.',

  alternates: {
    canonical: 'special-offers/group-tours',
  },
};

function page() {
  return <GroupTourOffersSection />;
}

export default page;