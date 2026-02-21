"use client";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "@/app/store/slice/offerSlice";
import Offericon2 from "@/app/assets/offer_icon2.svg";
import Offericon1 from "@/app/assets/offer_icon1.svg";
import Image from "next/image";
import Link from "next/link";

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
    <section className="py-10 md:py-20">
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
            <div
              key={i}
              className="
    min-w-[300px] md:min-w-[360px]
    bg-[#ABE0F0]
    border-4 border-dotted border-[#2CB3DB]
    rounded-xl
    p-6
    flex flex-col
    justify-between
    relative
  "
            >
              <div className="absolute top-0 right-4 w-20 h-20">
                <Image
                  src={item?.offerType === "package" ? Offericon1 : Offericon2}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="pr-16">
                <button className="px-6 py-2 bg-[#2CB3DB] text-white rounded-full text-sm font-semibold mb-3">
                  {item?.offerCategory}
                </button>
                <h4 className="font-semibold leading-snug mb-4">
                  {item.offerName}
                </h4>
                <p className="text-sm text-gray-500 mb-3 line-clamp-3">
                  {item.description}
                </p>
              </div>
              <Link
                href={"/offers"}
                className="bg-primary hover-primary text-white text-sm px-4 py-2 rounded-full w-fit"
              >
                Explore Deals
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingOffers;
