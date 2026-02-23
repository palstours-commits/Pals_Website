"use client";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "@/app/store/slice/offerSlice";
import OfferCard from "@/app/common/OfferCard";
import MainLayout from "@/app/common/MainLayout";

const TrendingOffers = () => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const { offers } = useSelector((state) => state.offers);

  useEffect(() => {
    dispatch(getOffers());
  }, []);

  const scroll = (dir) => {
    sliderRef.current.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout className="py-10 md:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h4 className="font-bold">Trending Offers</h4>
            <p className="text-gray-500 text-sm mt-1">
              Promotions, deals, and special offers for you
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full border  text-primary flex items-center justify-center"
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
        </div>
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide"
        >
          {offers?.map((item, i) => (
            <OfferCard item={item} key={i} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default TrendingOffers;
