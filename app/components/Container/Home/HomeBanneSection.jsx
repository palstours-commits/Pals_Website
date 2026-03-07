"use client";
import BannerImg1 from "@/app/assets/banner_img.svg";
import BannerImg2 from "@/app/assets/BannerImg2.svg";
import BannerImg3 from "@/app/assets/BannerImg3.svg";
import BannerImg4 from "@/app/assets/BannerImg4.svg";
import BannerImg5 from "@/app/assets/BannerImg5.svg";
import MainLayout from "@/app/common/MainLayout";
import SearchBar from "@/app/common/SearchBar";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  {
    image: BannerImg1,
    title: "Live the Moments",
    subtitle: "Love the Journey.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
  {
    image: BannerImg2,
    title: "The World is Too",
    subtitle: "Big to Stay Home.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
  {
    image: BannerImg3,
    title: "Go Somewhere You’ve",
    subtitle: "Never Felt Before.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
  {
    image: BannerImg4,
    title: "Where Every Trip",
    subtitle: "Becomes a Story.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
  {
    image: BannerImg5,
    title: "Pack Your Bags",
    subtitle: "We’ll Handle the Rest.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3
    }
  }
};

const HomeBannerSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[activeIndex || 0];

  return (
    <MainLayout className="relative w-full h-[420px] lg:h-[90vh] p-0 overflow-hidden">
      {/* Swiper without invalid props */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        grabCursor={true}
        loop={true}
        speed={1800}
        autoplay={{ 
          delay: 4500, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => 
            `<span class="${className} bg-gradient-to-r from-emerald-400/80 via-white/60 to-blue-400/80 w-3 h-3 rounded-full shadow-2xl backdrop-blur-xl transition-all duration-700 hover:scale-175 hover:rotate-360"></span>`
        }}
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-[420px] lg:h-[90vh] !static"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <motion.div 
              className="relative w-full h-full rounded-4xl overflow-hidden shadow-3xl group backdrop-blur-sm"
              initial={{ scale: 1.1, filter: "blur(10px)" }}
              animate={{ 
                scale: activeIndex === index ? 1.02 : 1.15,
                filter: activeIndex === index ? "blur(0px)" : "blur(15px)",
                brightness: activeIndex === index ? 1 : 0.7
              }}
              transition={{ 
                duration: 2, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={slide.image}
                alt={`Banner ${index + 1}`}
                fill
                sizes="100vw"
                priority={index === 0 || index === 1 || index === 2}
                quality={90}
                className="object-cover transition-all duration-2000 group-hover:scale-[1.15] origin-center"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent/40 to-black/60" />
              
              {/* Radial Gradient Effect */}
              <motion.div 
                className="absolute inset-0 opacity-75"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 50%)"
                }}
              />
              
              {/* Multi-layer Glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/15 to-purple-500/20 rounded-4xl blur-3xl"
                animate={{ 
                  scale: activeIndex === index ? 1.2 : 1,
                  opacity: activeIndex === index ? 1 : 0.3,
                  rotate: activeIndex === index ? 360 : 0
                }}
                transition={{ 
                  duration: 3,
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content Layer */}
      <motion.div 
        className="absolute inset-0 z-30 flex items-center pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full pointer-events-auto">
          <motion.div className="text-white max-w-5xl" variants={staggerContainer}>
            
            {/* HERO TITLE */}
            <motion.div variants={textVariants}>
              <motion.h1 
                className="font-black leading-[0.88] text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-[-0.04em] bg-gradient-to-r from-white via-emerald-50 to-blue-100 bg-clip-text text-transparent mb-8 lg:mb-12 drop-shadow-4xl"
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  initial={{ opacity: 0, scaleX: 0.3 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  className="inline-block"
                >
                  {activeSlide.title}
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, scaleX: 0.3 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 1 }}
                  className="inline-block"
                >
                  {activeSlide.subtitle}
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p 
              variants={textVariants}
              className="mt-8 mb-12 text-xl lg:text-2xl xl:text-3xl text-white/95 leading-relaxed max-w-4xl font-light tracking-wide backdrop-blur-sm"
            >
              {activeSlide.desc}
            </motion.p>

            <motion.div variants={textVariants} className="mb-12">
              <SearchBar />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        .shadow-neon-glow {
          box-shadow: 
            0 0 40px rgba(6, 78, 59, 0.8),
            0 0 80px rgba(6, 78, 59, 0.4),
            0 0 120px rgba(59, 130, 246, 0.3),
            inset 0 0 40px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </MainLayout>
  );
};

export default HomeBannerSection;