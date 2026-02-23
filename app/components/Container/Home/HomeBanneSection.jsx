"use client";
import Image from "next/image";
import MainLayout from "@/app/common/MainLayout";
import { Camera, Search, Star } from "lucide-react";
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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (
    <MainLayout className="relative w-full h-[500px] lg:h-screen p-0">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
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
                priority={index === 0}
                sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 100vw,
    100vw
  "
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-white max-w-3xl">
                  <div className="flex items-center gap-4 mb-2 md:mb-4">
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
                      <span className="text-lg md:text-2xl font-bold">4.8</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className="fill-white text-white"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <h1 className="font-bold leading-tight text-3xl sm:text-4xl lg:text-5xl">
                    {slide.title}
                    <br />
                    {slide.subtitle}
                  </h1>
                  <p className="mt-3 mb-4 md:mb-6 text-white/90">
                    {slide.desc}
                  </p>
                  <div
                    onClick={() => router.push("/search")}
                    className="bg-white rounded-full flex items-center gap-4 shadow-xl
  cursor-pointer
  mb-6 md:mb-0
  px-5 sm:px-6
  py-1 md:py-3
  max-w-xl"
                  >
                    <Camera size={18} className="text-gray-500 shrink-0" />

                    <input
                      type="text"
                      readOnly
                      placeholder="Where do you want to go?"
                      className="flex-1 outline-none text-sm sm:text-base text-gray-700 bg-transparent cursor-pointer"
                    />

                    <div className="bg-red-600 h-9 w-9 rounded-full flex items-center justify-center">
                      <Search size={16} className="text-white" />
                    </div>
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
