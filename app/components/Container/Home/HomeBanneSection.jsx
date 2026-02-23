"use client";
import Image from "next/image";
import MainLayout from "@/app/common/MainLayout";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import BannerImg1 from "@/app/assets/banner_img.svg";
import BannerImg2 from "@/app/assets/BannerImg2.svg";
import BannerImg3 from "@/app/assets/BannerImg3.svg";
import BannerImg4 from "@/app/assets/BannerImg4.svg";
import BannerImg5 from "@/app/assets/BannerImg5.svg";
import icon1 from "@/app/assets/home_icon1.svg";
import icon2 from "@/app/assets/home_icon2.svg";

import SearchBar from "@/app/common/SearchBar";
import { useState } from "react";

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

const HomeBannerSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  return (
    <MainLayout className="relative w-full h-[500px] lg:h-screen p-0 overflow-hidden">
      <div className="absolute inset-0 z-20 flex items-end md:items-center">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-white max-w-3xl">
            <div className="flex items-center gap-4 mb-2 md:mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Image src={icon1} alt="Google" width={22} height={22} />
                </div>
                <div className="w-10 h-10 bg-[#3ED6A1] rounded-full flex items-center justify-center">
                  <Image src={icon2} alt="TripAdvisor" width={22} height={22} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-2xl font-bold">4.8</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-white text-white" />
                  ))}
                </div>
              </div>
            </div>
            <h1 className="font-bold leading-tight text-3xl sm:text-4xl lg:text-5xl">
              {activeSlide.title}
              <br />
              {activeSlide.subtitle}
            </h1>
            <p className="mt-3 mb-4 md:mb-6 text-white/90">
              {activeSlide.desc}
            </p>
            <SearchBar />
          </div>
        </div>
      </div>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-[500px] lg:h-screen"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image
              src={slide.image}
              alt="Hero Banner"
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </SwiperSlide>
        ))}
      </Swiper>
    </MainLayout>
  );
};

export default HomeBannerSection;
