"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import React, { useEffect, useMemo, useState } from "react";
import bannerimg from "@/app/assets/offerBanner.svg";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "@/app/store/slice/offerSlice";
import MainLayout from "@/app/common/MainLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import OfferCard from "@/app/common/OfferCard";
import { Search } from "lucide-react";
import { OfferDetailsModal } from "@/app/common/OfferDetailsModal";

const OfferSection = () => {
  const dispatch = useDispatch();
  const { offers } = useSelector((state) => state.offers);
  const [search, setSearch] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOffers = useMemo(() => {
    if (!search) return offers;
    return offers?.filter((item) =>
      [item.offerName, item.offerCategory, item.description]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [offers, search]);

  const handleOfferClick = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(getOffers());
  }, []);
  return (
    <>
      <CommonHeroSection
        title={`Hot Deals, Cool Trips`}
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Offers" || "Destination" },
        ]}
      />
      <MainLayout className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-8">Flash Sale Live Now</h3>
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            className="pb-12"
          >
            {offers?.map((item, i) => (
              <SwiperSlide key={i}>
                <OfferCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-16 mb-10">
            <h3 className="text-2xl font-bold">
              Pack Your Bags – Prices Dropped
            </h3>

            <div className="relative w-[241px]">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Offers"
                className="w-full border border-gray-200 rounded-full py-3 text-gray-400 px-4 pr-10 text-sm focus:outline-none shadow"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 cursor-pointer">
                <Search size={18} />
              </span>
            </div>
          </div>
          {filteredOffers?.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredOffers.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleOfferClick(item)}
                  className="cursor-pointer"
                >
                  <OfferCard item={item} isColor={false} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg font-medium">
                No offers found
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Try searching with a different keyword
              </p>
            </div>
          )}
        </div>
      </MainLayout>
      <OfferDetailsModal
        open={isModalOpen}
        offer={selectedOffer}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default OfferSection;
