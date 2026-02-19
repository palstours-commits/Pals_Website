import CommonHeroSection from "@/app/common/CommonHeroSection";
import React from "react";
import bannerimg from "@/app/assets/flight-bg.svg";
import { ChevronDown } from "lucide-react";
import MainLayout from "@/app/common/MainLayout";

const HotelBookingSection = () => {
  const title = "Hotel Booking";

  return (
    <>
      <CommonHeroSection
        title={`Experience the Timeless Beauty of `}
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "India Holidays", href: "/holidays/indian-holiday" },
          { label: title || "Destination" },
        ]}
      />
      <MainLayout>
        <div className="bg-[#f5f5f5] py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" mb-10">
              <h4 className="font-bold mb-4">
                Book Hotels Online with Pals Holidays at affordable rates.
              </h4>
              <p className="text-gray-600 text-sm md:text-base max-w-3xl">
                Book Hotels online and enjoy affordable fares, warm service and
                reliable operations to destinations across India. We are
                available for 24*7 for our customers. Reserve, book and rebook
                Hotels according to your desires.
              </p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                />
                <div className="relative">
                  <select className="w-full border border-gray-400 rounded-md px-4 text-gray-600 py-3 appearance-none outline-none">
                    <option>Country of Residence</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-4 text-gray-500"
                    size={18}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="email"
                  placeholder="Enter Your Email Id"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                />
                <input
                  type="text"
                  placeholder="+91"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <select className="w-full border border-gray-400 rounded-md px-4 py-3 text-gray-600 appearance-none outline-none">
                    <option>Seat Class</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-4 text-gray-500"
                    size={18}
                  />
                </div>
                <div className="relative">
                  <select className="w-full border border-gray-400 rounded-md px-4 py-3 text-gray-600 appearance-none outline-none">
                    <option>Person</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-4 text-gray-500"
                    size={18}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                <input
                  type="text"
                  placeholder="From - To"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                />
                <input
                  type="date"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                />
              </div>
              <textarea
                rows="5"
                placeholder="Note"
                className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
              ></textarea>
              <div className="flex justify-center pt-4">
                <div className="flex justify-center">
                  <button
                    className="px-3 w-full md:w-[500px] bg-red-600 hover:bg-red-700 
  transition text-white font-semibold py-4 rounded-full text-sm md:text-base"
                  >
                    Claim Your Free Spot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default HotelBookingSection;
