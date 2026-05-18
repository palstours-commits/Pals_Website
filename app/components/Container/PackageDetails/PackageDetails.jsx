"use client";
import PackageBanner from "@/app/assets/package_bg.png";
import travel1 from "@/app/assets/travelimg1.svg";
import travel2 from "@/app/assets/travelimg2.svg";
import travel3 from "@/app/assets/travelimg3.svg";
import travel4 from "@/app/assets/travelimg4.svg";
import travel5 from "@/app/assets/travelimg5.svg";
import travel6 from "@/app/assets/travelimg6.svg";
import Flight_Movement from "@/app/common/Flight_Movement";
import CustomImage from "@/app/common/Image";
import MainLayout from "@/app/common/MainLayout";
import Message_Popups from "@/app/common/Message_Popups";
import { clearEnquiryState, submitEnquiry } from "@/app/store/slice/enquirySlice";
import { getPackagesById } from "@/app/store/slice/packageSlice";
import { getImageUrl } from "@/app/utils/getImageUrl";
import { AnimatePresence, motion } from "framer-motion";
import { BookText, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItineraryAccordion } from "./ItineraryAccordion";
import PackageBaneer from "./PackageBanner";

const fallbackImages = [travel1, travel2, travel3, travel4, travel5, travel6];

const FloatingLabelInput = ({ label, name, value, onChange, placeholder, required = false, isTextarea = false, type = "text", error, min, max }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value !== "" && value !== null && value !== undefined || type === "date";

  return (
    <div className="relative mt-2 w-full">
      <label className={`absolute left-3 px-1.5 transition-all duration-200 pointer-events-none z-10 ${isFloating ? "-top-2.5 text-[11px] font-bold text-gray-800 bg-white" : "top-3.5 text-gray-500 text-sm bg-transparent"}`}>
        {label.toUpperCase()} {required && <span className="text-red-500">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none`}
          rows="4"
          placeholder={isFocused ? placeholder : ""}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          min={min}
          max={max}
          className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none transition-all`}
          placeholder={isFocused ? placeholder : ""}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};

const EnhancedPackageForm = ({ packageId, packageName, onConfirm }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.enquiry);

  const [formData, setFormData] = useState({
    packageId: packageId,
    name: "",
    email: "",
    phone: "",
    country: "",
    numberOfPersons: "",
    date: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    numberOfPersons: "",
    date: "",
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      packageId: packageId
    }));
  }, [packageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'numberOfPersons') {
      const numValue = parseInt(value) || 1;
      setFormData({ ...formData, [name]: numValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.packageId) {
      newErrors.packageId = "Package ID is required";
      isValid = false;
    }

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    if (!formData.date) {
      newErrors.date = "Departure date is required";
      isValid = false;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const departureDate = new Date(formData.date);
      if (departureDate < today) {
        newErrors.date = "Departure date must be in the future";
        isValid = false;
      }
    }

    if (!formData.numberOfPersons || formData.numberOfPersons < 0) {
      newErrors.numberOfPersons = "At least 1 person is required";
      isValid = false;
    } else if (formData.numberOfPersons > 50) {
      newErrors.numberOfPersons = "Maximum 50 persons allowed. For larger groups, please contact us directly.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        ...formData,
        packageId: packageId
      };
      dispatch(submitEnquiry(submitData));
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const hasErrors = Object.keys(errors).some(key => errors[key]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] shadow-2xl border border-gray-100 h-full overflow-y-auto"
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-red-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-white">
          <BookText size={24} className="sm:w-[30px] sm:h-[30px]" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black">Grab This Package</h2>
          <span className="text-gray-500 text-xs sm:text-sm">{packageName}</span>
        </div>
      </div>
      {hasErrors && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 font-semibold mb-2 text-sm sm:text-base">Please fix the following errors:</p>
          <ul className="list-disc list-inside text-xs sm:text-sm text-red-500">
            {Object.values(errors).map((error, index) => error && <li key={index}>{error}</li>)}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmitClick}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FloatingLabelInput
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            error={errors.name}
          />
          <FloatingLabelInput
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
            error={errors.email}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FloatingLabelInput
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            type="tel"
            error={errors.phone}
          />
          <FloatingLabelInput
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            error={errors.country}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FloatingLabelInput
            label="Number of Persons"
            name="numberOfPersons"
            value={formData.numberOfPersons}
            onChange={handleChange}
            type="number"
            max="50"
            required
            error={errors.numberOfPersons}
            placeholder="Enter number of travelers"
          />
          <FloatingLabelInput
            label="Departure Date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            type="date"
            required
            error={errors.date}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <FloatingLabelInput
          label="Special Requests"
          name="message"
          value={formData.message}
          onChange={handleChange}
          isTextarea
          placeholder="Tell us about your preferences, dietary requirements, or any special requests..."
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full mt-4 sm:mt-6 bg-gray-900 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl hover:bg-red-600 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {loading ? "Processing..." : "Book This Package"}
        </motion.button>
      </form>
    </motion.div>
  );
};

