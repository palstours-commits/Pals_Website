"use client";
import React, { useEffect, useMemo, useState } from "react";
import bannerimg from "@/app/assets/explore-bg.svg";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import { useDispatch, useSelector } from "react-redux";
import { getPackages } from "@/app/store/slice/packageSlice";
import TravelCard from "@/app/common/TravelCard";
import { TravelCardSkeleton } from "@/app/common/animations";
import { motion } from "framer-motion";
import MainLayout from "@/app/common/MainLayout";
import { Search } from "lucide-react";

const GetAllPackages = () => {
  const dispatch = useDispatch();
  const { packages, loading } = useSelector((state) => state.packages);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getPackages());
  }, [dispatch]);

  const filteredPackages = useMemo(() => {
    if (!search.trim()) return packages;
    return packages?.filter((pkg) =>
      pkg.packageName?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [packages, search]);

  return (
    <>
      <CommonHeroSection
        title={`Get All Packages`}
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Packages" || "Destination" },
        ]}
      />
      <MainLayout className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10 md:py-15">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4  mb-5 md:mb-15">
          <h3 className="text-2xl font-bold">Popular Holiday Packages</h3>
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div
            className="
          grid  md:grid-cols-3
          lg:grid-cols-4
          md:overflow-visible
          scrollbar-hide
        "
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <TravelCardSkeleton key={i} />
              ))
            ) : filteredPackages?.length ? (
              filteredPackages.map((pkg) => (
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
              <div className="col-span-full flex justify-center items-center py-10">
                <p className="text-gray-400 text-sm text-center">
                  No packages available
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default GetAllPackages;
