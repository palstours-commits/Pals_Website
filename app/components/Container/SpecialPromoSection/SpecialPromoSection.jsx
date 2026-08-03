import React from 'react'
import banner from "@/app/assets/Special-Offers-banner.png";
import worldbg from "@/app/assets/world-bg.png";
import MainLayout from '@/app/common/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

function SpecialPromoSection() {
    const offers = [
        {
            title: "Early Bird Offers",
            href: "/special-offers/early-bird",
            className: "top-4 left-6",
        },
        {
            title: "Easy EMI Holiday Plans",
            href: "/special-offers/emi",
            className: "top-32 right-0",
        },
        {
            title: "Group Tour Offers",
            href: "/special-offers/group-tours",
            className: "bottom-35 left-0",
        },
        {
            title: "Special Promotional Offers",
            href: "/special-offers/special-promo",
            className: "bottom-4 right-0",
        },
    ];
    return (
        <MainLayout>
            <div className="bg-gradient-to-r from-[#FFEFEF] to-[#FFE5E3] py-3 md:py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl md:text-4xl font-bold text-red-600">
                                Special Offers
                            </h4>
                            <p className="mt-1 md:mt-2 text-gray-900 text-base md:text-lg font-semibold">
                                Exclusive Travel Deals from Pals Holidays
                            </p>
                        </div>
                        <div>
                            <Image
                                src={banner}
                                alt="Special Offers Banner"
                                className="w-40 md:w-90 h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative my-8 md:my-10  md:py-20">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={worldbg}
                        alt="World Map"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-white/50"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-5">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <p className="text-base md:text-lg  text-gray-800 bg-white/80 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
                                At Pals Holidays India Pvt. Ltd., we are committed to making your
                                travel dreams a reality with exceptional value and unmatched
                                service.
                                Discover our exclusive holiday offers, thoughtfully designed to
                                provide greater savings, flexible payment options, and memorable
                                travel experiences. Whether you're planning a family vacation,
                                honeymoon, pilgrimage, leisure getaway, or corporate tour, our
                                special offers ensure you enjoy more while spending less.
                            </p>
                        </div>
                        <div className="order-1 lg:order-2 flex justify-center">
                            <div className="relative w-[360px] h-[430px]">
                                <svg
                                    className="absolute inset-0 w-full h-full pointer-events-none"
                                    viewBox="0 0 360 430"
                                    fill="none"
                                >
                                    {/* Early Bird -> EMI */}
                                    <path
                                        d="M95 40 C250 40 290 110 300 150"
                                        stroke="#F87171"
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                        fill="none"
                                    />

                                    {/* Group -> EMI */}
                                    <path
                                        d="M60 250 C130 180 220 180 260 170"
                                        stroke="#F87171"
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                        fill="none"
                                    />

                                    {/* Group -> Promo */}
                                    <path
                                        d="M90 275 C210 275 250 330 270 390"
                                        stroke="#F87171"
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                        fill="none"
                                    />
                                </svg>

                                {offers.map((offer) => (
                                    <Link
                                        key={offer.href}
                                        href={offer.href}
                                        className={`absolute ${offer.className}`}
                                    >
                                        <button className="bg-[#DA251C] text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition cursor-pointer">
                                            {offer.title}
                                        </button>
                                    </Link>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default SpecialPromoSection