"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MainLayout from "@/app/common/MainLayout";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getSlugBySubmenu } from "@/app/store/slice/submenuSlice";
import CustomImage from "@/app/common/Image";
import { motion } from "framer-motion";
import { HolidayPlannerSkeleton } from "@/app/common/animations";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
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

  return (
    <MainLayout className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10 md:py-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h3
            variants={item}
            className="text-3xl font-bold leading-tight"
          >
            Quick and easy <br /> Holiday Trip Planner
          </motion.h3>
          <motion.div variants={item} className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition
      ${
        canScrollLeft
          ? "border-[#da251c] text-[#da251c]"
          : "border-gray-300 text-gray-300 cursor-not-allowed"
      }
    `}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition
      ${
        canScrollRight
          ? "border-[#da251c] text-[#da251c]"
          : "border-gray-300 text-gray-300 cursor-not-allowed"
      }
    `}
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
        {loading ? (
          <HolidayPlannerSkeleton />
        ) : (
          <>
            <div className="flex gap-3 overflow-x-auto pb-6 text-sm scrollbar-hide">
              {submenus?.map((menu) =>
                menu?.submenus?.map((sub) => (
                  <motion.button
                    variants={item}
                    key={sub._id}
                    onClick={handleSlug(sub.slug)}
                    className={`px-4 py-2 rounded-full cursor-pointer whitespace-nowrap transition  
                  ${
                    activeSlug === sub.slug
                      ? "bg-red-50 border-red-500 text-red-600 font-medium border"
                      : "bg-white border-gray-300  hover:border-red-400 hover:text-red-600"
                  }
                `}
                  >
                    {sub.name}
                  </motion.button>
                )),
              )}
            </div>
            <div
              ref={sliderRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide"
            >
              {selectedSubmenu?.map((itemData, i) => (
                <motion.div
                  variants={item}
                  key={i}
                  onClick={() =>
                    router.push(`/packages/${activeSlug}/${itemData.slug}`)
                  }
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="relative min-w-[260px] h-[300px] shrink-0 rounded-xl overflow-hidden cursor-pointer group"
                >
                  <motion.div
                    variants={{
                      rest: { scale: 1 },
                      hover: { scale: 1.1 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <CustomImage
                      src={itemData.image}
                      alt={itemData.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  {itemData.isNew && (
                    <span className="absolute top-0 left-0 bg-yellow-400 text-[10px] px-2 py-1 rounded font-semibold z-10">
                      NEW
                    </span>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                  <h5 className="absolute bottom-4 left-4 text-white font-semibold z-10">
                    {itemData.name}
                  </h5>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default HolidayPlanner;
