"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import React, { useEffect } from "react";
import bannerimg from "@/app/assets/offerBanner.svg";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "@/app/store/slice/offerSlice";
import MainLayout from "@/app/common/MainLayout";
const OfferSection = () => {
  const dispatch = useDispatch();
  const { offers } = useSelector((state) => state.offers);

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
      <MainLayout className="py-10 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"></div>
      </MainLayout>
    </>
  );
};

export default OfferSection;
