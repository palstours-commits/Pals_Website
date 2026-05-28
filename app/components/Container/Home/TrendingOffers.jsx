"use client";
import MainLayout from "@/app/common/MainLayout";
import OfferCard from "@/app/common/OfferCard";
import { getOffers } from "@/app/store/slice/offerSlice";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const textVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const TrendingOffers = () => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const { offers } = useSelector((state) => state.offers);

  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout className="py-10 lg:py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-4 md:px-1 max-w-7xl mx-auto"
      >
        <motion.div
          variants={textVariants}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 lg:mb-10"
        >
          <div>
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Trending Offers
            </h4>
            <p className="text-base lg:text-lg text-gray-600 mt-2 max-w-sm font-medium">
              Promotions, deals, and special offers for you
            </p>
          </div>

          <div className=" hidden md:flex flex items-center gap-3 flex-shrink-0">
            <motion.button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md hover:border-[#da251c] transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={16} className="text-gray-700" />
            </motion.button>

            <motion.button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md hover:border-[#da251c] transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={16} className="text-gray-700" />
            </motion.button>
          </div>
        </motion.div>

        {/* Offers Slider */}
        <motion.div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {offers?.map((item, i) => (
            <motion.div
              key={item._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <OfferCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </MainLayout>
  );
};

export default TrendingOffers;
