"use client";
import bannerimg from "@/app/assets/explore-bg.svg";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import MainLayout from "@/app/common/MainLayout";
import TravelCard from "@/app/common/TravelCard";
import { TravelCardSkeleton } from "@/app/common/animations";
import { getPackages } from "@/app/store/slice/packageSlice";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <>
      <CommonHeroSection
        title="Explore All Packages"
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "All Packages" },
        ]}
      />

      <MainLayout className="px-4  max-w-7xl mx-auto py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 lg:mb-12"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Popular Holiday Packages
            </h3>
            <p className="text-gray-600 mt-2 text-base">
              Discover your next adventure with our curated collection
            </p>
          </div>
          <div className="relative w-full md:w-80 lg:w-96">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search packages..."
              className="w-full border border-gray-200 rounded-xl py-3.5 px-4 pr-12 text-sm focus:outline-none focus:border-[#da251c] focus:ring-2 focus:ring-[#da251c]/20 transition-all duration-300 shadow-sm"
            />
            {search ? (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            ) : (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </span>
            )}
          </div>
        </motion.div>
        {!loading && filteredPackages?.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500 mb-6"
          >
            Showing {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <TravelCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredPackages?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPackages.map((pkg) => (
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <TravelCard
                    img={pkg.images?.[0]}
                    title={pkg.packageName}
                    duration={`${pkg.nights} Nights / ${pkg.days} Days`}
                    slug={pkg.slug}
                    newArrivals={pkg?.newArrivals}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 px-4"
            >
              <div className="text-center">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h4 className="text-xl font-semibold text-gray-700 mb-2">
                  No packages found
                </h4>
                <p className="text-gray-500 mb-6">
                  {search ? `No results for "${search}"` : "No packages available"}
                </p>
                {search && (
                  <button
                    onClick={clearSearch}
                    className="bg-[#da251c] hover:bg-[#b91c1c] text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
        {!loading && filteredPackages?.length > 0 && filteredPackages.length >= 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              className="w-[250px] mt-6 md:mt-8 bg-red-600 text-white font-semibold py-2 sm:py-4 rounded-xl shadow-lg hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Load More Packages
            </motion.button>
          </motion.div>
        )}
      </MainLayout>
    </>
  );
};

export default GetAllPackages;