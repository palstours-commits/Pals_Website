"use client";
import BannerImg2 from "@/app/assets/BannerImageKashmir.png";
import BannerImg3 from "@/app/assets/BannerImageKerla.png";
import BannerImg4 from "@/app/assets/BannerImageIndia1.png";
import BannerImg5 from "@/app/assets/WildLifeImage.png";
import BannerImg6 from "@/app/assets/BannerInternational.png";
import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Mobile1 from "@/app/assets/Hero_MobileImages/Mobile1.png";
import Mobile2 from "@/app/assets/Hero_MobileImages/Mobile2.png";
import Mobile3 from "@/app/assets/Hero_MobileImages/Mobile3.png";
import Mobile4 from "@/app/assets/Hero_MobileImages/Mobile4.png";
import Mobile5 from "@/app/assets/Hero_MobileImages/Mobile5.png"

const slides = [
  {
    desktop: BannerImg4,
    mobile: Mobile5,
  },
  {
    desktop: BannerImg2,
    mobile: Mobile1,
  },
  {
    desktop: BannerImg3,
    mobile: Mobile2,
  },
  {
    desktop: BannerImg5,
    mobile: Mobile3,
  },
  {
    desktop: BannerImg6,
    mobile: Mobile4,
  },
];


const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const HomeBannerSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = useMemo(() => slides[activeIndex] ?? slides[0], [activeIndex]);


  return (
    <MainLayout className="relative w-full h-[420px] lg:h-[90vh] p-0 z-10">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          grabCursor={false}
          loop
          speed={1600}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: false }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (_, className) =>
              `<span class="${className} bg-white/60 w-3 h-3 rounded-full shadow transition-all duration-500"></span>`,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full w-full"
          allowTouchMove={false}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full overflow-hidden">
                <>
                  <Image
                    src={slide.desktop}
                    alt={`Desktop Banner ${index + 1}`}
                    fill
                    priority={index < 2}
                    quality={85}
                    sizes="100vw"
                    className="hidden md:block object-cover"
                  />

                  <Image
                    src={slide.mobile}
                    alt={`Mobile Banner ${index + 1}`}
                    fill
                    priority={index < 2}
                    quality={85}
                    sizes="100vw"
                    className="block md:hidden object-cover"
                  />
                </>
                <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/55" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <motion.div
        className="absolute inset-0 z-30 flex items-center pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="px-4  max-w-7xl mx-auto w-full pointer-events-auto">
          <motion.div className="text-white max-w-5xl" variants={staggerContainer}>
            <motion.div variants={textVariants}>
              <motion.h1
                key={activeIndex}
                className="font-black  text-5xl sm:text-7xl  bg-gradient-to-r from-white via-emerald-50 to-blue-100 bg-clip-text text-transparent mb-6 drop-shadow-4xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-block">{activeSlide.title}</span>
                <br />
                <span className="inline-">{activeSlide.subtitle}</span>
              </motion.h1>
            </motion.div>
            <motion.p
              key={`desc-${activeIndex}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className=" mb-8 text-lg sm:text-xl text-white/95 leading-relaxed max-w-2xl font-light tracking-wide"
            >
              {activeSlide.desc}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default HomeBannerSection;