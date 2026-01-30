"use client";
import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import South from "@/app/assets/south.png";
import North from "@/app/assets/north.png";
import NorthEast from "@/app/assets/northeast.png";
import Andaman from "@/app/assets/andhaman.png";
import Kashmir from "@/app/assets/kashmir.png";
import Himachal from "@/app/assets/himachal.png";
import MainLayout from "@/app/common/MainLayout";

const tabs = [
  "India Holidays",
  "International",
  "Domestic",
  "India on Wheels",
  "Hill Stations",
  "Ayurveda & Yoga Retreats",
  "Spiritual Tours",
];

const cards = [
  { title: "South India", img: South, isNew: true },
  { title: "North India", img: North },
  { title: "North East India", img: NorthEast },
  { title: "Andaman", img: Andaman },
  { title: "Kashmir", img: Kashmir },
  { title: "Himachal", img: Himachal },
];

const HolidayPlanner = () => {
  const sliderRef = useRef(null);
  const scroll = (dir) => {
    sliderRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout className="px-6 md:px-30 py-20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold leading-tight">
          Quick and easy <br /> Holiday Trip Planner
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[#da251c] font-medium border-[#da251c] hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-6 h-6 rounded-lg border-2 border-gray-300 text-gray-300 flex items-center justify-center  hover:bg-red-600 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-6 text-sm scrollbar-hide">
        {tabs?.map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              i === 0 ? "bg-red-100 text-red-600 border-[#da251c] border" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        ref={sliderRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide"
      >
        {cards?.map((item, i) => (
          <div
            key={i}
            className="relative min-w-[220px] h-[300px] rounded-xl overflow-hidden"
          >
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover"
            />
            {item.isNew && (
              <span className="absolute top-0 left-0 bg-yellow-400 text-[10px] px-2 py-1 rounded font-semibold">
                NEW
              </span>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <h5 className="absolute bottom-4 left-4 text-white   font-semibold">
              {item.title}
            </h5>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default HolidayPlanner;
