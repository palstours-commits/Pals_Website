"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useMemo } from "react";
import MainLayout from "@/app/common/MainLayout";
import { fadeContainer, fadeItem } from "@/app/common/animations";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import CustomImage from "@/app/common/Image";
import { useRouter } from "next/navigation";

const TrendingDestinations = () => {
  const sliderRef = useRef(null);
  const router = useRouter();
  const { zones } = useSelector((state) => state.zones);
  const trendingZones = useMemo(
    () => zones?.filter((z) => z.istrending === true),
    [zones],
  );

  const internationalTrending = useMemo(
    () =>
      trendingZones?.filter(
        (z) => z.subMenuId?.slug === "international-holidays",
      ),
    [trendingZones],
  );
  const discoverSubMenu = internationalTrending?.[0]?.subMenuId;
  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const handleDiscoverMore = () => {
    if (!discoverSubMenu?.menuId?.slug || !discoverSubMenu?.slug) return;

    router.push(`/${discoverSubMenu.menuId.slug}/${discoverSubMenu.slug}`);
  };

  return (
    <MainLayout className="py-10 md:py-20 overflow-x-hidden">
      <motion.div
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          variants={fadeItem}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h4 className="font-bold">Trending International Destinations</h4>
            <p className="text-gray-500 mt-2 text-sm">
              Fly beyond borders with customized itineraries for the world’s
              most loved spots.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-6 h-6 rounded-lg border-2 flex items-center justify-center text-[#da251c] border-[#da251c]"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-6 h-6 rounded-lg border-2 border-gray-300 text-gray-300 flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={handleDiscoverMore}
              className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-semibold hidden lg:block cursor-pointer"
            >
              Discover more
            </button>
          </div>
        </motion.div>
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap pb-2"
        >
          {internationalTrending?.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                router.push(`/packages/${item.subMenuId.slug}/${item.slug}`)
              }
              className="relative min-w-[280px] h-[300px] shrink-0 rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                <CustomImage
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
              <h5 className="absolute bottom-4 left-4 text-white font-semibold z-10">
                {item.name}
              </h5>
            </div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default TrendingDestinations;
