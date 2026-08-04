"use client";
import BannerImg2 from "@/app/assets/BannerImageKashmir.png";
import BannerImg3 from "@/app/assets/BannerImageKerla.png";
import BannerImg4 from "@/app/assets/BannerImageIndia1.png";
import BannerImg5 from "@/app/assets/WildLifeImage.png";
import BannerImg6 from "@/app/assets/BannerInternational.png";
import CustomImage from "@/app/common/Image";
import MainLayout from "@/app/common/MainLayout";
import { clearSearchResults, searchPackages } from "@/app/store/slice/searchSlice";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Mobile1 from "@/app/assets/Hero_MobileImages/Mobile1.png";
import Mobile2 from "@/app/assets/Hero_MobileImages/Mobile2.png";
import Mobile3 from "@/app/assets/Hero_MobileImages/Mobile3.png";
import Mobile4 from "@/app/assets/Hero_MobileImages/Mobile4.png";
import Mobile5 from "@/app/assets/Hero_MobileImages/Mobile5.png"

const slides = [
  {
    desktop: BannerImg4,
    mobile: Mobile5,
  },
  {
    desktop: BannerImg2,
    mobile: Mobile1,
  },
  {
    desktop: BannerImg3,
    mobile: Mobile2,
  },
  {
    desktop: BannerImg5,
    mobile: Mobile3,
  },
  {
    desktop: BannerImg6,
    mobile: Mobile4,
  },
];


const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const HomeBannerSection = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef(null);
  const debounceRef = useRef(null);
  const dispatch = useDispatch();
  const { results, loading } = useSelector((state) => state.search);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeSlide = useMemo(() => slides[activeIndex] ?? slides[0], [activeIndex]);



  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setSearchTerm(value);
        if (value.trim().length >= 2) {
          dispatch(searchPackages(value));
          setShowDropdown(true);
        } else {
          dispatch(clearSearchResults());
          setShowDropdown(false);
        }
      }, 100);
    },
    [dispatch]
  );

  const handleSearchSubmit = useCallback(() => {
    if (searchTerm.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  }, [searchTerm, router]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") handleSearchSubmit();
    },
    [handleSearchSubmit]
  );

  const handlePackageClick = useCallback(
    (pkg) => {
      setShowDropdown(false);
      router.push(`/package/${pkg.slug}`);
    },
    [router]
  );

  return (
    <MainLayout className="relative w-full h-[420px] lg:h-[90vh] p-0 z-10">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Swiper
  modules={[Autoplay, EffectFade, Pagination]}
  effect="fade"
  fadeEffect={{ crossFade: true }}
  grabCursor={false}
  loop
  speed={1600}
  autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: false }}
  pagination={{
    clickable: true,
    dynamicBullets: true,
    renderBullet: (_, className) =>
      `<span class="${className} bg-white/60 w-3 h-3 rounded-full shadow transition-all duration-500"></span>`,
  }}
  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
  className="h-full w-full"
  allowTouchMove={false}
>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full overflow-hidden">
                <>
<Image
  src={slide.desktop}
  alt={`Desktop Banner ${index + 1}`}
  fill
  priority={index < 2}
  quality={85}
  sizes="100vw"
  className="hidden md:block object-cover"
/>

<Image
  src={slide.mobile}
  alt={`Mobile Banner ${index + 1}`}
  fill
  priority={index < 2}
  quality={85}
  sizes="100vw"
  className="block md:hidden object-cover"
/>
</>
                <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/55" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <motion.div
        className="absolute inset-0 z-30 flex items-center pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="px-4  max-w-7xl mx-auto w-full pointer-events-auto">
          <motion.div className="text-white max-w-5xl" variants={staggerContainer}>
            <motion.div variants={textVariants}>
              <motion.h1
                key={activeIndex}
                className="font-black  text-5xl sm:text-7xl  bg-gradient-to-r from-white via-emerald-50 to-blue-100 bg-clip-text text-transparent mb-6 drop-shadow-4xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-block">{activeSlide.title}</span>
                <br />
                <span className="inline-">{activeSlide.subtitle}</span>
              </motion.h1>
            </motion.div>
            <motion.p
              key={`desc-${activeIndex}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className=" mb-8 text-lg sm:text-xl text-white/95 leading-relaxed max-w-2xl font-light tracking-wide"
            >
              {activeSlide.desc}
            </motion.p>
            <motion.div variants={textVariants} className="mb-12">
              <div ref={searchContainerRef} className="relative w-full max-w-2xl ">
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-[115%] left-0 w-full  max-w-2xl bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden z-[999]"
                    >
                      <div className="max-h-[300px] overflow-y-auto custom-search-scrollbar py-2">
                        {loading ? (
                          <div className="px-6 py-8 text-center text-gray-500">
                            Loading...
                          </div>
                        ) : results?.length > 0 ? (
                          results.map((pkg) => (
                            <div
                              key={pkg._id}
                              className="flex items-center gap-4 px-5 py-3 hover:bg-red-50 border-b border-gray-50 last:border-0 cursor-pointer transition-colors"
                              onClick={() => handlePackageClick(pkg)}
                            >
                              <CustomImage
                                src={pkg.images?.[0]}
                                alt={pkg.packageName}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-sm flex-shrink-0"
                              />

                              <div className="flex flex-col">
                                <span className="text-sm sm:text-base font-bold text-gray-800 line-clamp-1">
                                  {pkg.packageName}
                                </span>
                                <span className="text-xs sm:text-sm text-gray-500 font-medium">
                                  {pkg.zoneId?.name}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-6 py-8 text-center text-gray-500">
                            No packages found
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-search-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-search-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
          .custom-search-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
          .custom-search-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        `
      }} />
    </MainLayout>
  );
};

export default HomeBannerSection;