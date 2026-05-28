import ZoneSection from '@/app/components/Container/ZoneSection/ZoneSection';
import React from 'react'

async function page({ params }) {
    const { menu } = await params
    return (
        <ZoneSection menu={menu} />
    )
}


export default page
