"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import South from "@/app/assets/south.png";
import North from "@/app/assets/north.png";
import NorthEast from "@/app/assets/northeast.png";
import Andaman from "@/app/assets/andhaman.png";
import Kashmir from "@/app/assets/kashmir.png";
import Himachal from "@/app/assets/himachal.png";
import MainLayout from "@/app/common/MainLayout";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getIdSubMenus } from "@/app/store/slice/submenuSlice";
import CustomImage from "@/app/common/Image";



const cards = [
  { title: "South India", img: South, slug: "south-india", isNew: true },
  { title: "North India", img: North, slug: "north-india" },
  { title: "North East India", img: NorthEast, slug: "north-east-india" },
  { title: "Andaman", img: Andaman, slug: "andaman" },
  { title: "Kashmir", img: Kashmir, slug: "kashmir" },
  { title: "Himachal", img: Himachal, slug: "himachal" },
];

const HolidayPlanner = () => {
  const router = useRouter();
  const sliderRef = useRef(null);
  const scroll = (dir) => {
    sliderRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const dispatch = useDispatch();
  const { submenus ,selectedSubmenu} = useSelector((state) => state.submenu);

  const handleSlug = (slug) => () => {
    dispatch(getIdSubMenus(slug));
  }



  return (
    <MainLayout className="px-4 sm:px-6 lg:px-8  max-w-7xl mx-auto py-10 md:py-20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold leading-tight">
          Quick and easy <br /> Holiday Trip Planner
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[#da251c] font-medium border-[#da251c]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-6 h-6 rounded-lg border-2 border-gray-300 text-gray-300 flex items-center justify-center  "
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-6 text-sm scrollbar-hide">
        {submenus?.map((menu) =>
          menu.submenus?.map((sub, i) => (
            <button
              key={sub._id}
              onClick={handleSlug(sub.slug)}
              className={`px-4 py-2 rounded-full cursor-pointer whitespace-nowrap text-gray-700  hover:bg-red-100 hover:text-red-600 transition`}
            >
              {sub.name}
            </button>
          ))
        )}
      </div>
      <div
        ref={sliderRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide"
      >
        {selectedSubmenu?.map((item, i) => (
          <div
            key={i}
            onClick={() => router.push(`/destination/${item.slug}`)}
            className="relative min-w-[220px] h-[300px] rounded-xl overflow-hidden cursor-pointer"
          >
            <CustomImage
              src={item.image}
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
              {item.name}
            </h5>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default HolidayPlanner;
