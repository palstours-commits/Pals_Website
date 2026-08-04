"use client";
import PackageBanner from "@/app/assets/package_bg.png";
import Flight_Movement from "@/app/common/Flight_Movement";
import CustomImage from "@/app/common/Image";
import MainLayout from "@/app/common/MainLayout";
import Message_Popups from "@/app/common/Message_Popups";
import { clearEnquiryState, submitEnquiry } from "@/app/store/slice/enquirySlice";
import { getPackagesById } from "@/app/store/slice/packageSlice";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItineraryAccordion } from "./ItineraryAccordion";
import PackageBaneer from "./PackageBanner";
import { ImageCarousel } from "./ImageCarousel";
import { EnhancedPackageForm } from "./EnhancedPackageForm";
import { parseHtmlList } from "@/app/utils/textConvertor";
import RouteTimeline from "./RouteTimeline";

const PackageDetails = ({ slug }) => {
  const tabs = [
    "Overview",
    "Trip Highlights",
    "Destinations",
    "Tour Itinerary",
    "Information",
  ];

  const dispatch = useDispatch();
  const [active, setActive] = useState("Overview");
  const [activeInfoIndex, setActiveInfoIndex] = useState(0);
  const { singlePackage } = useSelector((state) => state.packages);
  const { message, error } = useSelector((state) => state.enquiry);
  const [showFlightAnimation, setShowFlightAnimation] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [popupType, setPopupType] = useState('success');
  const [popupMessage, setPopupMessage] = useState('');
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const overviewRef = useRef(null);
  const mapRef = useRef(null)
  const highlightsRef = useRef(null);
  const destinationsRef = useRef(null);
  const itineraryRef = useRef(null);
  const informationRef = useRef(null);

  const bannerImages = singlePackage?.images?.length > 0
    ? singlePackage.images.map(img => img)
    : [PackageBanner.src];

  console.log(bannerImages[0]);

  useEffect(() => {
    if (slug) {
      dispatch(getPackagesById(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (singlePackage?.images?.length > 0) {
      setAllImages(singlePackage.images);
    }
  }, [singlePackage]);

  const importantInfo = singlePackage?.importantInfo || [];
  const overviewIcons = singlePackage?.overview?.icon || [];
  const gridImages = allImages.slice(0, 6);
  const tripHighlights = parseHtmlList(singlePackage?.tripHighlights);

  useEffect(() => {
    if (message && !error) {
      setShowFlightAnimation(true);
    }

    if (error) {
      const errorMessage = typeof error === "string" ? error : error?.message || "Something went wrong.";
      setPopupType("error");
      setPopupMessage(errorMessage);
      setShowResultPopup(true);
      dispatch(clearEnquiryState());
    }
  }, [message, error, dispatch]);

  const handleFlightAnimationComplete = () => {
    setShowFlightAnimation(false);
    dispatch(clearEnquiryState());
  };

  useEffect(() => {
    if (importantInfo.length > 0) {
      setActiveInfoIndex(0);
    }
  }, [importantInfo]);

  const handleTabClick = (tab) => {
    setActive(tab);
    setIsMobileMenuOpen(false);

    let ref = null;
    switch (tab) {
      case "Overview":
        ref = overviewRef;
        break;
      case "Trip Highlights":
        ref = highlightsRef;
        break;
      case "Destinations":
        ref = destinationsRef;
        break;
      case "Map":
        ref = mapRef;
        break;
      case "Tour Itinerary":
        ref = itineraryRef;
        break;
      case "Information":
        ref = informationRef;
        break;
      default:
        return;
    }

    if (ref && ref.current) {
      const offset = 180;
      const elementPosition = ref.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: overviewRef, name: "Overview" },
        { ref: highlightsRef, name: "Trip Highlights" },
        { ref: destinationsRef, name: "Destinations" },
        { ref: mapRef, name: "Map" },
        { ref: itineraryRef, name: "Tour Itinerary" },
        { ref: informationRef, name: "Information" },
      ];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActive(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConfirmRequest = (formData) => {
    const submitData = {
      ...formData,
      packageId: singlePackage?._id?.toString() || formData.packageId?.toString()
    };
    setPendingFormData(submitData);
    setShowConfirmPopup(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmPopup(false);
    if (pendingFormData) {
      dispatch(submitEnquiry(pendingFormData));
      setPendingFormData(null);
    }
  };

  const handleClosePopups = () => {
    setShowConfirmPopup(false);
    setShowResultPopup(false);
    setPopupMessage('');
    setPendingFormData(null);
  };

  const handleImageClick = (index) => {
    setGalleryIndex(index);
    setShowGallery(true);
  };

  const handleNextImage = useCallback(() => {
    setGalleryIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const handlePrevImage = useCallback(() => {
    setGalleryIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const handleCloseGallery = () => {
    setShowGallery(false);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Flight_Movement
        isOpen={showFlightAnimation}
        onAnimationComplete={handleFlightAnimationComplete}
        autoTriggerOnSuccess={true}
      />
      <AnimatePresence>
        {showGallery && (
          <ImageCarousel
            images={allImages}
            currentIndex={galleryIndex}
            onNext={handleNextImage}
            onPrev={handlePrevImage}
            onClose={handleCloseGallery}
          />
        )}
      </AnimatePresence>
      <PackageBaneer images={bannerImages} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-secondary py-4 sm:py-6 md:py-8 sticky top-20 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-white w-full sm:w-auto"
          >
            <h4 className="mb-1 font-semibold capitalize text-lg sm:text-xl">
              {singlePackage?.packageName}
            </h4>
            <p className="flex items-center gap-2 text-sm sm:text-base">
              <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />
              {singlePackage?.nights} Nights / {singlePackage?.days} Days
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTabClick("Get a Quote")}
            className="text-sm bg-primary hover:opacity-90 transition text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold w-full sm:w-auto cursor-pointer"
          >
            Get a Quote
          </motion.button>
        </div>
      </motion.div>

      <div className="w-full py-6   sticky top-[60px] sm:top-[72px] md:top-[200px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-5 ">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-full px-4 py-3 bg-gray-100 rounded-xl flex items-center justify-between"
          >
            <span className="font-semibold">{active}</span>
            <svg className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute left-0 right-0 top-full mt-2 bg-white shadow-xl rounded-xl overflow-hidden "
            >
              {tabs?.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`w-full px-4 text-left transition-all cursor-pointer ${active === tab
                    ? "bg-red-50 text-primary font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden md:flex gap-2 items-center overflow-x-auto scrollbar-hide py-4 "
          >
            {tabs?.map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabClick(tab)}
                className={`px-4 lg:px-6 py-2 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer text-sm lg:text-base ${active === tab
                  ? "border border-primary text-primary bg-primary-light shadow-lg"
                  : "text-black hover:text-primary"
                  }`}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        ref={overviewRef}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      >
        <motion.h4
          variants={fadeInUp}
          id="overview"
          className="font-semibold mb-4 text-xl sm:text-2xl"
        >
          Overview
        </motion.h4>
        <motion.p
          variants={fadeInUp}
          className="text-gray-900 leading-relaxed text-base sm:text-lg"
        >
          {singlePackage?.overview?.Description}
        </motion.p>

        {overviewIcons.length > 0 && (
          <motion.div
            variants={fadeInUp}
            className="max-w-4xl mx-auto px-4 sm:px-6 md:px-0 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-20 mt-8 sm:mt-12"
          >
            {overviewIcons.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-2 sm:gap-4"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-md p-3 sm:p-4">
                  <CustomImage
                    src={item.iconPath}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h5 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 text-center">
                  {item.name}
                </h5>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        ref={highlightsRef}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.h4
            variants={fadeInUp}
            id="trip-highlights"
            className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-12 scroll-mt-[180px]"
          >
            Trip Highlights
          </motion.h4>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-stretch">
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl p-6 sm:p-8 h-full bg-white shadow-lg"
            >
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-[17px] leading-relaxed">
                {tripHighlights.length > 0 && (
                  <ul className="space-y-3 sm:space-y-4 text-sm sm:text-[17px] leading-relaxed">
                    {tripHighlights.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-2 w-2 h-2 bg-red-600 rounded-full shrink-0" />
                        <p>{item}</p>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-12 gap-2 auto-rows-[220px]"
            >
              {gridImages.slice(0, 5).map((image, index) => {
                const layouts = [
                  "col-span-12 md:col-span-8 row-span-2",
                  "col-span-6 md:col-span-4",
                  "col-span-6 md:col-span-4",
                  "col-span-6 md:col-span-6",
                  "col-span-6 md:col-span-6",
                ];
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleImageClick(index)}
                    className={`relative overflow-hidden rounded-3xl cursor-pointer group ${layouts[index]}`}
                  >
                    <CustomImage
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div
        ref={destinationsRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full bg-gradient-to-r from-red-600 to-red-500 py-6 sm:py-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center text-white px-4">
          <div className="flex items-center justify-center gap-2 text-center flex-wrap">
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex-shrink-0"
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>

            <h4
              id="destinations"
              className="font-semibold text-sm sm:text-base md:text-lg"
            >
              {singlePackage?.destinations?.join(", ")}
            </h4>
          </div>
        </div>
      </motion.div>
      {/* <div
          ref={mapRef}
          id="map"
          className="max-w-7xl mx-auto mt-10 md:mt-25 hidden md:block px-6">
          <RouteTimeline destinations={singlePackage?.destinations} />
        </div> */}
      <motion.div
        ref={itineraryRef}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <motion.div variants={fadeInUp} id="tour-itinerary">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 cursor">Tour Itinerary</h2>
          <ItineraryAccordion items={singlePackage?.itinerary} />
        </motion.div>
      </motion.div>

      <motion.div
        ref={informationRef}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-12 sm:py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-stretch">
            <motion.div
              variants={fadeInUp}
              className="h-auto lg:h-[600px] overflow-y-auto pr-2 sm:pr-4 scrollbar-thin scrollbar-thumb-gray-300"
            >
              <h2
                id="information"
                className="font-bold mb-6 sm:mb-8 text-2xl sm:text-3xl"
              >
                Important Information
              </h2>

              <div className="flex gap-2 sm:gap-3 mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2 p-2">
                {importantInfo.length === 0 ? (
                  <span className="text-gray-400 text-xs sm:text-sm">No information available</span>
                ) : (
                  importantInfo.map((info, index) => (
                    <motion.button
                      key={info._id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveInfoIndex(index)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm md:text-base transition-all shrink-0 cursor-pointer
                        ${activeInfoIndex === index
                          ? "bg-red-600 text-white border-red-600 shadow-lg"
                          : "border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-600"
                        }`}
                    >
                      {info.title}
                    </motion.button>
                  ))
                )}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeInfoIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                    Hotel Accommodation Details
                  </h4>
                  {importantInfo[activeInfoIndex] && (
                    <div
                      className="text-gray-700 leading-relaxed text-sm sm:text-base prose prose-red max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: importantInfo[activeInfoIndex].content,
                      }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="h-auto "
            >
              <EnhancedPackageForm
                packageId={singlePackage?._id}
                packageName={
                  <>
                    <span className="font-semibold text-gray-800 text-base sm:text-[20px]">{singlePackage?.packageName}</span>
                    <span className="text-xs sm:text-sm"> {singlePackage?.nights} Nights / {singlePackage?.days} Days</span>
                  </>
                }
                onConfirm={handleConfirmRequest}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <MainLayout className="w-full bg-gradient-to-r from-[#e6dcc8] to-[#d6ccb8] py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
                    flex flex-col md:flex-row 
                    items-start md:items-center 
                    justify-between gap-6 sm:gap-10"
        >
          <div className="max-w-xl">
            <h4 className="mb-2 font-semibold text-xl sm:text-2xl">
              Customize Your Trip
            </h4>
            <p className="text-gray-900 text-sm sm:text-base leading-relaxed">
              Create a travel experience tailored to your preferences, budget,
              and schedule for a truly personalized journey.
            </p>
          </div>
          <Link href={"/contact-us"} className="w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 bg-red-600 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Customize your Trip
            </motion.button>
          </Link>
        </motion.div>
      </MainLayout>

      <Message_Popups
        isOpen={showConfirmPopup}
        type="confirm"
        onClose={handleClosePopups}
        onConfirm={handleConfirmSubmit}
      />
      {popupType === "error" && (
        <Message_Popups
          isOpen={showResultPopup}
          type="error"
          onClose={handleClosePopups}
        >
          <div className="text-center p-4">
            <p className="text-sm text-gray-800">{popupMessage}</p>
          </div>
        </Message_Popups>
      )}
    </>
  );
};

export default PackageDetails;