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
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides =[
  {
    image: BannerImg1,
    title: "Live the Moments",
    subtitle: "Love the Journey.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
  {
    image: BannerImg2,
    title: "The World is Too",
    subtitle: "Big to Stay Home.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
  {
    image: BannerImg3,
    title: "Go Somewhere You’ve",
    subtitle: "Never Felt Before.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
  {
    image: BannerImg4,
    title: "Where Every Trip",
    subtitle: "Becomes a Story.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
  {
    image: BannerImg5,
    title: "Pack Your Bags",
    subtitle: "We’ll Handle the Rest.",
    desc: "Plan your dream escape — mountains, beaches, cities & more!",
  },
];

// Mock Data for the search dropdown
const searchPackages =[
  { id: "maldives-package", title: "New Package", location: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=100&q=80" },
  { id: "bali-romantic", title: "Romantic Getaway", location: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=100&q=80" },
  { id: "swiss-alps", title: "Mountain Adventure", location: "Swiss Alps", image: "https://images.unsplash.com/photo-1531366936337-7785a649c758?auto=format&fit=crop&w=100&q=80" },
  { id: "dubai-safari", title: "Desert Safari", location: "Dubai, UAE", image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=100&q=80" },
  { id: "phuket-paradise", title: "Tropical Paradise", location: "Phuket, Thailand", image: "https://images.unsplash.com/photo-1589394815804-964ce0fae2eb?auto=format&fit=crop&w=100&q=80" }
];

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease:[0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3
    }
  }
};

const HomeBannerSection = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // Search State
  const [searchTerm, setSearchTerm] = useState("");
  const[showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef(null);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  },[]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeSlide = slides[activeIndex || 0];

  const filteredPackages = searchPackages.filter(pkg => 
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    // REMOVED 'overflow-hidden' from MainLayout to allow Dropdown to overlap other sections
    <MainLayout className="relative w-full h-[420px] lg:h-[90vh] p-0 z-10">
      
      {/* BACKGROUND SWIPER (Clipped to not spill out) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          grabCursor={true}
          loop={true}
          speed={1800}
          autoplay={{ 
            delay: 4500, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) => 
              `<span class="${className} bg-gradient-to-r from-emerald-400/80 via-white/60 to-blue-400/80 w-3 h-3 rounded-full shadow-2xl backdrop-blur-xl transition-all duration-700 hover:scale-175 hover:rotate-360"></span>`
          }}
          onSwiper={(swiper) => { swiperRef.current = swiper }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <motion.div 
                className="relative w-full h-full rounded-b-xl overflow-hidden group backdrop-blur-sm"
                initial={{ scale: 1.1, filter: "blur(10px)" }}
                animate={{ 
                  scale: activeIndex === index ? 1.02 : 1.15,
                  filter: activeIndex === index ? "blur(0px)" : "blur(15px)",
                  brightness: activeIndex === index ? 1 : 0.7
                }}
                transition={{ 
                  duration: 2, 
                  ease:[0.25, 0.46, 0.45, 0.94]
                }}
              >
                <Image
                  src={slide.image}
                  alt={`Banner ${index + 1}`}
                  fill
                  sizes="100vw"
                  priority={index === 0 || index === 1 || index === 2}
                  quality={90}
                  className="object-cover transition-all duration-2000 origin-center"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent/40 to-black/60" />
                <motion.div 
                  className="absolute inset-0 opacity-75"
                  style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 50%)" }}
                />
                
                {/* Multi-layer Glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/15 to-purple-500/20 blur-3xl"
                  animate={{ 
                    scale: activeIndex === index ? 1.2 : 1,
                    opacity: activeIndex === index ? 1 : 0.3,
                    rotate: activeIndex === index ? 360 : 0
                  }}
                  transition={{ 
                    duration: 3,
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                  }}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CONTENT LAYER */}
      <motion.div 
        className="absolute inset-0 z-30 flex items-center pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full pointer-events-auto">
          <motion.div className="text-white max-w-5xl" variants={staggerContainer}>
            
            {/* HERO TITLE */}
            <motion.div variants={textVariants}>
              <motion.h1 
                className="font-black leading-[0.88] text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-[-0.04em] bg-gradient-to-r from-white via-emerald-50 to-blue-100 bg-clip-text text-transparent mb-6 lg:mb-10 drop-shadow-4xl p-1 lg:p-3"
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.6, ease:[0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  initial={{ opacity: 0, scaleX: 0.3 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  className="inline-block pb-1 lg:pb-3"
                >
                  {activeSlide.title}
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, scaleX: 0.3 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 1 }}
                  className="inline-block"
                >
                  {activeSlide.subtitle}
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p 
              variants={textVariants}
              className="mt-4 mb-8 text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white/95 leading-relaxed max-w-4xl font-light tracking-wide backdrop-blur-sm"
            >
              {activeSlide.desc}
            </motion.p>

            {/* ✨ UPDATED INTEGRATED SEARCH COMPONENT ✨ */}
            <motion.div variants={textVariants} className="mb-12">
              <div ref={searchContainerRef} className="relative w-full max-w-2xl lg:max-w-3xl">
                
                {/* Pill Shaped Search Bar - Button neatly inside the white border */}
                <div className="bg-white rounded-full p-1.5 flex items-center shadow-2xl relative z-[60] border-2 border-transparent transition-all duration-300">
                  <input
                    type="text"
                    placeholder="Search destination, packages..."
                    className="flex-1 bg-transparent px-4 sm:px-6 py-2 sm:py-3 text-gray-800 outline-none text-sm sm:text-base lg:text-lg placeholder:text-gray-400 font-medium w-full rounded-l-full"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                  />
                  {/* Red Search Button perfectly contained */}
                  <button 
                    onClick={handleSearchSubmit}
                    className="bg-red-600 hover:bg-red-700 transition-colors text-white rounded-full h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 flex items-center justify-center shadow-md flex-shrink-0"
                  >
                    <Search size={20} strokeWidth={2.5} className="sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Overflow Popup Dropdown */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-[115%] left-0 w-full sm:w-[85%] lg:w-[75%] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden z-[999]"
                    >
                      <div className="max-h-[300px] overflow-y-auto custom-search-scrollbar py-2">
                        {filteredPackages.length > 0 ? (
                          filteredPackages.map((pkg) => (
                            <div 
                              key={pkg.id} 
                              className="flex items-center gap-4 px-5 py-3 hover:bg-red-50 border-b border-gray-50 last:border-0 cursor-pointer transition-colors"
                              onClick={() => {
                                setSearchTerm(pkg.title);
                                setShowDropdown(false);
                                // This will navigate to the specific package page!
                                router.push(`/package/${pkg.id}`);
                              }}
                            >
                              <img src={pkg.image} alt={pkg.title} className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-sm flex-shrink-0" />
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

      {/* Global styles for the shadows and custom scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .shadow-neon-glow {
          box-shadow: 
            0 0 40px rgba(6, 78, 59, 0.8),
            0 0 80px rgba(6, 78, 59, 0.4),
            0 0 120px rgba(59, 130, 246, 0.3),
            inset 0 0 40px rgba(255, 255, 255, 0.2);
        }
        .custom-search-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-search-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
          border-radius: 10px;
        }
        .custom-search-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db; 
          border-radius: 10px;
        }
        .custom-search-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af; 
        }
      `}} />
    </MainLayout>
  );
};

export default HomeBannerSection;