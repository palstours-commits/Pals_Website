"use client";
import { HolidayPlannerSkeleton } from "@/app/common/animations";
import CustomImage from "@/app/common/Image";
import MainLayout from "@/app/common/MainLayout";
import { getSlugBySubmenu } from "@/app/store/slice/submenuSlice";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const textVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HolidayPlanner = ({ activeSlugFromRoute }) => {
  const router = useRouter();
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeSlug, setActiveSlug] = useState(null);
  const { submenus, selectedSubmenu, loading } = useSelector(
    (state) => state.submenu,
  );

  const scroll = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 350);
  };

  useEffect(() => {
    if (activeSlugFromRoute) {
      setActiveSlug(activeSlugFromRoute);
      dispatch(getSlugBySubmenu(activeSlugFromRoute));
      return;
    }
    if (submenus?.length) {
      const firstSubmenu = submenus[0]?.submenus?.[0];
      if (firstSubmenu?.slug) {
        setActiveSlug(firstSubmenu.slug);
        dispatch(getSlugBySubmenu(firstSubmenu.slug));
      }
    }
  }, [activeSlugFromRoute, submenus, dispatch]);

  const handleSlug = (slug) => () => {
    setActiveSlug(slug);
    dispatch(getSlugBySubmenu(slug));
  };

  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [selectedSubmenu]);

  if (loading) {
    return (
      <MainLayout className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 lg:py-16">
        <HolidayPlannerSkeleton />
      </MainLayout>
    );
  }

  return (
    <MainLayout className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 lg:py-16">
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12 lg:mb-16"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12">
          <motion.h3 
            variants={textVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            Quick and easy
            <br />
            <span className="text-[#da251c]">Holiday Trip Planner</span>
          </motion.h3>
          
          <div className="flex gap-3 flex-shrink-0">
            <motion.button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-xl bg-white border-2 flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer ${
                canScrollLeft
                  ? "border-[#da251c] text-[#da251c] hover:shadow-lg hover:border-[#da251c]/80"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              whileHover={canScrollLeft ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={18} />
            </motion.button>
            
            <motion.button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-xl bg-white border-2 flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer ${
                canScrollRight
                  ? "border-[#da251c] text-[#da251c] hover:shadow-lg hover:border-[#da251c]/80"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              whileHover={canScrollRight ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        <motion.div 
          variants={textVariants}
          className="flex gap-3 overflow-x-auto pb-4 mb-10 lg:mb-12 scrollbar-hide"
        >
          {submenus?.map((menu) =>
            menu?.submenus?.map((sub) => (
              <motion.button
                key={sub._id}
                onClick={handleSlug(sub.slug)}
                className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap shadow-sm border transition-all duration-300 flex-shrink-0 text-sm cursor-pointer ${
                  activeSlug === sub.slug
                    ? "bg-[#da251c] text-white shadow-md border-[#da251c]"
                    : "bg-white border-gray-200 hover:border-[#da251c] hover:shadow-md hover:text-[#da251c]"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {sub.name}
              </motion.button>
            )),
          )}
        </motion.div>
      </motion.div>

      <motion.div 
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {selectedSubmenu?.map((itemData, i) => (
          <motion.div
            key={itemData.slug || i}
            className="relative min-w-[260px] h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-lg group"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push(`/packages/${activeSlug}/${itemData.slug}`)}
          >
            <motion.div 
              className="absolute inset-0 rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5 }}
            >
              <CustomImage
                src={itemData.image} 
                alt={itemData.name} 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent/0" />
            </motion.div>

            {itemData.isNew && (
              <span className="absolute top-4 left-4 bg-yellow-400 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wide shadow-lg z-20">
                NEW
              </span>
            )}

            {/* Changed: Removed conditional hover visibility so it's always visible */}
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-xl">
                <h5 className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                  {itemData.name}
                </h5>
              </div>
            </div>
          </motion.div>
        ))}
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

export default HolidayPlanner;