"use client";

import { TravelCardSkeleton } from "@/app/common/animations";
import MainLayout from "@/app/common/MainLayout";
import TravelCard from "@/app/common/TravelCard";
import { getPackages } from "@/app/store/slice/packageSlice";
import {
  searchPackages,
  clearSearchResults,
} from "@/app/store/slice/searchSlice";
import { Camera, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CustomImage from "@/app/common/Image";

const SearchSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { results, loading: searchLoading } = useSelector(
    (state) => state.search,
  );

  const { packages, loading: packageLoading } = useSelector(
    (state) => state.packages,
  );

  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    dispatch(getPackages());
  }, [dispatch]);

  useEffect(() => {
    if (search.trim().length >= 2) {
      dispatch(searchPackages(search));
      setShowDropdown(true);
    } else {
      dispatch(clearSearchResults());
      setShowDropdown(false);
    }
  }, [search, dispatch]);

  const listToShow = search.trim().length >= 2 ? results : packages;

  const isLoading = search.trim().length >= 2 ? searchLoading : packageLoading;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <MainLayout>
        <div className="relative backdrop-blur-lg bg-white/30 border border-white/40 rounded-full flex items-center gap-4 shadow-xl my-10 px-5 sm:px-6 py-3">
          <Camera size={18} className="text-gray-700 shrink-0" />
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => search && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              className="w-full bg-transparent outline-none text-sm sm:text-base text-gray-900 placeholder:text-gray-600"
            />
            {showDropdown && results?.length > 0 && (
              <div className="absolute left-0 right-0 top-12 z-50 rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl shadow-xl overflow-hidden">
                {results.map((pkg) => (
                  <div
                    key={pkg._id}
                    onClick={() => {
                      setShowDropdown(false);
                      router.push(`/package/${pkg.slug}`);
                    }}
                    className="
      px-3 sm:px-4
      py-3
      cursor-pointer
      hover:bg-white/50
      transition
    "
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0">
                        <CustomImage
                          src={pkg.images?.[0]}
                          alt={pkg.packageName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <p
                          className="
            text-sm
            font-semibold
            text-gray-900
            leading-tight
            truncate
          "
                        >
                          {pkg.packageName}
                        </p>

                        <p
                          className="
            text-xs
            text-gray-600
            mt-0.5
            truncate
          "
                        >
                          {pkg.zoneId?.name}
                          {pkg.destinations?.length
                            ? ` • ${pkg.destinations.join(", ")}`
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="bg-red-600/90 hover:bg-red-600 transition h-9 w-9 sm:h-8 sm:w-8 rounded-full flex items-center justify-center shadow-md">
            <Search size={16} className="text-white sm:size-[18px]" />
          </button>
        </div>
      </MainLayout>
      <MainLayout className="mt-50">
        <h4 className="font-semibold mb-3">
          {search ? "Search Results" : "Recently View"}
        </h4>
        <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible scrollbar-hide">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <TravelCardSkeleton key={i} />
            ))
          ) : listToShow?.length ? (
            listToShow.map((pkg) => (
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
            <p className="text-gray-400 text-sm">
              {search ? "No results found" : "No packages available"}
            </p>
          )}
        </div>
      </MainLayout>
    </div>
  );
};

export default SearchSection;
