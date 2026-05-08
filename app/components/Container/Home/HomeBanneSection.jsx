"use client";
import BannerImg1 from "@/app/assets/banner_img.svg";
import BannerImg2 from "@/app/assets/BannerImg2.svg";
import BannerImg3 from "@/app/assets/BannerImg3.svg";
import BannerImg4 from "@/app/assets/BannerImg4.svg";
import BannerImg5 from "@/app/assets/BannerImg5.svg";
import MainLayout from "@/app/common/MainLayout";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  { image: BannerImg1, title: "Live the Moments", subtitle: "Love the Journey.", desc: "Plan your dream escape — mountains, beaches, cities & more!" },
  { image: BannerImg2, title: "The World is Too", subtitle: "Big to Stay Home.", desc: "Plan your dream escape — mountains, beaches, cities & more!" },
  { image: BannerImg3, title: "Go Somewhere You've", subtitle: "Never Felt Before.", desc: "Plan your dream escape — mountains, beaches, cities & more!" },
  { image: BannerImg4, title: "Where Every Trip", subtitle: "Becomes a Story.", desc: "Plan your dream escape — mountains, beaches, cities & more!" },
  { image: BannerImg5, title: "Pack Your Bags", subtitle: "We'll Handle the Rest.", desc: "Plan your dream escape — mountains, beaches, cities & more!" },
];

const searchPackages = [
  { id: "maldives-package", title: "New Package", location: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=100&q=80" },
  { id: "bali-romantic", title: "Romantic Getaway", location: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=100&q=80" },
  { id: "swiss-alps", title: "Mountain Adventure", location: "Swiss Alps", image: "https://images.unsplash.com/photo-1531366936337-7785a649c758?auto=format&fit=crop&w=100&q=80" },
  { id: "dubai-safari", title: "Desert Safari", location: "Dubai, UAE", image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=100&q=80" },
  { id: "phuket-paradise", title: "Tropical Paradise", location: "Phuket, Thailand", image: "https://images.unsplash.com/photo-1589394815804-964ce0fae2eb?auto=format&fit=crop&w=100&q=80" },
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

  const filteredPackages = useMemo(
    () =>
      searchPackages.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const handleSearchChange = useCallback((e) => {
    const val = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchTerm(val);
      setShowDropdown(true);
    }, 120);
  }, []);

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
      setSearchTerm(pkg.title);
      setShowDropdown(false);
      router.push(`/package/${pkg.id}`);
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
          grabCursor
          loop
          speed={1600}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (_, className) =>
              `<span class="${className} bg-white/60 w-3 h-3 rounded-full shadow transition-all duration-500"></span>`,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full rounded-b-xl overflow-hidden">
                <Image
                  src={slide.image}
                  alt={`Banner ${index + 1}`}
                  fill
                  sizes="100vw"
                  priority={index < 2}
                  quality={85}
                  className="object-cover"
                />
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
        <div className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full pointer-events-auto">
          <motion.div className="text-white max-w-5xl" variants={staggerContainer}>
            <motion.div variants={textVariants}>
              <motion.h1
                key={activeIndex}
                className="font-black leading-[0.88] text-5xl sm:text-7xl tracking-[-0.04em] bg-gradient-to-r from-white via-emerald-50 to-blue-100 bg-clip-text text-transparent mb-6 drop-shadow-4xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-block pb-1 lg:pb-3">{activeSlide.title}</span>
                <br />
                <span className="inline-block">{activeSlide.subtitle}</span>
              </motion.h1>
            </motion.div>

            <motion.p
              key={`desc-${activeIndex}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 mb-8 text-lg sm:text-xl text-white/95 leading-relaxed max-w-4xl font-light tracking-wide"
            >
              {activeSlide.desc}
            </motion.p>

            <motion.div variants={textVariants} className="mb-12">
              <div ref={searchContainerRef} className="relative w-full max-w-2xl lg:max-w-3xl">
                <div className="bg-white rounded-full p-1.5 flex items-center shadow-2xl relative z-[60] border-2 border-transparent">
                  <input
                    type="text"
                    placeholder="Search destination, packages..."
                    className="flex-1 bg-transparent px-4 sm:px-6 py-2 sm:py-3 text-gray-800 outline-none text-sm sm:text-base lg:text-lg placeholder:text-gray-400 font-medium w-full rounded-l-full"
                    defaultValue=""
                    onChange={handleSearchChange}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    onClick={handleSearchSubmit}
                    className="bg-red-600 hover:bg-red-700 transition-colors text-white rounded-full h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 flex items-center justify-center shadow-md flex-shrink-0"
                  >
                    <Search size={20} strokeWidth={2.5} className="sm:w-6 sm:h-6" />
                  </button>
                </div>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-[115%] left-0 w-full sm:w-[85%] lg:w-[75%] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden z-[999]"
                    >
                      <div className="max-h-[300px] overflow-y-auto custom-search-scrollbar py-2">
                        {filteredPackages.length > 0 ? (
                          filteredPackages.map((pkg) => (
                            <div
                              key={pkg.id}
                              className="flex items-center gap-4 px-5 py-3 hover:bg-red-50 border-b border-gray-50 last:border-0 cursor-pointer transition-colors"
                              onClick={() => handlePackageClick(pkg)}
                            >
                              <img
                                src={pkg.image}
                                alt={pkg.title}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-sm flex-shrink-0"
                              />
                              <div className="flex flex-col">
                                <span className="text-sm sm:text-base font-bold text-gray-800 line-clamp-1">{pkg.title}</span>
                                <span className="text-xs sm:text-sm text-gray-500 font-medium">{pkg.location}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-6 py-8 text-center text-gray-500 font-medium text-sm sm:text-base">
                            No packages found for "{searchTerm}"
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