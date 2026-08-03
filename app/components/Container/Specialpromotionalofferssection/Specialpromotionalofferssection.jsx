"use client";
import React from "react";
import banner from "@/app/assets/specialPromotionalOffer-banner.png";
import Image from "next/image";
import Link from "next/link";

const HIGHLIGHTS = [
    "Seasonal Holiday Discounts",
    "Festival & Long Weekend Packages",
    "Flash Sale Offers",
    "Honeymoon Specials",
    "Family Vacation Deals",
    "Complimentary Value-Added Services on Selected Packages",
    "Exclusive Online Booking Offers",
];

const FAQS = [
    {
        question: "Why Book with Pals Holidays?",
        answer:
            "At Pals Holidays, we believe every journey should be seamless, memorable, and value-driven. Our experienced travel professionals are dedicated to delivering personalized service and carefully crafted holiday experiences that exceed expectations.",
    },
    {
        question: "Why Travellers Choose Us?",
        answer:
            "We are committed to providing exceptional travel experiences, backed by our extensive industry knowledge, strong supplier relationships, and a passion for creating unforgettable memories for our clients.",
    },
    {
        question: "Your Journey Begins Here",
        answer:
            "Whether you are seeking a relaxing beach getaway, an adventurous trek, or a cultural exploration, Pals Holidays is your trusted partner in crafting the perfect holiday experience.",
    },
];

const SpecialPromotionalOffersSection = () => {
    const [openIndex, setOpenIndex] = React.useState(0);

    const toggleFaq = (index) => {
        setOpenIndex((prev) => (prev === index ? -1 : index));
    };

    return (
        <div className="w-full bg-white">
            <div className="bg-gradient-to-r from-[#FFEFEF] to-[#FFE5E3] py-3 md:py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl md:text-4xl font-bold text-red-600">
                                Special Promotional Offers
                            </h4>
                            <p className="mt-1 md:mt-2 text-gray-900 text-base md:text-lg font-semibold">
                                Limited-Time Deals. Unlimited Experiences.
                            </p>
                        </div>
                        <div>
                            <Image
                                src={banner}
                                alt="Special Promotional Offers Banner"
                                className="w-40 md:w-90 h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-5 py-10 md:py-16">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    Discover exciting seasonal promotions and exclusive holiday deals
                    available for a limited period. Our Special Promotional Offers are
                    carefully curated to provide exceptional value across a wide range
                    of travel experiences.
                </p>

                <h4 className="mt-6 text-base md:text-lg font-semibold text-gray-900">
                    Offer Highlights
                </h4>

                <ul className="mt-3 space-y-1.5 list-disc list-inside text-gray-700 text-sm md:text-base">
                    {HIGHLIGHTS.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <p className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed">
                    Book early, travel smart, and enjoy exceptional savings on your
                    next adventure.
                </p>

                <Link href="/contact-us" className="cursor-pointer">
                    <button
                        type="button"
                        className="mt-6 bg-[#e02020] hover:bg-[#c81c1c] transition-colors text-white text-sm font-semibold px-6 py-3 rounded-md"
                    >
                        Book Now
                    </button>
                </Link>
            </div>

            <div className="bg-[#f4f4f4] px-4 md:px-5 py-10 md:py-16">
                <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-5">
                    <h3 className="text-center text-base md:text-lg font-semibold text-gray-900 mb-4">
                        Traveller&apos;s Question Guide
                    </h3>

                    <div className="divide-y divide-gray-200">
                        {FAQS.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={faq.question} className="py-3">
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between text-left"
                                    >
                                        <span className="text-sm md:text-base font-medium text-gray-900">
                                            {faq.question}
                                        </span>
                                        <span className="text-gray-500 text-lg leading-none">
                                            {isOpen ? "\u2039" : "\u203A"}
                                        </span>
                                    </button>
                                    {isOpen && faq.answer && (
                                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialPromotionalOffersSection;