"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PackageBanner = ({ bgimg, images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const bannerImages = images.length > 0 ? images : (bgimg ? [bgimg] : []);

  useEffect(() => {
    if (bannerImages.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerImages.length, isHovered]);

  if (bannerImages.length === 0) {
    return (
      <div
        className="relative w-full"
        style={{
          aspectRatio: "16 / 5",
          backgroundColor: "#f3f4f6",
        }}
      />
    );
  }

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50"
      style={{
        aspectRatio: "16 / 5",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background - FULL coverage */}
      <motion.div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url(${encodeURI(bannerImages[(activeIndex + 2) % bannerImages.length] || bannerImages[0])})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* 🔥 ZERO GAP GRID - Full edge coverage */}
      <div className="grid grid-cols-12 grid-rows-6 h-full bg-transparent !m-0 !p-0">
        
        {/* MAIN IMAGE - PERFECT edge-to-edge */}
        <motion.div
          key={`main-${activeIndex}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-7 row-span-6 rounded-l-3xl overflow-hidden shadow-2xl border-r-4 border-white/90 relative z-20 hover:shadow-3xl hover:border-r-blue-400/90 transition-all duration-300"
          style={{ margin: 0, padding: 0 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div
            className="w-full h-full absolute inset-0"
            style={{
              backgroundImage: `url(${encodeURI(bannerImages[activeIndex])})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          
          {/* Counter Badge */}
          <motion.div 
            className="absolute top-4 right-4 w-14 h-14 bg-gradient-to-r from-red-800 to-red-500 text-white rounded-3xl flex items-center justify-center text-xl font-black shadow-2xl border-4 border-white z-10"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            {activeIndex + 1}
          </motion.div>
        </motion.div>

        {/* TOP RIGHT - NO GAP */}
        <motion.div
          className="col-span-5 row-span-3 rounded-tr-3xl overflow-hidden shadow-2xl border-b-2 border-white/90 hover:border-b-orange-400/90 relative z-10"
          style={{
            backgroundImage: `url(${encodeURI(bannerImages[(activeIndex + 1) % bannerImages.length])})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: 0,
            padding: 0,
          }}
          whileHover={{ scale: 1.02, y: -2 }}
        />

        {/* BOTTOM RIGHT - NO GAP */}
        <motion.div
          className="col-span-5 row-span-3 rounded-br-3xl overflow-hidden shadow-2xl border-t-2 border-white/90 hover:border-t-purple-400/90 relative z-10"
          style={{
            backgroundImage: `url(${encodeURI(bannerImages[(activeIndex + 3) % bannerImages.length])})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: 0,
            padding: 0,
          }}
          whileHover={{ scale: 1.02, y: -2 }}
        />

      </div>

      {/* Navigation - Perfect positioning */}
      <motion.button
        onClick={() => setActiveIndex(prev => (prev - 1 + bannerImages.length) % bannerImages.length)}
        className="absolute -left-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl flex items-center justify-center text-gray-800 font-bold text-2xl hover:bg-white hover:shadow-3xl active:scale-95 transition-all z-30 border-2 border-white/80"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        ‹
      </motion.button>

      <motion.button
        onClick={() => setActiveIndex(prev => (prev + 1) % bannerImages.length)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl flex items-center justify-center text-gray-800 font-bold text-2xl hover:bg-white hover:shadow-3xl active:scale-95 transition-all z-30 border-2 border-white/80"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        ›
      </motion.button>

      {/* Dots - Perfect bottom center */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-white/98 backdrop-blur-2xl px-8 py-3 rounded-3xl shadow-2xl border border-gray-200/50 z-30">
        {bannerImages.slice(0, 8).map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer shadow-md ${
              activeIndex === i 
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 scale-140 shadow-lg' 
                : 'bg-gray-300 hover:bg-gray-400 hover:scale-130'
            }`}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.1 }}
          />
        ))}
      </div>

      {/* Mobile Only - 2 small images below main */}
      <div className="block lg:hidden absolute bottom-20 left-4 right-4 grid grid-cols-2 gap-2">
        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl h-20 border-2 border-white/80"
          style={{
            backgroundImage: `url(${encodeURI(bannerImages[(activeIndex + 2) % bannerImages.length])})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          whileHover={{ scale: 1.05 }}
        />
        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl h-20 border-2 border-white/80"
          style={{
            backgroundImage: `url(${encodeURI(bannerImages[(activeIndex + 4) % bannerImages.length])})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          whileHover={{ scale: 1.05 }}
        />
      </div>
    </div>
  );
};

export default PackageBanner;
