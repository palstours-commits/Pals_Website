"use client";
import Image from "next/image";
import MainLayout from "@/app/common/MainLayout";
import { Camera, Search } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import BannerImg from "@/app/assets/banner_img.svg";
import BannerImg1 from "@/app/assets/BannerImg1.jpg";
import BannerImg2 from "@/app/assets/BannerImg2.jpg";

const slides = [
  {
    image: BannerImg,
    title: "Live the Moments.",
    subtitle: "Love the Journey.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
  {
    image: BannerImg1,
    title: "Explore the World.",
    subtitle: "Create Memories.",
    desc: "Discover unforgettable destinations and experiences.",
    Title: "Explore the World.",
  },
  {
    image: BannerImg2,
    title: "Discover New Places.",
    subtitle: "Embrace Adventures.",
    desc: "Experience the beauty of diverse cultures and landscapes.",
  },
];

const HomeBannerSection = () => {
  return (
    <MainLayout className="relative w-full h-screen p-0">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 4000 }}
        className="h-screen"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              <Image
                src={slide.image}
                alt="Hero Banner"
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8  max-w-7xl mx-auto">
                <div className=" text-white">
                  <h1 className="font-bold max-w-3xl leading-10 xl:leading-16">
                    {slide.title}
                    <br />
                    {slide.subtitle}
                  </h1>

                  <p className="my-4 md:my-8 text-white/90">{slide.desc}</p>

                  <div className="w-full max-w-[90%] md:max-w-xl bg-white rounded-full flex items-center shadow-lg px-2 py-3 md:py-2">
                    <Camera size={20} className="text-gray-500 ml-2" />
                    <input
                      type="text"
                      placeholder="Where do you want to go"
                      className="flex-1 px-3 outline-none text-sm text-gray-600"
                    />
                    <button className="bg-red-600 h-9 w-9 rounded-full flex items-center justify-center">
                      <Search size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </MainLayout>
  );
};

export default HomeBannerSection;
