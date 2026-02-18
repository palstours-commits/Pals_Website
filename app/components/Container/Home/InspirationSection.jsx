"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Inspiration from "@/app/assets/inspiration.png";
import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";
import { fadeContainer, fadeItem } from "@/app/common/animations";

const blogs = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  img: Inspiration,
  date: "28/11/2025",
  title: "10 European ski destinations you should visit this winter",
}));

const InspirationSection = () => {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const cardWidth = 320;
  const visibleCards = 3;
  const totalDots = Math.ceil(blogs.length / visibleCards);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const index = Math.round(scrollLeft / (cardWidth * visibleCards));
    setActive(index);
  };

  const scrollToIndex = (index) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      left: index * cardWidth * visibleCards,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout className="w-full mb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-x-hidden">
      <motion.div
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h4 variants={fadeItem} className="font-bold text-center mb-8">
          Get inspiration for your next trip
        </motion.h4>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth whitespace-nowrap pb-2"
        >
          {blogs.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeItem}
              className="min-w-[241px] lg:min-w-[400px] shrink-0 text-left will-change-transform translate-z-0"
            >
              <div className="w-full h-44 rounded-xl overflow-hidden mb-3">
                <Image
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs text-gray-500 mb-1">{item.date}</p>

              <p className="text-sm font-medium leading-snug line-clamp-2">
                {item.title}
              </p>

              <button className="mt-3 border border-gray-700 text-xs rounded-full px-4 py-1">
                Know more
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeItem}
          className="flex justify-center gap-2 mt-6 cursor-pointer"
        >
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-[3px] w-10 transition-all ${
                active === i ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default InspirationSection;
