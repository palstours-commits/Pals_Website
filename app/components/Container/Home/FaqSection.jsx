"use client";

import MainLayout from "@/app/common/MainLayout";
import React from "react";
import { motion } from "framer-motion";

function FaqSection() {
    const [openIndex, setOpenIndex] = React.useState(0);

    const toggleFaq = (index) => {
        setOpenIndex((prev) => (prev === index ? -1 : index));
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const fadeInUp = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const fadeInUpSmall = {
        hidden: {
            opacity: 0,
            y: 15,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    const FAQS = [
        {
            question: "Why Book with Pals Holidays?",
            answer:
                "At Pals Holidays, we believe every journey should be seamless, memorable, and value-driven. Our experienced travel professionals are dedicated to delivering personalized service and carefully crafted holiday experiences that exceed expectations.",
        },
        {
            question: "Why Travellers Choose Us?",
            answer:
                "Trusted Travel Experts offering customized domestic & international holiday packages, competitive pricing, quality hotels, comfortable transportation, secure bookings, personalized tour planning, reliable customer support, and a commitment to customer satisfaction.",
        },
        {
            question: "Your Journey Begins Here",
            answer:
                "Whether you’re planning your next family vacation, honeymoon, pilgrimage, luxury escape, or international adventure, Pals Holidays is here to make every moment unforgettable.",
        },
    ];

    return (
        <MainLayout>
            <section className="w-full bg-[#f4f4f4] py-10 md:py-20">
                <div className="w-full px-5 sm:px-6 md:px-8 lg:px-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        variants={fadeInUp}
                        className="w-full max-w-7xl mx-auto"
                    >
                        <motion.div
                            variants={staggerContainer}
                            className="w-full bg-white rounded-lg shadow-sm px-5 py-6 md:px-8 md:py-8"
                        >
                            <motion.h4
                                variants={fadeInUp}
                                className="text-center text-base md:text-lg font-semibold text-gray-900 mb-5 md:mb-6"
                            >
                                Traveller&apos;s Question Guide
                            </motion.h4>

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
                                            className="py-4"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggleFaq(index)}
                                                className="w-full flex items-center justify-between gap-4 text-left focus:outline-none"
                                            >
                                                <span className="text-sm md:text-base font-medium text-gray-900">
                                                    {faq.question}
                                                </span>

                                                <span
                                                    className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full border border-gray-300 text-gray-500 text-xl leading-none transition-transform duration-300 ${isOpen
                                                        ? "rotate-90"
                                                        : ""
                                                        }`}
                                                >
                                                    ›
                                                </span>
                                            </button>
                                            {isOpen && faq.answer && (
                                                <motion.p
                                                    initial={{
                                                        opacity: 0,
                                                        height: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        height: "auto",
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: "easeOut",
                                                    }}
                                                    className="mt-3 pr-8 text-sm md:text-base text-gray-600 leading-relaxed"
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
            </section>
        </MainLayout>
    );
}

export default FaqSection;