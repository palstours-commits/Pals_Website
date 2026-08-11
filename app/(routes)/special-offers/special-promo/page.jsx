import SpecialPromotionalOffersSection from '@/app/components/Container/Specialpromotionalofferssection/Specialpromotionalofferssection';
import React from 'react';

export const metadata = {
    title: 'Special Promotional Offers | Exclusive Holiday Deals',
    description:
        'Discover special promotional offers on holiday packages, travel deals, and memorable getaways. Explore exclusive offers and plan your next holiday at great prices.',
    alternates: {
        canonical: 'special-offers/special-promo',
    },
};

function page() {
    return <SpecialPromotionalOffersSection />;
}

export default page;