"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUpContainer, fadeUpItem } from "@/app/common/animations";
import MainLayout from "@/app/common/MainLayout";

const offers = [
  {
    title: "Flat 20% Off on International Tour Packages",
    desc: "Book your dream destinations like Dubai, Bali, Thailand, Singapore & Europe at unbeatable prices!",
  },
  {
    title: "Up to 30% Off on India Holiday Packages",
    desc: "Kashmir, Goa, Kerala, Himachal, Rajasthan & more — perfect for family trips and honeymoons.",
  },
  {
    title: "Honeymoon Special – Save Up to ₹15,000",
    desc: "Get exclusive villa stays, candlelight dinners & romantic upgrades.",
  },
  {
    title: "Hotel Deals – Up to 40% Off",
    desc: "Premium resorts, luxury hotels & boutique stays at the best prices.",
  },
  {
    title: "Early Bird Offer – Extra 10% Discount",
    desc: "Plan early and save big on domestic and international trips.",
  },
];

const TrendingOffers = () => {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    sliderRef.current.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout className="py-10 md:py-20">
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          variants={fadeUpItem}
          className="flex justify-between items-start mb-10"
        >
          <div>
            <h4 className="font-bold">Trending Offers</h4>
            <p className="text-gray-500 text-sm mt-1">
              Promotions, deals, and special offers for you
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full border text-primary flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full border border-gray-300 text-gray-300 flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide"
        >
          {offers?.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUpItem}
              className="min-w-[260px] md:min-w-[300px] border border-gray-300 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-semibold leading-snug mb-4">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-500 mb-6">{item.desc}</p>
              </div>

              <button className="bg-primary hover-primary text-white text-sm px-4 py-2 rounded-full w-fit">
                Explore Deals
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default TrendingOffers;
