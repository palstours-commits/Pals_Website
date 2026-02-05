"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Malaysia from "@/app/assets/coorg.svg";
import Singapore from "@/app/assets/agra.svg";
import Indonesia from "@/app/assets/goa.svg";
import Thailand from "@/app/assets/darjeeling.svg";
import MainLayout from "@/app/common/MainLayout";

const destinations = [
  {
    title: "Malaysia",
    image: Malaysia,
    isNew: true,
  },
  {
    title: "Singapore",
    image: Singapore,
  },
  {
    title: "Indonesia",
    image: Indonesia,
  },
  {
    title: "Thailand",
    image: Thailand,
  },
];

const TopDestionation = () => {
  const sliderRef = useRef(null);
  const scroll = (dir) => {
    sliderRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout className="px-4 md:px-20 bg-[#FAF3E1] py-20">
      <div className="flex items-center justify-between gap-3 md:gap-0">
        <div className="mb-5 md:mb-10">
          <h4 className="font-bold">Top Indian Destinations</h4>
          <p className="text-gray-500 mt-2 text-xs">
            Explore the diversity of India—from mountains to beaches, temples to
            adventure zones.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[#da251c] font-medium border-[#da251c] "
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-6 h-6 rounded-lg border-2 border-gray-300 text-gray-300 flex items-center justify-center "
          >
            <ChevronRight size={18} />
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-semibold hidden lg:block">
            Discover more
          </button>
        </div>
      </div>
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide"
      >
        {destinations?.map((item, i) => (
          <div
            key={i}
            className="relative min-w-[280px] h-[300px] rounded-xl overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
            {item.isNew && (
              <span className="absolute top-4 left-4 bg-yellow-400 text-xs font-semibold px-3 py-1 rounded">
                NEW
              </span>
            )}
            <h5 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
              {item.title}
            </h5>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default TopDestionation;
