"use client";
import MainLayout from "@/app/common/MainLayout";
import TravelCard from "@/app/common/TravelCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPackagesBySubmenu } from "@/app/store/slice/packageSlice";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import { TravelCardSkeleton } from "@/app/common/animations";
import { useRouter } from "next/navigation";

const PackageSection = ({ zoneSlug, submenuSlug }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const title = zoneSlug?.replace(/-/g, " ");
  const { packagesBySubmenu, loading } = useSelector((state) => state.packages);
  const zones = packagesBySubmenu?.zones || [];

  useEffect(() => {
    dispatch(getPackagesBySubmenu(submenuSlug));
  }, [submenuSlug]);

  useEffect(() => {
    if (!zoneSlug) return;
    const el = document.getElementById(zoneSlug);
    if (el) {
      setTimeout(() => {
        const headerOffset = 120;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 600);
    }
  }, [zoneSlug]);

  return (
    <>
      <CommonHeroSection
        title={`Experience the Timeless Beauty of ${title}`}
        backgroundImage={packagesBySubmenu?.subMenu?.bannerImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: submenuSlug, href: `/holidays/${submenuSlug}` },
          { label: title || "Destination" },
        ]}
      />
      {zones?.map((zone) => (
        <motion.div
          key={zone._id}
          id={zone.slug}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <MainLayout className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10 md:pt-15">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h4 className="font-bold">{zone.name}</h4>
                <p className="text-gray-500 mt-2 text-sm">{zone.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[#da251c] border-[#da251c]">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="w-6 h-6 rounded-lg border-2 border-gray-300 text-gray-300 flex items-center justify-center">
                    <ChevronRight size={18} />
                  </button>
                </div>
                <button
                  onClick={() => router.push("/explore")}
                  className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-semibold hidden lg:block cursor-pointer"
                >
                  Discover more
                </button>
              </div>
            </div>
            <div
              className="
          flex gap-4 overflow-x-auto
          md:grid md:grid-cols-3
          lg:grid-cols-4
          md:overflow-visible
          scrollbar-hide
        "
            >
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TravelCardSkeleton key={i} />
                ))
              ) : zone?.packages?.length ? (
                zone.packages.map((pkg) => (
                  <TravelCard
                    key={pkg._id}
                    img={pkg.images?.[0]}
                    title={pkg.packageName}
                    duration={`${pkg.nights} Nights / ${pkg.days} Days`}
                    slug={pkg.slug}
                    zoneSlug={zone.slug}
                    submenuSlug={submenuSlug}
                    newArrivals={pkg?.newArrivals}
                  />
                ))
              ) : (
                <p className="text-gray-400 text-sm">No packages available</p>
              )}
            </div>
          </MainLayout>
        </motion.div>
      ))}
    </>
  );
};

export default PackageSection;
