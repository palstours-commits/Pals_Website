import EasyEMIHolidayPlansSection from '@/app/components/Container/EmiSection/EmiSection';
import React from 'react';

export const metadata = {
  title: 'Easy EMI Holiday Plans | Book Your Dream Holiday',
  description:
    'Make your dream holiday affordable with easy EMI holiday plans. Explore flexible payment options and book your perfect holiday with ease.',

  alternates: {
    canonical: '/special-offers/emi',
  },
};

function page() {
  return <EasyEMIHolidayPlansSection />;
}

export default page;