"use client";
import React, { useState } from "react";
import { ChevronDown, Clock, MapPin } from "lucide-react";
import TravelHero from "./TravelHero";
import MainLayout from "@/app/common/MainLayout";
import { Utensils, Binoculars, Hotel, Car } from "lucide-react";
import Image from "next/image";
import { ItineraryAccordion } from "./ItineraryAccordion";
import travel1 from "@/app/assets/travelimg1.svg";
import travel2 from "@/app/assets/travelimg2.svg";
import travel3 from "@/app/assets/travelimg3.svg";
import travel4 from "@/app/assets/travelimg4.svg";
import travel5 from "@/app/assets/travelimg5.svg";
import travel6 from "@/app/assets/travelimg6.svg";

const TravelDetails = () => {
  const [active, setActive] = useState("Overview");
  const [activeTab, setActiveTab] = useState("Hotel Detail");

  const tabs = [
    "Overview",
    "Trip Highlights",
    "Destinations",
    "Tour Itinerary",
    "Information",
    "Get a Quote",
  ];

  const services = [
    { title: "Breakfast", icon: Utensils },
    { title: "Sightseeing", icon: Binoculars },
    { title: "Hotel", icon: Hotel },
    { title: "Transport", icon: Car },
  ];

  const images = [travel1, travel2, travel3, travel4, travel5, travel6];

  const points = [
    "Visit Lalbagh Botanical Gardens and ISKCON Temple",
    "Visit Mysore Maharaja’s palace and Brindavan Garden",
    "Day-trip to Belur and Halebid Temples, UNESCO World Heritage Site, Hassan",
    "Savor the haunting ruins of Vijayanagara Empire in Hampi",
    "Admire the great architecture of Pattadakal and Aihole Temples, Badami",
    "Visit the popular churches of Goa including the Basilica of Bom Jesus",
    "Enjoy local Goa and seafood at the shacks by Goa beaches",
    "Take Photos in Gateway of India and have panoramic view of Marine Drive",
  ];

  const hotelTabs = [
    "Hotel Detail",
    "Transportation Details",
    "Notes",
    "Packages Exclude",
  ];

  const hotelPoints = [
    "The Hotels used are normally First Class Hotel ranging in the 3 Star Category. Even we also provide optional hotels which you can choose to enhances based on your budget.",
    "Hotel accommodation is on Double Sharing Basis.",
    "Daily Buffet / Fixed Menu Breakfast as per Plan mentioned in the Package.",
    "The Hotels are subject to availability. In case of unavailability in the mentioned Hotels, alternate accommodation will be arranged in a similar category Hotel.",
    "Standard Check-in at 12.00 Noon & Check-out at 09.00AM. But for some Hotels, Check-in & Check-out at 10.00, 11.00 AM or 12.00 or 01.00 Noon it depends upon the Hotel rule. Kindly coordinate.",
    "Non AC Rooms are provided in Hill Stations due to low temperature.",
  ];

  const itineraryData = [
    {
      title: "Day 01: Bangalore",
      content:
        "On arrival in Bangalore you’ll be met and transferred to your hotel. Rest of the day is at leisure...",
    },
    {
      title: "Day 02: Bangalore – Mysore",
      content: "After breakfast drive to Mysore...",
    },
    {
      title: "Day 03: Mysore",
      content: "Full day sightseeing in Mysore...",
    },
  ];

  return (
    <>
      <TravelHero />
      <MainLayout className="w-full bg-secondary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="text-white">
            <h4 className="mb-1 font-semibold capitalize">
              Heritage Of South India
            </h4>
            <p className="flex items-center gap-2">
              <Clock size={18} />
              12 Nights / 13 Days
            </p>
          </div>
          <button className="text-sm bg-primary hover:opacity-90 transition text-white px-6 py-2 rounded-full font-semibold">
            Get a Quote
          </button>
        </div>
      </MainLayout>
      <MainLayout>
        <div className="w-full pt-10">
          <div className="max-w-4xl mx-auto px-6 md:px-0">
            <div className="flex gap-3 items-center overflow-x-auto scrollbar-hide">
              {tabs?.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 whitespace-nowrap
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
      </MainLayout>
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h4 className="text-2xl font-semibold mb-4">{active}</h4>
          <p className="text-gray-900 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-6 md:px-0 flex justify-center   gap-6 md:gap-20">
          {services?.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-red-600">
                  <Icon size={36} className="text-red-600" strokeWidth={2.5} />
                </div>
                <h5 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h5>
              </div>
            );
          })}
        </div>
      </MainLayout>
      <MainLayout>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h4 className="text-2xl font-semibold mb-10">Trip Highlights</h4>
            <div className="grid md:grid-cols-2 gap-12 items-stretch">
              <div className=" rounded-2xl p-8 h-full flex">
                <ul className="space-y-5  text-[17px] leading-relaxed">
                  {points.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 bg-gray-600 rounded-full shrink-0"></span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[220px] h-full">
                <div className="relative md:col-span-3 rounded-3xl overflow-hidden">
                  <Image
                    src={images[0]}
                    alt=""
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="relative md:col-span-3 rounded-3xl overflow-hidden">
                  <Image
                    src={images[1]}
                    alt=""
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="relative md:col-span-2 rounded-3xl overflow-hidden">
                  <Image
                    src={images[2]}
                    alt=""
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="relative md:col-span-2 rounded-3xl overflow-hidden">
                  <Image
                    src={images[3]}
                    alt=""
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden">
                  <Image
                    src={images[5]}
                    alt=""
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="relative md:col-span-4 rounded-3xl overflow-hidden">
                  <Image
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
      </MainLayout>
      <MainLayout className="w-full bg-accent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-white">
          <div className="flex items-center gap-2 text-center">
            <MapPin className="text-2xl shrink-0" />
            <h4 className="font-semibold">
              Bangalore - Mysore - Hassan – Hospet - Hampi – Badami - Goa -
              Mumbai.
            </h4>
          </div>
        </div>
      </MainLayout>
      <MainLayout className={"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-25"}>
        <ItineraryAccordion items={itineraryData} />
      </MainLayout>
      <MainLayout>
        <div className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
                  Important Information
                </h2>
                <div className="flex gap-3 mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
                  {hotelTabs?.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 sm:px-6 py-2 rounded-full border text-sm sm:text-base transition shrink-0 ${
                        activeTab === tab
                          ? "bg-red-100 text-red-600 border-red-600"
                          : "border-gray-300 text-gray-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <h4 className="font-semibold mb-4 text-lg">
                  Hotel Accommodation Details
                </h4>

                <ul className="space-y-3 leading-relaxed text-sm sm:text-base">
                  {hotelPoints?.map((item, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <span className="w-2 h-2 bg-gray-700 rounded-full mt-2 shrink-0"></span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your First Name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Last Name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your Address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Mobile number
                  </label>
                  <input
                    type="text"
                    placeholder="+91"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block text-sm text-gray-500 mb-1">
                      Person
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 appearance-none focus:ring-2 focus:ring-red-500 outline-none transition">
                      <option>Select</option>
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-[42px] text-gray-500 pointer-events-none"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm text-gray-500 mb-1">
                      Plan
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 appearance-none focus:ring-2 focus:ring-red-500 outline-none transition">
                      <option>Select</option>
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-[42px] text-gray-500 pointer-events-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Note
                  </label>
                  <textarea
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                  ></textarea>
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-4 sm:py-5 rounded-full text-sm">
                  Claim Your Free Spot
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
      <MainLayout className="w-full bg-[#e6dcc8] py-3">
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

export default TravelDetails;
