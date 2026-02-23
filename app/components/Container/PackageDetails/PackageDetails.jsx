"use client";
import React, { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import PackageBaneer from "./PackageBanner";
import MainLayout from "@/app/common/MainLayout";
import { ItineraryAccordion } from "./ItineraryAccordion";
import travel1 from "@/app/assets/travelimg1.svg";
import travel2 from "@/app/assets/travelimg2.svg";
import travel3 from "@/app/assets/travelimg3.svg";
import travel4 from "@/app/assets/travelimg4.svg";
import travel5 from "@/app/assets/travelimg5.svg";
import travel6 from "@/app/assets/travelimg6.svg";
import { useDispatch, useSelector } from "react-redux";
import { getPackagesById } from "@/app/store/slice/packageSlice";
import { notifyAlert } from "@/app/hooks/NotificationService";
import { clearEnquiryState } from "@/app/store/slice/enquirySlice";
import { getImageUrl } from "@/app/utils/getImageUrl";
import CustomImage from "@/app/common/Image";
import { tabSectionMap } from "@/app/utils/mockDatas";
import PackageForm from "./PackageForm";
import { getIcons } from "@/app/store/slice/iconSlice";
import PackageBanner from "@/app/assets/package_bg.png";

const fallbackImages = [travel1, travel2, travel3, travel4, travel5, travel6];
const PackageDetails = ({ slug }) => {
  const tabs = [
    "Overview",
    "Trip Highlights",
    "Destinations",
    "Tour Itinerary",
    "Information",
    "Get a Quote",
  ];

  const handleTabClick = (tab) => {
    setActive(tab);
    const id = tabSectionMap[tab];
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const dispatch = useDispatch();
  const [active, setActive] = useState("Overview");
  const [activeInfoIndex, setActiveInfoIndex] = useState(0);
  const { singlePackage } = useSelector((state) => state.packages);
  const { icons } = useSelector((state) => state.icons);
  const { message, error } = useSelector((state) => state.enquiry);
  const bannerImage = singlePackage?.images?.[0]
    ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${singlePackage.images[0]}`
    : PackageBanner.src;

  useEffect(() => {
    dispatch(getPackagesById(slug));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIcons());
  }, [dispatch]);

  const points = singlePackage?.tripHighlightsPoints || [];
  const importantInfo = singlePackage?.importantInfo || [];

  const rawImages =
    singlePackage?.images?.length > 0
      ? singlePackage.images.map(getImageUrl)
      : fallbackImages;

  const images =
    rawImages.length >= 6
      ? rawImages
      : Array.from({ length: 6 }, (_, i) => rawImages[i % rawImages.length]);

  useEffect(() => {
    if (message) {
      notifyAlert({
        title: "Success",
        message,
        type: "success",
      });
      dispatch(clearEnquiryState());
    }

    if (error) {
      notifyAlert({
        title: "Error",
        message: error,
        type: "error",
      });
      dispatch(clearEnquiryState());
    }
  }, [message, error, dispatch]);

  useEffect(() => {
    if (importantInfo.length > 0) {
      setActiveInfoIndex(0);
    }
  }, [importantInfo]);

  console.log(bannerImage);

  return (
    <>
      <PackageBaneer bgimg={bannerImage} />
      <div className="w-full bg-secondary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="text-white">
            <h4 className="mb-1 font-semibold capitalize">
              {singlePackage?.packageName}
            </h4>
            <p className="flex items-center gap-2">
              <Clock size={18} />
              {singlePackage?.nights} Nights / {singlePackage?.days} Days
            </p>
          </div>
          <button className="text-sm bg-primary hover:opacity-90 transition text-white px-6 py-2 rounded-full font-semibold">
            Get a Quote
          </button>
        </div>
      </div>
      <div>
        <div className="w-full pt-10 sticky top-10 pb-6 z-40 bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-0">
            <div className="flex gap-3 items-center overflow-x-auto scrollbar-hide">
              {tabs?.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer
                ${
                  active === tab
                    ? "border border-primary text-primary bg-primary-light"
                    : "text-black hover:text-primary"
                }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h4 id="overview" className="font-semibold mb-4 scroll-mt-[140px]">
              Overview
            </h4>
            <p className="text-gray-900 leading-relaxed">
              {singlePackage?.overview?.Description}
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-10 md:px-0 flex justify-center   gap-1 md:gap-20">
            {icons?.length > 0 &&
              icons.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100">
                    <CustomImage
                      src={item.iconPath}
                      alt={item.name}
                      className=" object-cover"
                    />
                  </div>
                  <h5 className="text-lg font-semibold text-gray-800 text-center">
                    {item.name}
                  </h5>
                </div>
              ))}
          </div>
        </div>
        <div>
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h4
                id="trip-highlights"
                className="text-2xl font-semibold mb-10 scroll-mt-[140px]"
              >
                Trip Highlights
              </h4>
              <div className="grid md:grid-cols-2 gap-12 items-stretch">
                <div className=" rounded-2xl p-8 h-full flex">
                  <ul className="space-y-5  text-[17px] leading-relaxed">
                    {points?.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-2 w-2 h-2 bg-gray-600 rounded-full shrink-0"></span>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[220px] h-full">
                  <div className="relative md:col-span-3 rounded-3xl overflow-hidden">
                    <CustomImage
                      src={images[0]}
                      alt=""
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="relative md:col-span-3 rounded-3xl overflow-hidden">
                    <CustomImage
                      src={images[1]}
                      alt=""
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="relative md:col-span-2 rounded-3xl overflow-hidden">
                    <CustomImage
                      src={images[2]}
                      alt=""
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="relative md:col-span-2 rounded-3xl overflow-hidden">
                    <CustomImage
                      src={images[3]}
                      alt=""
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden">
                    <CustomImage
                      src={images[5]}
                      alt=""
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="relative md:col-span-4 rounded-3xl overflow-hidden">
                    <CustomImage
                      src={images[4]}
                      alt=""
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-accent py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-white">
            <div className="flex items-center gap-2 text-center">
              <MapPin className=" shrink-0" />
              <h4 id="destinations" className="font-semibold scroll-mt-[120px]">
                Bangalore - Mysore - Hassan – Hospet - Hampi – Badami - Goa -
                Mumbai.
              </h4>
            </div>
          </div>
        </div>
        <div className={"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-25"}>
          <div id="tour-itinerary">
            <ItineraryAccordion items={singlePackage?.itinerary} />
          </div>
        </div>
        <div>
          <div className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
                <div className="h-[600px] overflow-y-auto pr-2">
                  <h2
                    id="information"
                    className="font-bold mb-6 md:mb-8 scroll-mt-[140px]"
                  >
                    Important Information
                  </h2>
                  <div className="flex gap-3 mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
                    {importantInfo.length === 0 && (
                      <span className="text-gray-400 text-sm">
                        No information available
                      </span>
                    )}
                    {importantInfo.map((info, index) => (
                      <button
                        key={info._id}
                        onClick={() => setActiveInfoIndex(index)}
                        className={`px-4 sm:px-6 py-2 rounded-full border text-sm sm:text-base transition shrink-0
        ${
          activeInfoIndex === index
            ? "bg-red-100 text-red-600 border-red-600"
            : "border-gray-300 text-gray-600 hover:border-red-400"
        }`}
                      >
                        {info.title}
                      </button>
                    ))}
                  </div>
                  <h4 className="font-semibold mb-4 text-lg">
                    Hotel Accommodation Details
                  </h4>
                  {importantInfo[activeInfoIndex] && (
                    <div>
                      <div
                        className="text-gray-700 leading-relaxed text-sm sm:text-base"
                        dangerouslySetInnerHTML={{
                          __html: importantInfo[activeInfoIndex].content,
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="h-[600px]">
                  <PackageForm packageId={singlePackage?._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainLayout className="w-full bg-[#e6dcc8] py-6 mt-50 md:mt-0">
        <div
          className="max-w-7xl mx-auto px-6 lg:px-8 
                  flex flex-col md:flex-row 
                  items-start md:items-center 
                  justify-between gap-10"
        >
          <div className="max-w-xl">
            <h4 className="mb-1 font-semibold capitalize">
              Customize Your Trip
            </h4>
            <p className="text-gray-900 text-sm leading-relaxed">
              Create a travel experience tailored to your preferences, budget,
              and schedule for a truly personalized journey.
            </p>
          </div>
          <button className="text-sm bg-primary hover:opacity-90 transition text-white px-6 py-2 rounded-full font-semibold">
            Customize your Trip
          </button>
        </div>
      </MainLayout>
    </>
  );
};

export default PackageDetails;
