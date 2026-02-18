"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Malaysia from "@/app/assets/malaysia.png";
import Singapore from "@/app/assets/singapore.png";
import Indonesia from "@/app/assets/indonesia.png";
import Thailand from "@/app/assets/thailand.png";
import MainLayout from "@/app/common/MainLayout";
import { fadeContainer, fadeItem } from "@/app/common/animations";
import { motion } from "framer-motion";

const destinations = [
  { title: "Malaysia", image: Malaysia, isNew: true },
  { title: "Singapore", image: Singapore },
  { title: "Indonesia", image: Indonesia },
  { title: "Thailand", image: Thailand },
];

const TrendingDestinations = () => {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout className="py-10 md:py-20 overflow-x-hidden">
      <motion.div
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          variants={fadeItem}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h4 className="font-bold">Trending International Destinations</h4>
            <p className="text-gray-500 mt-2 text-sm">
              Fly beyond borders with customized itineraries for the world’s
              most loved spots.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[#da251c] font-medium border-[#da251c]"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-6 h-6 rounded-lg border-2 border-gray-300 text-gray-300 flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
            <button className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-semibold hidden lg:block">
              Discover more
            </button>
          </div>
        </motion.div>
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap pb-2"
        >
          {destinations?.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeItem}
              className="relative min-w-[280px] h-[300px] shrink-0 rounded-xl overflow-hidden will-change-transform translate-z-0"
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

              <h5 className="absolute bottom-4 left-4 text-white font-semibold">
                {item.title}
              </h5>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};
export default TrendingDestinations;
