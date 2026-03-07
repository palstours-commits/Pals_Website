"use client";
import CustomImage from "@/app/common/Image";
import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";

const textVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

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
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const handleDiscoverMore = () => {
    if (!discoverSubMenu?.menuId?.slug || !discoverSubMenu?.slug) return;
    router.push(`/${discoverSubMenu.menuId.slug}/${discoverSubMenu.slug}`);
  };

  return (
    <MainLayout className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 py-12 lg:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        
        {/* Compact Header */}
        <motion.div 
          variants={textVariants}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12"
        >
          <div>
            <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Trending International Destinations
            </h4>
            <p className="text-lg lg:text-xl text-gray-600 mt-3 max-w-sm font-light">
               Fly beyond borders with customized itineraries for the world’s
              most loved spots.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center shadow-md hover:shadow-lg hover:border-[#da251c] transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={18} className="text-gray-700" />
            </motion.button>
            
            <motion.button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center shadow-md hover:shadow-lg hover:border-[#da251c] transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={18} className="text-gray-700" />
            </motion.button>
            
            <motion.button
              onClick={handleDiscoverMore}
              className="bg-[#da251c] hover:bg-[#b91c1c] text-white px-6 py-3 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap cursor-pointer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Discover more
            </motion.button>
          </div>
        </motion.div>

        {/* Compact Cards Slider */}
        <motion.div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {internationalTrending?.map((item, i) => (
            <motion.div
              key={item._id}
              className="relative min-w-[260px] h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-lg group"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => router.push(`/packages/${item.subMenuId.slug}/${item.slug}`)}
            >
              
              {/* Image */}
              <motion.div 
                className="absolute inset-0 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              >
                <CustomImage
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent/0" />
              </motion.div>

              {/* Always visible content - matching HolidayPlanner style */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-xl">
                  <h5 className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                    {item.name}
                  </h5>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </MainLayout>
  );
};

export default TrendingDestinations;