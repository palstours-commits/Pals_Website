"use client";
import Image from "next/image";
import MainLayout from "@/app/common/MainLayout";
import { Camera, Search } from "lucide-react";
import BannerImg from "@/app/assets/banner_img.svg";

const HomeBannerSection = () => {
  return (
    <MainLayout className="relative w-full h-screen">
      <Image
        src={BannerImg}
        alt="Hero Banner"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 h-full flex items-center px-4 md:px-30">
        <div className="container mx-auto">
          <h1 className="text-white  font-bold max-w-2xl leading-10 xl:leading-16">
            Live the Moments.
            <br />
            Love the Journey.
          </h1>
          <p className="text-white/90 my-4 md:my-8 ">
            Plan your dream escape — mountains, beaches, cities & more!
          </p>
          <div className="w-full max-w-[90%] md:max-w-xl  bg-white rounded-full flex items-center shadow-lg px-2 py-3 md:py-2">
            <Camera
              size={20}
              className="text-gray-500 ml-2  md:size-[18]"
            />
            <input
              type="text"
              placeholder="Where do you want to go"
              className="flex-1 px-2 md:px-3 outline-none text-xs md:text-sm text-gray-600"
            />
            <button className="bg-red-600 h-8 w-8 md:h-9 md:w-9 rounded-full hidden md:flex items-center justify-center">
              <Search size={14} className="text-white md:size-[16]" />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeBannerSection;