const ImageCarousel = ({ images, currentIndex, onNext, onPrev, onClose }) => {
  if (!images || images.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-6xl mx-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden">
          <CustomImage
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            className="object-contain"
          />
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </>
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all"
        >
          <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
        {images.length > 1 && (
          <div className="absolute -bottom-20 sm:-bottom-24 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 p-2 bg-black/50 backdrop-blur-sm rounded-xl overflow-x-auto max-w-[90vw]">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onPrev()}
                className={`relative w-10 h-10 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all flex-shrink-0 ${idx === currentIndex ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'
                  }`}
              >
                <CustomImage
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const PackageDetails = ({ slug }) => {
  const tabs = [
    "Overview",
    "Trip Highlights",
    "Destinations",
    "Tour Itinerary",
    "Information",
    "Get a Quote",
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
  const highlightsRef = useRef(null);
  const destinationsRef = useRef(null);
  const itineraryRef = useRef(null);
  const informationRef = useRef(null);
  const quoteRef = useRef(null);

  const bannerImages = singlePackage?.images?.length > 0
    ? singlePackage.images.map(img => `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${img}`)
    : [PackageBanner.src];

  useEffect(() => {
    if (slug) {
      dispatch(getPackagesById(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (singlePackage?.images?.length > 0) {
      const processedImages = singlePackage.images.map(getImageUrl);
      setAllImages(processedImages);
    } else {
      setAllImages(fallbackImages);
    }
  }, [singlePackage]);

  const points = singlePackage?.tripHighlightsPoints || [];
  const importantInfo = singlePackage?.importantInfo || [];
  const overviewIcons = singlePackage?.overview?.icon || [];
  const gridImages = allImages.slice(0, 6);
  const carouselImages = allImages.slice(6);

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
      case "Tour Itinerary":
        ref = itineraryRef;
        break;
      case "Information":
        ref = informationRef;
        break;
      case "Get a Quote":
        ref = quoteRef;
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
        { ref: itineraryRef, name: "Tour Itinerary" },
        { ref: informationRef, name: "Information" },
        { ref: quoteRef, name: "Get a Quote" }
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
      
      {/* Mobile Sticky Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-secondary py-4 sm:py-6 md:py-8 sticky top-0 z-50"
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
            className="text-sm bg-primary hover:opacity-90 transition text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold w-full sm:w-auto"
          >
            Get a Quote
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Tabs Dropdown */}
      <div className="w-full pt-6 sm:pt-10 sticky top-[60px] sm:top-[72px] md:top-[80px] pb-4 sm:pb-6 z-40 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Dropdown Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-full px-4 py-3 bg-gray-100 rounded-xl flex items-center justify-between"
          >
            <span className="font-semibold">{active}</span>
            <svg className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute left-0 right-0 top-full mt-2 bg-white shadow-xl rounded-xl overflow-hidden z-50"
            >
              {tabs?.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`w-full px-4 py-3 text-left transition-all ${active === tab
                    ? "bg-red-50 text-primary font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>
          )}

          {/* Desktop Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden md:flex gap-2 items-center overflow-x-auto scrollbar-hide p-1"
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

      {/* Overview Section */}
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

      {/* Trip Highlights Section */}
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
                {points?.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-2 w-2 h-2 bg-red-600 rounded-full shrink-0"></span>
                    <p>{item}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[220px] relative"
            >
              {gridImages.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleImageClick(index)}
                  className={`relative rounded-2xl sm:rounded-3xl overflow-hidden snap-start shadow-lg cursor-pointer ${index === 0 ? "col-span-2 md:col-span-3" :
                    index === 1 ? "col-span-2 md:col-span-3" :
                      index === 2 ? "col-span-2 md:col-span-2" :
                        index === 3 ? "col-span-2 md:col-span-2" :
                          index === 4 ? "col-span-2 md:col-span-4" :
                            "col-span-2 md:col-span-2 md:row-span-2"
                    }`}
                >
                  <CustomImage
                    src={image}
                    alt={`Highlight ${index + 1}`}
                    fill
                    className="object-cover transition duration-500 hover:scale-110"
                  />
                </motion.div>
              ))}

              {carouselImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => handleImageClick(6)}
                  className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-10 cursor-pointer"
                >
                  <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 hover:bg-black/90 transition-all text-xs sm:text-sm">
                    <span className="font-semibold">+{carouselImages.length} More</span>
                    <ChevronRight size={14} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Destinations Section */}
      <motion.div
        ref={destinationsRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full bg-gradient-to-r from-red-600 to-red-500 py-6 sm:py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-white">
          <motion.div
            animate={{
              x: [0, 10, 0],
              transition: { duration: 2, repeat: Infinity }
            }}
            className="flex items-center gap-2 text-center flex-wrap justify-center"
          >
            <MapPin className="shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
            <h4 id="destinations" className="font-semibold text-sm sm:text-base md:text-lg">
              Bangalore - Mysore - Hassan – Hospet - Hampi – Badami - Goa - Mumbai.
            </h4>
          </motion.div>
        </div>
      </motion.div>

      {/* Tour Itinerary Section */}
      <motion.div
        ref={itineraryRef}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <motion.div variants={fadeInUp} id="tour-itinerary">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">Tour Itinerary</h2>
          <ItineraryAccordion items={singlePackage?.itinerary} />
        </motion.div>
      </motion.div>

      {/* Information & Quote Section */}
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

              <div className="flex gap-2 sm:gap-3 mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
                {importantInfo.length === 0 ? (
                  <span className="text-gray-400 text-xs sm:text-sm">No information available</span>
                ) : (
                  importantInfo.map((info, index) => (
                    <motion.button
                      key={info._id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveInfoIndex(index)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm md:text-base transition-all shrink-0
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
              ref={quoteRef}
              variants={fadeInUp}
              className="h-auto lg:h-[600px]"
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

      {/* Customize Your Trip Section */}
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
              className="text-sm bg-primary hover:opacity-90 transition text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold shadow-lg w-full md:w-auto"
            >
              Customize your Trip
            </motion.button>
          </Link>
        </motion.div>
      </MainLayout>

      {/* Popups */}
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