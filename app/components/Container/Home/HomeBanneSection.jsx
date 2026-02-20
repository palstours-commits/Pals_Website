"use client";
import Image from "next/image";
import MainLayout from "@/app/common/MainLayout";
import { Camera, Search, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import BannerImg1 from "@/app/assets/banner_img.svg";
import BannerImg2 from "@/app/assets/BannerImg2.svg";
import BannerImg3 from "@/app/assets/BannerImg3.svg";
import BannerImg4 from "@/app/assets/BannerImg4.svg";
import icon1 from "@/app/assets/home_icon1.svg";
import icon2 from "@/app/assets/home_icon2.svg";

const slides = [
  {
    image: BannerImg1,
    title: "Live the Moments",
    subtitle: "Love the Journey.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
  {
    image: BannerImg2,
    title: "The World is Too ",
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
    title: "Where Every Trip ",
    subtitle: "Becomes a Story.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
];

const HomeBannerSection = () => {
  return (
    <MainLayout className="relative w-full h-[500px] lg:h-screen p-0">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 4000 }}
        className="h-[500px] lg:h-screen"
      >
        {slides?.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[500px] lg:h-screen">
              <Image
                src={slide.image}
                alt="Hero Banner"
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <Image
                          src={icon1}
                          alt="Google"
                          width={22}
                          height={22}
                        />
                      </div>
                      <div className="w-10 h-10 bg-[#3ED6A1] rounded-full flex items-center justify-center">
                        <Image
                          src={icon2}
                          alt="TripAdvisor"
                          width={22}
                          height={22}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">4.8</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className="fill-white text-white"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <h1 className="font-bold max-w-3xl leading-10 xl:leading-18">
                    {slide.title}
                    <br />
                    {slide.subtitle}
                  </h1>
                  <p className="my-4 md:my-8 text-white/90">{slide.desc}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute z-20 bottom-24 lg:bottom-32 2xl:bottom-40 2xl:left-14 right-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="w-full max-w-xl bg-white rounded-full flex items-center shadow-lg px-2 py-3 md:py-2">
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
    </MainLayout>
  );
};

export default HomeBannerSection;
