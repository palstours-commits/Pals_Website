"use client";
import bannerimg from "@/app/assets/car_booking.svg";
import transportVector from "@/app/assets/transportVector.png"; // You'll need to add this image
import CommonHeroSection from "@/app/common/CommonHeroSection";
import MainLayout from "@/app/common/MainLayout";
import Message_Popups from "@/app/common/Message_Popups";
import { clearServiceFormState, submitTransportForm } from "@/app/store/slice/serviceFormSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  Car,
  Clock,
  Fuel,
  Headset,
  MapPin,
  Settings,
  Shield,
  Star,
  Wallet
} from 'lucide-react';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialTransportForm = {
  serviceType: "transport",
  name: "",
  email: "",
  phoneNo: "",
  country: "",
  countryOfResidence: "",
  rentalType: "",
  carType: "",
  startDate: "",
  endDate: "",
  noOfAdults: "",
  noOfChildren: "",
  location: "",
  message: "",
};

const initialErrors = {
  name: "",
  email: "",
  phoneNo: "",
  location: "",
  startDate: "",
  endDate: "",
  carType: "",
  rentalType: "",
  noOfAdults: "",
};

const allTestimonials = [
  { id: 1, name: "Robert Wilson", avatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5, text: "Excellent car rental service! The vehicle was clean and well-maintained. Great value for money.", subtext: "Business Traveler" },
  { id: 2, name: "Patricia Lee", avatar: "https://randomuser.me/api/portraits/women/45.jpg", rating: 5, text: "Smooth airport transfer experience. Driver was punctual and professional. Highly recommended!", subtext: "Frequent Flyer" },
  { id: 3, name: "Thomas Brown", avatar: "https://randomuser.me/api/portraits/men/44.jpg", rating: 5, text: "Booked an SUV for our family trip. Comfortable ride and excellent customer support throughout.", subtext: "Family Traveler" },
  { id: 4, name: "Jennifer Clark", avatar: "https://randomuser.me/api/portraits/women/22.jpg", rating: 5, text: "The booking process was seamless. Got a luxury car for our anniversary at a great price.", subtext: "Luxury Seeker" },
  { id: 5, name: "William Martinez", avatar: "https://randomuser.me/api/portraits/men/33.jpg", rating: 4, text: "Good selection of cars and transparent pricing. Will definitely use again for my next trip.", subtext: "Road Trip Enthusiast" },
  { id: 6, name: "Margaret Davis", avatar: "https://randomuser.me/api/portraits/women/55.jpg", rating: 5, text: "24/7 support helped me extend my rental at midnight. Amazing service!", subtext: "Late Planner" },
  { id: 7, name: "Joseph Rodriguez", avatar: "https://randomuser.me/api/portraits/men/66.jpg", rating: 5, text: "Best rates in town! Saved 40% compared to other rental companies.", subtext: "Deal Hunter" },
  { id: 8, name: "Nancy Thompson", avatar: "https://randomuser.me/api/portraits/women/32.jpg", rating: 5, text: "Clean cars, friendly staff, and hassle-free booking. This is my go-to transport service now.", subtext: "Solo Traveler" }
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
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-1 max-h-60 overflow-y-auto"
          >
            {options.map(opt => (
              <div
                key={opt._id}
                className="px-4 py-2.5 hover:bg-red-50 rounded-lg cursor-pointer text-sm transition-all"
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

const TransportSection = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.service);
  const [formData, setFormData] = useState(initialTransportForm);
  const [errors, setErrors] = useState(initialErrors);

  const [showResultPopup, setShowResultPopup] = useState(false);
  const [popupType, setPopupType] = useState('success');
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'noOfAdults' || name === 'noOfChildren') {
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }
    if (!formData.phoneNo.trim() || !/^[0-9+\-\s()]{10,15}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Valid phone number is required";
      isValid = false;
    }
    if (!formData.location.trim()) {
      newErrors.location = "Pickup location is required";
      isValid = false;
    }
    if (!formData.rentalType) {
      newErrors.rentalType = "Rental type is required";
      isValid = false;
    }
    if (!formData.carType) {
      newErrors.carType = "Car type is required";
      isValid = false;
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    }
    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
      isValid = false;
    }
    if (!formData.noOfAdults || formData.noOfAdults < 1) {
      newErrors.noOfAdults = "At least 1 adult is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(submitTransportForm(formData));
    }
  };

  useEffect(() => {
    if (message) {
      const responseMessage = message?.message || message?.data?.message || (typeof message === "string" ? message : null) || "Transport enquiry submitted successfully";
      setPopupType("success");
      setPopupMessage(responseMessage);
      setShowResultPopup(true);
      setFormData(initialTransportForm);
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

  const rentalTypeOptions = [
    { _id: "Airport Transfer", name: "Airport Transfer" },
    { _id: "Hourly Rental", name: "Hourly Rental" },
    { _id: "Daily Rental", name: "Daily Rental" },
    { _id: "Weekly Rental", name: "Weekly Rental" },
    { _id: "Monthly Rental", name: "Monthly Rental" },
    { _id: "Point to Point", name: "Point to Point" },
    { _id: "Full Day Tour", name: "Full Day Tour" },
  ];

  const carTypeOptions = [
    { _id: "Hatchback", name: "Hatchback" },
    { _id: "Sedan", name: "Sedan" },
    { _id: "SUV", name: "SUV" },
    { _id: "Premium SUV", name: "Premium SUV" },
    { _id: "Luxury", name: "Luxury" },
    { _id: "Tempo Traveler", name: "Tempo Traveler" },
    { _id: "Mini Bus", name: "Mini Bus" },
  ];

  return (
    <>
      <CommonHeroSection title="Transport Booking" backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Transport Booking", href: "/service/transport" },
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
        <div className="max-w-7xl mx-auto px-4 ">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className="flex flex-col h-full">
              <div className=" p-6 md:p-8 h-full flex flex-col">
                <div className="text-center lg:text-left mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Why Book Transport With Us
                  </h2>
                  <p className="text-gray-600 text-sm max-w-2xl mx-auto lg:mx-0">
                    Reliable vehicles for your journey with comfort and safety guaranteed.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 flex-grow">
                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Wallet size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Best Rates</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Competitive prices on all vehicles
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Fully Insured</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Complete coverage for peace of mind
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">24/7 Service</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Round-the-clock availability
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Fuel size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Well Maintained</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Regular service & clean vehicles
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Settings size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">GPS Included</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Navigation system in all vehicles
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Headset size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Support</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        24/7 customer assistance
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-auto">
                  <div className="relative w-80 h-80 mx-auto">
                    <Image
                      src={transportVector}
                      alt="Transport Booking"
                      fill
                      className="object-contain mix-blend-multiply"
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
                    <Car size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Book Transport</h2>
                    <p className="text-gray-500 text-xs">Reliable cars for your journey</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FloatingLabelInput
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      error={errors.name}
                      placeholder="Enter your full name"
                    />
                    <FloatingLabelInput
                      label="Residence"
                      name="countryOfResidence"
                      value={formData.countryOfResidence}
                      onChange={handleChange}
                      placeholder="Your country"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FloatingLabelInput
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      type="email"
                      error={errors.email}
                      placeholder="Enter your email"
                    />
                    <FloatingLabelInput
                      label="Phone"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      required
                      type="tel"
                      error={errors.phoneNo}
                      placeholder="Phone number"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FloatingLabelSelect
                      label="Rental Type"
                      name="rentalType"
                      options={rentalTypeOptions}
                      value={formData.rentalType}
                      onChange={handleChange}
                      placeholder="Select rental type"
                      required
                      error={errors.rentalType}
                    />
                    <FloatingLabelSelect
                      label="Car Type"
                      name="carType"
                      options={carTypeOptions}
                      value={formData.carType}
                      onChange={handleChange}
                      placeholder="Select car type"
                      required
                      error={errors.carType}
                    />
                  </div>

                  <FloatingLabelInput
                    label="Pickup Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    error={errors.location}
                    placeholder="Enter pickup address or landmark"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FloatingLabelInput
                      label="Start Date"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      error={errors.startDate}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <FloatingLabelInput
                      label="End Date"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                      error={errors.endDate}
                      min={formData.startDate}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FloatingLabelInput
                      label="Adults"
                      name="noOfAdults"
                      type="number"
                      min="1"
                      max="20"
                      value={formData.noOfAdults}
                      onChange={handleChange}
                      required
                      error={errors.noOfAdults}
                      placeholder="Number of adults"
                    />
                    <FloatingLabelInput
                      label="Children"
                      name="noOfChildren"
                      type="number"
                      min="0"
                      max="10"
                      value={formData.noOfChildren}
                      onChange={handleChange}
                      placeholder="Number of children"
                    />
                  </div>

                  <FloatingLabelInput
                    label="Special Requests"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    isTextarea
                    placeholder="Any special requirements or preferences..."
                  />

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-red-600 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {loading ? "Processing..." : "Check Transport Availability"}
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
                  <MapPin size={28} />
                </div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-gray-100 leading-none mr-3">1</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base mb-1">Choose Vehicle</h4>
                    <p className="text-gray-500 text-xs">Select from our wide range</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="bg-red-50 p-4 rounded-xl text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Clock size={28} />
                </div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-gray-100 leading-none mr-3">2</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base mb-1">Pick Dates</h4>
                    <p className="text-gray-500 text-xs">Select rental duration</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="bg-red-50 p-4 rounded-xl text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Car size={28} />
                </div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-gray-100 leading-none mr-3">3</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base mb-1">Hit the Road</h4>
                    <p className="text-gray-500 text-xs">Enjoy your journey</p>
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

export default TransportSection;