"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import MainLayout from "@/app/common/MainLayout";
import TravelCard from "@/app/common/TravelCard";
import { TravelCardSkeleton } from "@/app/common/animations";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPackagesByMenuAndZone } from "@/app/store/slice/packageSlice";

const PackageSection = ({ zoneSlug, menuSlug }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const title = zoneSlug?.replace(/-/g, " ");
  const sliderRefs = useRef({});
  const [canScrollLeft, setCanScrollLeft] = useState({});
  const [canScrollRight, setCanScrollRight] = useState({});

  const { packagesByMenuAndZone, loading } = useSelector(
    (state) => state.packages
  );

  const zones = packagesByMenuAndZone || []

  useEffect(() => {
    if (menuSlug) {
      dispatch(
        getPackagesByMenuAndZone({
          menuSlug,
        })
      );
    }
  }, [dispatch, menuSlug]);

  useEffect(() => {
    if (!zoneSlug || !zones?.length) return;

    const timer = setTimeout(() => {
      const element = document.getElementById(zoneSlug);

      if (element) {
        const headerOffset = 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [zoneSlug, zones]);

  const scroll = (zoneId, dir) => {
    const el = sliderRefs.current[zoneId];
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
    setTimeout(() => checkScroll(zoneId), 350);
  };

  const checkScroll = (zoneId) => {
    const el = sliderRefs.current[zoneId];
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft((prev) => ({
      ...prev,
      [zoneId]: scrollLeft > 0,
    }));
    setCanScrollRight((prev) => ({
      ...prev,
      [zoneId]: scrollLeft + clientWidth < scrollWidth - 1,
    }));
  };

  return (
    <>
      <MainLayout className="bg-[#f7d4d4] py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-5xl font-bold text-black">
            Discover the Soul of Incredible {title}
          </h3>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm">
            <button
              onClick={() => router.push("/")}
              className="text-[#0e0505] hover:underline"
            >
              Home
            </button>

            <span className="text-gray-500">/</span>

            <button
              onClick={() => router.push(`/${menuSlug}`)}
              className="text-gray-700 hover:text-[#da251c]"
            >
              {menuSlug}
            </button>

            {title && (
              <>
                <span className="text-gray-500">/</span>
                <span className="text-gray-700 capitalize">{title}</span>
              </>
            )}
          </div>
        </div>
      </MainLayout>

      {zones?.map((item) => {
        const zone = item?.zone;
        const packages = item?.packages || [];

        return (
          <motion.div
            key={zone?._id}
            id={zone?.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white"
          >
            <MainLayout className="px-4  max-w-7xl mx-auto py-10 md:pt-15">
              <div className="flex flex-col md:flex-row lg:items-end justify-between gap-6 mb-10">
                <div>
                  <h4 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Explore the Heart of {zone?.name}
                  </h4>
                  <p className="text-gray-600 mt-2 text-sm md:text-base max-w-2xl">
                    {zone?.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => scroll(zone?._id, "left")}
                      disabled={!canScrollLeft[zone?._id]}
                      className={`w-10 h-10 rounded-xl bg-white border-2 flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer ${canScrollLeft[zone?._id]
                        ? "border-[#da251c] text-[#da251c] hover:shadow-lg hover:border-[#da251c]/80"
                        : "border-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      whileHover={
                        canScrollLeft[zone?._id] ? { scale: 1.05 } : {}
                      }
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft size={18} />
                    </motion.button>

                    <motion.button
                      onClick={() => scroll(zone?._id, "right")}
                      disabled={!canScrollRight[zone?._id]}
                      className={`w-10 h-10 rounded-xl bg-white border-2 flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer ${canScrollRight[zone?._id]
                        ? "border-[#da251c] text-[#da251c] hover:shadow-lg hover:border-[#da251c]/80"
                        : "border-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      whileHover={
                        canScrollRight[zone?._id] ? { scale: 1.05 } : {}
                      }
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight size={18} />
                    </motion.button>
                  </div>

                  <motion.button
                    onClick={() => router.push(`/explore?zone=${zone?.slug}`)}
                    className="bg-[#da251c] hover:bg-[#b91c1c] text-white px-6 py-2 rounded-xl text-sm shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap cursor-pointer"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Discover more
                  </motion.button>
                </div>
              </div>

              <div className="lg:hidden">
                <motion.div
                  ref={(el) => (sliderRefs.current[zone?._id] = el)}
                  className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  onScroll={() => checkScroll(zone?._id)}
                >
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="min-w-[260px]">
                        <TravelCardSkeleton />
                      </div>
                    ))
                  ) : packages.length ? (
                    packages.map((pkg) => (
                      <div key={pkg._id} className="min-w-[260px]">
                        <TravelCard
                          img={pkg.images?.[0]}
                          title={pkg.packageName}
                          duration={`${pkg.nights} Nights / ${pkg.days} Days`}
                          slug={pkg.slug}
                          zoneSlug={zone?.slug}
                          submenuSlug={menuSlug}
                          newArrivals={pkg?.newArrivals}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm text-center w-full py-8">
                      No packages available
                    </p>
                  )}
                </motion.div>
              </div>

              <div className="hidden lg:grid lg:grid-cols-4 gap-6">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <TravelCardSkeleton key={i} />
                  ))
                ) : packages.length ? (
                  packages.map((pkg) => (
                    <TravelCard
                      key={pkg._id}
                      img={pkg.images?.[0]}
                      title={pkg.packageName}
                      duration={`${pkg.nights} Nights / ${pkg.days} Days`}
                      slug={pkg.slug}
                      zoneSlug={zone?.slug}
                      submenuSlug={menuSlug}
                      newArrivals={pkg?.newArrivals}
                    />
                  ))
                ) : (
                  <p className="text-gray-400 text-sm text-center col-span-4 py-8">
                    No packages available
                  </p>
                )}
              </div>
            </MainLayout>
          </motion.div>
        );
      })}
    </>
  );
};

export default PackageSection;