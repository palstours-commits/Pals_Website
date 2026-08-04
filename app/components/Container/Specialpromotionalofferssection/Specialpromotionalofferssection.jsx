"use client";
import React from "react";
import banner from "@/app/assets/specialPromotionalOffer-banner.png";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const fadeInUpSmall = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <div className="w-full bg-white">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="bg-gradient-to-r from-[#FFEFEF] to-[#FFE5E3] py-3 md:py-16"
            >
                <div className="max-w-7xl mx-auto px-4 md:px-5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                        <motion.div
                            variants={fadeInUp}
                            className="text-center md:text-left"
                        >
                            <motion.h2
                                variants={fadeInUp}
                                className="text-2xl md:text-4xl font-bold text-red-600"
                            >
                                Special Promotional Offers
                            </motion.h2>
                            <motion.p
                                variants={fadeInUp}
                                className="mt-1 md:mt-2 text-gray-900 text-base md:text-lg font-semibold"
                            >
                                Limited-Time Deals. Unlimited Experiences.
                            </motion.p>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <Image
                                src={banner}
                                alt="Special Promotional Offers Banner"
                                className="w-40 md:w-90 h-auto"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 md:px-5 py-10 md:py-16"
            >
                <motion.p
                    variants={fadeInUp}
                    className="text-gray-700 text-sm md:text-base leading-relaxed"
                >
                    Discover exciting seasonal promotions and exclusive holiday deals
                    available for a limited period. Our Special Promotional Offers are
                    carefully curated to provide exceptional value across a wide range
                    of travel experiences.
                </motion.p>

                <motion.h4
                    variants={fadeInUp}
                    className="mt-6 text-base md:text-lg font-semibold text-gray-900"
                >
                    Offer Highlights
                </motion.h4>

                <motion.ul
                    variants={staggerContainer}
                    className="mt-3 space-y-1.5 list-disc list-inside text-gray-700 text-sm md:text-base"
                >
                    {HIGHLIGHTS.map((item) => (
                        <motion.li key={item} variants={fadeInUpSmall}>
                            {item}
                        </motion.li>
                    ))}
                </motion.ul>

                <motion.p
                    variants={fadeInUp}
                    className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed"
                >
                    Book early, travel smart, and enjoy exceptional savings on your
                    next adventure.
                </motion.p>

                <motion.div variants={fadeInUp}>
                    <Link href="/contact-us" className="cursor-pointer">
                        <button
                            type="button"
                            className="mt-6 bg-[#e02020] hover:bg-[#c81c1c] transition-colors text-white text-sm font-semibold px-6 py-3 rounded-md"
                        >
                            Book Now
                        </button>
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="bg-[#f4f4f4] px-4 md:px-5 py-10 md:py-16"
            >
                <motion.div
                    variants={staggerContainer}
                    className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-5"
                >
                    <motion.h3
                        variants={fadeInUp}
                        className="text-center text-base md:text-lg font-semibold text-gray-900 mb-4"
                    >
                        Traveller&apos;s Question Guide
                    </motion.h3>

                    <motion.div
                        variants={staggerContainer}
                        className="divide-y divide-gray-200"
                    >
                        {FAQS.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <motion.div
                                    key={faq.question}
                                    variants={fadeInUpSmall}
                                    className="py-3"
                                >
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
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="mt-2 text-sm text-gray-600 leading-relaxed"
                                        >
                                            {faq.answer}
                                        </motion.p>
                                    )}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SpecialPromotionalOffersSection;