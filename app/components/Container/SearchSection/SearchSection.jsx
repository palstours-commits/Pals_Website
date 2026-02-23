"use client";
import { TravelCardSkeleton } from "@/app/common/animations";
import MainLayout from "@/app/common/MainLayout";
import TravelCard from "@/app/common/TravelCard";
import { getPackages } from "@/app/store/slice/packageSlice";
import { Camera, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DUMMY_DESTINATIONS = [
  "South India",
  "Himachal Pradesh",
  "Arunachal Pradesh",
  "Kerala",
  "Tamil Nadu",
  "Goa",
  "Kashmir",
];

const SearchSection = () => {
  const dispatch = useDispatch();
  const { packages, loading } = useSelector((state) => state.packages);

  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredSuggestions = DUMMY_DESTINATIONS.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    dispatch(getPackages());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <MainLayout>
        <div className="relative bg-white rounded-full border border-gray-300 flex items-center gap-4 shadow-xl my-10 px-5 sm:px-6 py-3">
          <Camera size={18} className="text-gray-500 shrink-0" />
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              className="w-full outline-none text-sm sm:text-base text-gray-700"
            />
            {showDropdown && search && filteredSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-12 bg-white border border-gray-300 rounded-xl shadow-lg z-50 overflow-hidden">
                {filteredSuggestions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearch(item);
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => console.log("Search:", search)}
            className="bg-red-600 h-9 w-9 sm:h-8 sm:w-8 rounded-full flex items-center justify-center"
          >
            <Search size={16} className="text-white sm:size-[18px]" />
          </button>
        </div>
      </MainLayout>
      <MainLayout className="mt-10">
        <h4 className="font-semibold mb-3">Recently View</h4>

        <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible scrollbar-hide">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <TravelCardSkeleton key={i} />
            ))
          ) : packages?.length ? (
            packages.map((pkg) => (
              <TravelCard
                key={pkg._id}
                img={pkg.images?.[0]}
                title={pkg.packageName}
                duration={`${pkg.nights} Nights / ${pkg.days} Days`}
                slug={pkg.slug}
                newArrivals={pkg?.newArrivals}
              />
            ))
          ) : (
            <p className="text-gray-400 text-sm">No packages available</p>
          )}
        </div>
      </MainLayout>
    </div>
  );
};

export default SearchSection;
