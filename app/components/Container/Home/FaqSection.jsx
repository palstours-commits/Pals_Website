"use client"
import MainLayout from '@/app/common/MainLayout'
import React from 'react'
import { motion } from 'framer-motion'

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
                delayChildren: 0.1
            }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
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
                "Whether you’re planning your next family vacation, honeymoon, pilgrimage, luxury escape, or international adventure, Pals Holidays is here to make every moment unforgettable",
        },
    ];
    return (
        <MainLayout>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="bg-[#f4f4f4] px-5 py-10 md:py-16"
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
        </MainLayout>
    )
}

export default FaqSection