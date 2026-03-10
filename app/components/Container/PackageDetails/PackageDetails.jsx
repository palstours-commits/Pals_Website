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

// --- Floating Label Components (Matching Flight Booking Style) ---
const FloatingLabelInput = ({ label, name, value, onChange, placeholder, required = false, isTextarea = false, type = "text", error, min, max }) => {
  const [isFocused, setIsFocused] = useState(false);
 const isFloating = isFocused || value !== "" && value !== null && value !== undefined || type === "date";

  return (
    <div className="relative mt-6 w-full">
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

const FloatingLabelSelect = ({ label, name, value, onChange, options = [], placeholder, required = false, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt._id === value);

  return (
    <div className="relative mt-6 w-full">
      <label className="absolute -top-2.5 left-3 px-1.5 text-[11px] font-bold text-red-600 bg-white z-10">
        {label.toUpperCase()} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} cursor-pointer flex justify-between items-center bg-white hover:border-red-600 transition-all`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={`transition-transform ${isOpen ? 'rotate-180 text-red-600' : 'text-gray-400'}`}
        >
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl p-2 max-h-60 overflow-y-auto"
          >
            {options.map(opt => (
              <div
                key={opt._id}
                className="px-4 py-2 hover:bg-red-50 rounded-lg cursor-pointer text-sm transition-all"
                onClick={() => {
                  onChange({ target: { name, value: opt._id } });
                  setIsOpen(false);
                }}
              >
                {opt.name}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Enhanced Package Form Component (Updated to match backend) ---
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

  // Update packageId when prop changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      packageId: packageId
    }));
  }, [packageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle number input
    if (name === 'numberOfPersons') {
      const numValue = parseInt(value) || 1;
      setFormData({ ...formData, [name]: numValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Package ID validation
    if (!formData.packageId) {
      newErrors.packageId = "Package ID is required";
      isValid = false;
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    // Date validation
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

    // Number of persons validation - made more flexible
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
    // Directly submit the enquiry instead of calling onConfirm
    dispatch(submitEnquiry(submitData));
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

  // Validation summary
  const hasErrors = Object.keys(errors).some(key => errors[key]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 h-full overflow-y-auto"
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="bg-red-600 p-4 rounded-2xl text-white">
          <BookText size={30} />
        </div>
        <div>
          <h2 className="text-2xl font-black">Grab This Package</h2>
          {/* FIXED: Changed from <p> to <span> to avoid nested paragraph error */}
          <span className="text-gray-500 text-sm">{packageName}</span>
        </div>
      </div>

      {/* Validation Summary */}
      {hasErrors && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 font-semibold mb-2">Please fix the following errors:</p>
          <ul className="list-disc list-inside text-sm text-red-500">
            {Object.values(errors).map((error, index) => error && <li key={index}>{error}</li>)}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmitClick}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
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
          className="w-full mt-2 bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-red-600 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Book This Package"}
        </motion.button>
      </form>
    </motion.div>
  );
};

// Image Carousel Component for additional images
const ImageCarousel = ({ images, currentIndex, onNext, onPrev, onClose }) => {
  if (!images || images.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-6xl mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Main Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden">
          <CustomImage
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            className="object-contain"
          />
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 backdrop-blur-sm rounded-xl">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onPrev()} // This would need to be modified to jump to specific index
                className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all ${
                  idx === currentIndex ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'
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

  // State to control flight animation
  const [showFlightAnimation, setShowFlightAnimation] = useState(false);

  // Form data for confirmation
  const [pendingFormData, setPendingFormData] = useState(null);

  // Popup states
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [popupType, setPopupType] = useState('success');
  const [popupMessage, setPopupMessage] = useState('');

  // Image gallery states
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);

  // Refs for sections
  const overviewRef = useRef(null);
  const highlightsRef = useRef(null);
  const destinationsRef = useRef(null);
  const itineraryRef = useRef(null);
  const informationRef = useRef(null);
  const quoteRef = useRef(null);

  // Prepare banner images array for multi-image banner
  const bannerImages = singlePackage?.images?.length > 0
    ? singlePackage.images.map(img => `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${img}`)
    : [PackageBanner.src];

  useEffect(() => {
    if (slug) {
      dispatch(getPackagesById(slug));
    }
  }, [dispatch, slug]);

  // Process images when package data changes
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

  // Get first 6 images for the grid
  const gridImages = allImages.slice(0, 6);
  
  // Get remaining images for the carousel
  const carouselImages = allImages.slice(6);

  // Handle API response
 useEffect(() => {
    // Only trigger the animation here. Do NOT clear state immediately.
    if (message && !error) {
      setShowFlightAnimation(true);
    }

    if (error) {
      const errorMessage = typeof error === "string" ? error : error?.message || "Something went wrong.";
      setPopupType("error");
      setPopupMessage(errorMessage);
      setShowResultPopup(true);
      dispatch(clearEnquiryState()); // Clear error immediately
    }
  }, [message, error, dispatch]);

  // Reset flight animation after it completes
  const handleFlightAnimationComplete = () => {
    setShowFlightAnimation(false);
    dispatch(clearEnquiryState()); // Reset everything once the animation is dismissed
  };
  useEffect(() => {
    if (importantInfo.length > 0) {
      setActiveInfoIndex(0);
    }
  }, [importantInfo]);

  // Handle tab click with proper scrolling
  const handleTabClick = (tab) => {
    setActive(tab);
    
    let ref = null;
    switch(tab) {
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
      const offset = 180; // Adjust this value based on your sticky header height
      const elementPosition = ref.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll to update active tab
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

      const scrollPosition = window.scrollY + 200; // Offset for better detection

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
    // Ensure packageId is included and is a string
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

  // Gallery navigation functions
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

  // Animation variants
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
      {/* Flight Animation - Shows immediately on confirmation */}
       <Flight_Movement
        isOpen={showFlightAnimation}
        onAnimationComplete={handleFlightAnimationComplete}
        autoTriggerOnSuccess={true}
      />

      {/* Image Gallery Modal */}
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

      {/* Updated: Pass all images to the banner component */}
      <PackageBaneer images={bannerImages} />
      
      {/* Sticky Info Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-secondary py-8 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <motion.div 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-white"
          >
            <h4 className="mb-1 font-semibold capitalize text-xl">
              {singlePackage?.packageName}
            </h4>
            <p className="flex items-center gap-2">
              <Clock size={18} />
              {singlePackage?.nights} Nights / {singlePackage?.days} Days
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTabClick("Get a Quote")}
            className="text-sm bg-primary hover:opacity-90 transition text-white px-6 py-2 rounded-full font-semibold"
          >
            Get a Quote
          </motion.button>
        </div>
      </motion.div>

      {/* Sticky Tabs */}
      <div className="w-full pt-10 sticky top-[88px] pb-6 z-40 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-6 md:px-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 items-center overflow-x-auto scrollbar-hide"
          >
            {tabs?.map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabClick(tab)}
                className={`px-6 py-2 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  active === tab 
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.h4 
          variants={fadeInUp}
          id="overview" 
          className="font-semibold mb-4 text-2xl"
        >
          Overview
        </motion.h4>
        <motion.p 
          variants={fadeInUp}
          className="text-gray-900 leading-relaxed text-lg"
        >
          {singlePackage?.overview?.Description}
        </motion.p>

        {overviewIcons.length > 0 && (
          <motion.div 
            variants={fadeInUp}
            className="max-w-4xl mx-auto px-10 md:px-0 flex justify-center gap-8 md:gap-20 mt-12"
          >
            {overviewIcons.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-md">
                  <CustomImage
                    src={item.iconPath}
                    alt={item.name}
                    className="object-cover"
                  />
                </div>
                <h5 className="text-lg font-semibold text-gray-800 text-center">
                  {item.name}
                </h5>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Trip Highlights with Image Grid */}
      <motion.div
        ref={highlightsRef}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.h4
            variants={fadeInUp}
            id="trip-highlights"
            className="text-3xl font-semibold mb-12 scroll-mt-[180px]"
          >
            Trip Highlights
          </motion.h4>
          
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <motion.div 
              variants={fadeInUp}
              className="rounded-2xl p-8 h-full bg-white shadow-lg"
            >
              <ul className="space-y-4 text-[17px] leading-relaxed">
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

            {/* Image Grid with First 6 Images */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-flow-col auto-cols-[80%] gap-4 overflow-x-auto snap-x snap-mandatory md:grid-cols-6 md:auto-cols-auto md:grid-flow-row md:overflow-x-hidden auto-rows-[220px] h-full relative"
            >
              {/* Grid Images */}
              {gridImages.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleImageClick(index)}
                  className={`relative rounded-3xl overflow-hidden snap-start shadow-lg cursor-pointer ${
                    index === 0 ? "md:col-span-3" :
                    index === 1 ? "md:col-span-3" :
                    index === 2 ? "md:col-span-2" :
                    index === 3 ? "md:col-span-2" :
                    index === 4 ? "md:col-span-4" :
                    "md:col-span-2 md:row-span-2"
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

              {/* Show More Button if there are additional images */}
              {carouselImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => handleImageClick(6)}
                  className="absolute bottom-4 right-4 z-10 cursor-pointer"
                >
                  <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black/90 transition-all">
                    <span className="text-sm font-semibold">+{carouselImages.length} More Photos</span>
                    <ChevronRight size={18} />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Destinations Bar */}
      <motion.div
        ref={destinationsRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full bg-gradient-to-r from-red-600 to-red-500 py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-white">
          <motion.div 
            animate={{ 
              x: [0, 10, 0],
              transition: { duration: 2, repeat: Infinity }
            }}
            className="flex items-center gap-2 text-center"
          >
            <MapPin className="shrink-0" />
            <h4 id="destinations" className="font-semibold text-lg">
              Bangalore - Mysore - Hassan – Hospet - Hampi – Badami - Goa - Mumbai.
            </h4>
          </motion.div>
        </div>
      </motion.div>

      {/* Itinerary Section */}
      <motion.div
        ref={itineraryRef}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div variants={fadeInUp} id="tour-itinerary">
          <h2 className="text-3xl font-semibold mb-8">Tour Itinerary</h2>
          <ItineraryAccordion items={singlePackage?.itinerary} />
        </motion.div>
      </motion.div>

      {/* Information and Booking Form */}
      <motion.div
        ref={informationRef}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Important Information */}
            <motion.div 
              variants={fadeInUp}
              className="h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300"
            >
              <h2
                id="information"
                className="font-bold mb-8 text-3xl"
              >
                Important Information
              </h2>
              
              <div className="flex gap-3 mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
                {importantInfo.length === 0 ? (
                  <span className="text-gray-400 text-sm">No information available</span>
                ) : (
                  importantInfo.map((info, index) => (
                    <motion.button
                      key={info._id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveInfoIndex(index)}
                      className={`px-6 py-2 rounded-full border text-sm sm:text-base transition-all shrink-0
                        ${
                          activeInfoIndex === index
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
                  <h4 className="font-semibold mb-4 text-lg">
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

            {/* Enhanced Booking Form */}
            <motion.div 
              ref={quoteRef}
              variants={fadeInUp}
              className="h-[600px]"
            >
              <EnhancedPackageForm 
                packageId={singlePackage?._id} 
                packageName={
                  <>
                    <span className="font-semibold text-gray-800 text-[20px]">{singlePackage?.packageName}</span>
                    <span> {singlePackage?.nights} Nights / {singlePackage?.days} Days</span>
                  </>
                }
                onConfirm={handleConfirmRequest}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Customize Your Trip Banner */}
      <MainLayout className="w-full bg-gradient-to-r from-[#e6dcc8] to-[#d6ccb8] py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 lg:px-8 
                    flex flex-col md:flex-row 
                    items-start md:items-center 
                    justify-between gap-10"
        >
          <div className="max-w-xl">
            <h4 className="mb-2 font-semibold text-2xl">
              Customize Your Trip
            </h4>
            <p className="text-gray-900 text-base leading-relaxed">
              Create a travel experience tailored to your preferences, budget,
              and schedule for a truly personalized journey.
            </p>
          </div>
          <Link href={"/contact-us"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm bg-primary hover:opacity-90 transition text-white px-8 py-3 rounded-full font-semibold shadow-lg"
            >
              Customize your Trip
            </motion.button>
          </Link>
        </motion.div>
      </MainLayout>

      {/* Confirmation Popup - Simple confirmation message */}
      <Message_Popups
        isOpen={showConfirmPopup}
        type="confirm"
        onClose={handleClosePopups}
        onConfirm={handleConfirmSubmit}
      />

      {/* Error Popup Only */}
      {popupType === "error" && (
        <Message_Popups
          isOpen={showResultPopup}
          type="error"
          onClose={handleClosePopups}
        >
          <div className="text-center">
            <p className="text-sm text-gray-800">{popupMessage}</p>
          </div>
        </Message_Popups>
      )}
    </>
  );
};

export default PackageDetails;