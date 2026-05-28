"use client";
import bannerimg from "@/app/assets/flight-bg.svg";
import flightBookingVector from "@/app/assets/flightBookingVector.png";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import MainLayout from "@/app/common/MainLayout";
import Message_Popups from "@/app/common/Message_Popups";
import { clearServiceFormState, submitFlightForm } from "@/app/store/slice/serviceFormSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  CreditCard,
  Globe2,
  MapPin,
  Plane,
  PlaneTakeoff,
  Search,
  Shield,
  Star,
  Tag,
  Zap
} from 'lucide-react';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialForm = {
  serviceType: "flight",
  firstName: "",
  lastName: "",
  emailAddress: "",
  phone: "",
  tentativeDateOfArrival: "",
  noOfNights: "",
  accommodationType: "",
  honeymoon: "",
  comments: "",
};

const initialErrors = {
  emailAddress: "",
  phone: "",
  noOfNights: "",
  comments: "",
};

const allTestimonials = [
  { id: 1, name: "Nam Smith", avatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5, text: "Easy booking dolor sit amet, consectetur adipiscing... easy booking and great service.", subtext: "Name Komin" },
  { id: 2, name: "Kerow R.", avatar: "https://randomuser.me/api/portraits/men/45.jpg", rating: 5, text: "Easy booking, dolor sit amet, consectetur adipiscing elit, booking and great service.", subtext: "Kame Kome" },
  { id: 3, name: "Jonn R.", avatar: "https://randomuser.me/api/portraits/women/44.jpg", rating: 5, text: "\"Lorem ipsum dolor sit amet, consectetur adipiscing.., easy booking and great service.\"", subtext: "Nanne Sensin" },
  { id: 4, name: "Sarah Connor", avatar: "https://randomuser.me/api/portraits/women/12.jpg", rating: 5, text: "The fastest flight booking experience I have ever had. Highly recommended!", subtext: "Frequent Flyer" },
  { id: 5, name: "David Miller", avatar: "https://randomuser.me/api/portraits/men/22.jpg", rating: 4, text: "Great prices and excellent customer support when I needed to change my flight.", subtext: "Business Traveler" },
  { id: 6, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/33.jpg", rating: 5, text: "Customized plans worked out perfectly for my family vacation. Thank you!", subtext: "Family Vacationer" },
  { id: 7, name: "Michael Chang", avatar: "https://randomuser.me/api/portraits/men/55.jpg", rating: 5, text: "Simple, intuitive, and secure. Will definitely use this service again.", subtext: "Tech Enthusiast" },
  { id: 8, name: "Jessica Alba", avatar: "https://randomuser.me/api/portraits/women/66.jpg", rating: 5, text: "Amazing platform! Booking a flight has never been this stress-free and easy.", subtext: "Solo Traveler" }
];

const row1Testimonials = allTestimonials.slice(0, 4);
const row2Testimonials = allTestimonials.slice(4, 8);

const FloatingLabelInput = ({ label, name, value, onChange, placeholder, required = false, isTextarea = false, type = "text", error, min, max }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || (value !== "" && value !== null && value !== undefined) || type === "date";

  return (
    <div className="relative mt-4 w-full">
      <label className={`absolute left-3 px-1.5 transition-all duration-200 pointer-events-none z-10 ${isFloating ? "-top-2.5 text-xs font-semibold text-gray-700 bg-white" : "top-3 text-sm text-gray-500 bg-transparent"
        }`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 text-sm rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none`}
          rows="3"
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
          className={`w-full px-4 py-3 text-sm rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none transition-all`}
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
    <div className="relative mt-4 w-full">
      <label className="absolute -top-2.5 left-3 px-1.5 text-xs font-semibold text-gray-700 bg-white z-10">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 text-sm rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} cursor-pointer flex justify-between items-center bg-white hover:border-red-600 transition-all`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>{selectedOption ? selectedOption.name : placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`transition-transform ${isOpen ? 'rotate-180 text-red-600' : 'text-gray-400'}`}>
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-1 max-h-60 overflow-y-auto">
            {options.map(opt => (
              <div
                key={opt._id}
                className="px-4 py-2.5 hover:bg-red-50 rounded-lg cursor-pointer text-sm transition-all"
                onClick={() => { onChange({ target: { name, value: opt._id } }); setIsOpen(false); }}
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

const FlightBookingSection = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.service);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [popupType, setPopupType] = useState('success');
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'noOfNights') {
      // Limit to 2 digits based on the form image reference
      if (value.length > 2) return;
      const numValue = value === "" ? "" : parseInt(value);
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

    if (!formData.emailAddress.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Valid email is required";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Valid phone number is required";
      isValid = false;
    }
    if (!formData.noOfNights.toString().trim()) {
      newErrors.noOfNights = "Number of nights is required";
      isValid = false;
    }
    if (!formData.comments.trim()) {
      newErrors.comments = "Comments/Queries are required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(submitFlightForm(formData));
    }
  };

  useEffect(() => {
    if (message) {
      const responseMessage = message?.message || message?.data?.message || (typeof message === "string" ? message : null) || "Flight enquiry submitted successfully";
      setPopupType("success");
      setPopupMessage(responseMessage);
      setShowResultPopup(true);
      setFormData(initialForm);
      setErrors(initialErrors);
      dispatch(clearServiceFormState());
    }

    if (error) {
      const errorMessage = error?.message || error?.data?.message || (typeof error === "string" ? error : null) || "Something went wrong. Please try again.";
      setPopupType("error");
      setPopupMessage(errorMessage);
      setShowResultPopup(true);
      dispatch(clearServiceFormState());
    }
  }, [message, error, dispatch]);

  const handleClosePopups = () => {
    setShowResultPopup(false);
    setPopupMessage("");
  };

  return (
    <>
      <CommonHeroSection title="Flight Booking" backgroundImage={bannerimg.src} 
      breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Flight Booking", href: "/service/flight" },
        ]}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scrollLeft 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scrollRight 40s linear infinite;
        }
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      ` }} />

      <MainLayout className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-1">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className="flex flex-col h-full">
              <div className="p-6 md:p-8 h-full flex flex-col">
                <div className="text-center lg:text-left mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Why Book Flights With Us
                  </h2>
                  <p className="text-gray-600 text-sm max-w-2xl mx-auto lg:mx-0">
                    Discover your next adventure with seamless flight booking and exclusive deals.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 flex-grow">
                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Tag size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Best Prices</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Guaranteed low rates on all routes
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Fast Booking</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Instantly confirm flights
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">24/7 Support</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Assistance anytime, anywhere
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Globe2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Global Coverage</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Flights to 500+ destinations
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Secure Booking</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Safe & encrypted payments
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Flexible Plans</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Customize your journey
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-auto">
                  <div className="relative w-80 h-80 mx-auto">
                    <Image
                      src={flightBookingVector}
                      alt="Flight Booking"
                      fill
                      className="object-contain mix-blend-multiply rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Compact Form Component */}
            <div className="w-full h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-600 p-2.5 rounded-lg text-white">
                    <PlaneTakeoff size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Book Your Flight</h2>
                    <p className="text-gray-500 text-xs">Experience seamless travel with us</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-1">
                  
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FloatingLabelInput
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                    <FloatingLabelInput
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <FloatingLabelInput
                      label="Email Address"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      required
                      type="email"
                      error={errors.emailAddress}
                      placeholder="Email Address"
                    />
                    <FloatingLabelInput
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      type="tel"
                      error={errors.phone}
                      placeholder="Phone"
                    />
                  </div>

                  {/* Arrival and Nights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <FloatingLabelInput
                      label="Tentative Date of Arrival"
                      name="tentativeDateOfArrival"
                      type="date"
                      value={formData.tentativeDateOfArrival}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <div>
                      <FloatingLabelInput
                        label="No. of Nights"
                        type="number"
                        name="noOfNights"
                        value={formData.noOfNights}
                        onChange={handleChange}
                        required
                        error={errors.noOfNights}
                        placeholder="e.g. 7"
                        max="99"
                      />
                      <p className="text-[10px] text-gray-500 mt-1 ml-1">Maximum of 2 digits.</p>
                    </div>
                  </div>

                  {/* Accommodation & Honeymoon */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <FloatingLabelSelect
                      label="Select Accommodation Type"
                      name="accommodationType"
                      options={[
                        { _id: "Not Yet Decided", name: "Not Yet Decided" },
                        { _id: "Only HomeStays/Bead & Breakfast", name: "Only HomeStays/Bead & Breakfast" },
                        { _id: "Budget Hotels", name: "Budget Hotels" },
                        { _id: "3 Star Hotels/ HouseBoat", name: "3 Star Hotels/ HouseBoat" },
                        { _id: "4 Star Hotels/ HouseBoat", name: "4 Star Hotels/ HouseBoat" },
                        { _id: "Luxury 5 Star Hotels/ HouseBoat", name: "Luxury 5 Star Hotels/ HouseBoat" },
                        { _id: "HouseBoat Day Cruise", name: "HouseBoat Day Cruise" },
                        { _id: "HouseBoat Overnight Stay & Cruise", name: "HouseBoat Overnight Stay & Cruise" },
                      ]}
                      value={formData.accommodationType}
                      onChange={handleChange}
                      placeholder="Select Type of Stay"
                    />
                    <FloatingLabelSelect
                      label="Are you looking for a Honeymoon?"
                      name="honeymoon"
                      options={[
                        { _id: "Yes", name: "Yes" },
                        { _id: "No", name: "No" }
                      ]}
                      value={formData.honeymoon}
                      onChange={handleChange}
                      placeholder="Yes / No"
                    />
                  </div>

                  {/* Comments/Queries */}
                  <div className="mt-4">
                    <FloatingLabelInput
                      label="Comments/ Questions/ Queries"
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      required
                      isTextarea
                      error={errors.comments}
                      placeholder="Indicate the number of people travelling with you and submit more details about your request including destinations and activities you may want in your holiday"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-red-600 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {loading ? "Processing..." : "Submit Enquiry"}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mt-16 md:mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center group">
                <div className="bg-red-50 p-4 rounded-xl text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Search size={28} />
                </div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-gray-100 leading-none mr-3">1</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base mb-1">Search Flights</h4>
                    <p className="text-gray-500 text-xs">Find the best options for your journey</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="bg-red-50 p-4 rounded-xl text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Plane size={28} className="transform -rotate-45" />
                </div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-gray-100 leading-none mr-3">2</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base mb-1">Select & Customize</h4>
                    <p className="text-gray-500 text-xs">Choose flights and add extras</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="bg-red-50 p-4 rounded-xl text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <CreditCard size={28} />
                </div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-gray-100 leading-none mr-3">3</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base mb-1">Secure Payment</h4>
                    <p className="text-gray-500 text-xs">Complete your booking safely</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-16 md:mt-20 overflow-hidden">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
              What Our Travelers Say
            </h2>

            <div className="flex flex-col gap-6">
              {/* Row 1: Scrolls Right to Left */}
              <div className="flex w-max animate-scroll-left gap-4 px-4">
                {[...row1Testimonials, ...row1Testimonials].map((testimonial, idx) => (
                  <div
                    key={`row1-${idx}`}
                    className="w-[300px] shrink-0 bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                        <div className="flex text-yellow-400 gap-0.5 mt-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={12} className="fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-3 italic">
                      "{testimonial.text}"
                    </p>
                    <p className="text-gray-400 text-xs">
                      {testimonial.subtext}
                    </p>
                  </div>
                ))}
              </div>

              {/* Row 2: Scrolls Left to Right */}
              <div className="flex w-max animate-scroll-right gap-4 px-4">
                {[...row2Testimonials, ...row2Testimonials].map((testimonial, idx) => (
                  <div
                    key={`row2-${idx}`}
                    className="w-[300px] shrink-0 bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                        <div className="flex text-yellow-400 gap-0.5 mt-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={12} className="fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-3 italic">
                      "{testimonial.text}"
                    </p>
                    <p className="text-gray-400 text-xs">
                      {testimonial.subtext}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>

      {/* Success/Error Popup */}
      <Message_Popups
        isOpen={showResultPopup}
        type={popupType}
        onClose={handleClosePopups}
      >
        <div className="text-center px-4">
          <p className="text-sm text-gray-800 font-medium">{popupMessage}</p>
        </div>
      </Message_Popups>
    </>
  );
};

export default FlightBookingSection;