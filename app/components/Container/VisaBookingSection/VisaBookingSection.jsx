"use client";
import bannerimg from "@/app/assets/visa_booking.png";
import VisaVector from "@/app/assets/VisaVector.png"; // You'll need to add this image
import CommonHeroSection from "@/app/common/CommonHeroSection";
import MainLayout from "@/app/common/MainLayout";
import Message_Popups from "@/app/common/Message_Popups";
import { clearServiceFormState, submitVisaForm } from "@/app/store/slice/serviceFormSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  FileText,
  Globe2,
  Headset,
  Shield,
  Star,
  Zap
} from 'lucide-react';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialVisaForm = {
  serviceType: "visa",
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: "",
  country: "",
  countryOfResidence: "",
  visaType: "",
  countryToVisit: "",
  travelStartDate: "",
  travelEndDate: "",
  message: "",
};

const initialErrors = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: "",
  country: "",
  countryToVisit: "",
  visaType: "",
  travelStartDate: "",
  travelEndDate: "",
};

const allTestimonials = [
  { id: 1, name: "John Miller", avatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5, text: "Smooth visa process! Got my Schengen visa in just 5 working days. Excellent guidance throughout.", subtext: "Business Traveler" },
  { id: 2, name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/45.jpg", rating: 5, text: "The team helped me with my US visa application. Very professional and thorough documentation review.", subtext: "Student Visa" },
  { id: 3, name: "David Kumar", avatar: "https://randomuser.me/api/portraits/men/44.jpg", rating: 5, text: "Applied for UK tourist visa through them. Great support and timely updates on application status.", subtext: "Tourist" },
  { id: 4, name: "Emma Watson", avatar: "https://randomuser.me/api/portraits/women/22.jpg", rating: 5, text: "Canada visa process was seamless. They handled all paperwork and interview preparation.", subtext: "Work Visa" },
  { id: 5, name: "Michael Brown", avatar: "https://randomuser.me/api/portraits/men/33.jpg", rating: 4, text: "Good service for Australia visa. Would recommend for first-time visa applicants.", subtext: "First Time Traveler" },
  { id: 6, name: "Priya Patel", avatar: "https://randomuser.me/api/portraits/women/55.jpg", rating: 5, text: "Quick response and clear communication. Got my Dubai visa approved in 48 hours!", subtext: "Tourist" },
  { id: 7, name: "James Wilson", avatar: "https://randomuser.me/api/portraits/men/66.jpg", rating: 5, text: "Excellent assistance with document preparation for Schengen visa. Highly professional team.", subtext: "Family Trip" },
  { id: 8, name: "Lisa Thompson", avatar: "https://randomuser.me/api/portraits/women/32.jpg", rating: 5, text: "Stress-free visa experience! They guided me through every step of the application.", subtext: "Solo Traveler" }
];

const row1Testimonials = allTestimonials.slice(0, 4);
const row2Testimonials = allTestimonials.slice(4, 8);

const FloatingLabelInput = ({ label, name, value, onChange, placeholder, required = false, isTextarea = false, type = "text", error, min, max }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || (value !== "" && value !== null && value !== undefined) || type === "date";

  return (
    <div className="relative mt-4 w-full">
      <label className={`absolute left-3 px-1.5 transition-all duration-200 pointer-events-none z-10 ${
        isFloating ? "-top-2.5 text-xs font-semibold text-gray-700 bg-white" : "top-3 text-sm text-gray-500 bg-transparent"
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
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

const VisaBookingSection = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.service);
  const [formData, setFormData] = useState(initialVisaForm);
  const [errors, setErrors] = useState(initialErrors);

  const [showResultPopup, setShowResultPopup] = useState(false);
  const [popupType, setPopupType] = useState('success');
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
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
    if (!formData.country) {
      newErrors.country = "Nationality is required";
      isValid = false;
    }
    if (!formData.countryToVisit) {
      newErrors.countryToVisit = "Destination country is required";
      isValid = false;
    }
    if (!formData.visaType) {
      newErrors.visaType = "Visa type is required";
      isValid = false;
    }
    if (!formData.travelStartDate) {
      newErrors.travelStartDate = "Travel start date is required";
      isValid = false;
    }
    if (!formData.travelEndDate) {
      newErrors.travelEndDate = "Travel end date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(submitVisaForm(formData));
    }
  };

  useEffect(() => {
    if (message) {
      const responseMessage = message?.message || message?.data?.message || (typeof message === "string" ? message : null) || "Visa enquiry submitted successfully";
      setPopupType("success");
      setPopupMessage(responseMessage);
      setShowResultPopup(true);
      setFormData(initialVisaForm);
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

  const visaTypeOptions = [
    { _id: "Tourist", name: "Tourist Visa" },
    { _id: "Business", name: "Business Visa" },
    { _id: "Student", name: "Student Visa" },
    { _id: "Work", name: "Work Visa" },
    { _id: "Transit", name: "Transit Visa" },
    { _id: "Medical", name: "Medical Visa" },
    { _id: "Diplomatic", name: "Diplomatic Visa" },
    { _id: "E-Visa", name: "E-Visa" },
  ];

  const countryOptions = [
    { _id: "USA", name: "United States" },
    { _id: "UK", name: "United Kingdom" },
    { _id: "Canada", name: "Canada" },
    { _id: "Australia", name: "Australia" },
    { _id: "New Zealand", name: "New Zealand" },
    { _id: "Germany", name: "Germany" },
    { _id: "France", name: "France" },
    { _id: "Italy", name: "Italy" },
    { _id: "Spain", name: "Spain" },
    { _id: "Switzerland", name: "Switzerland" },
    { _id: "Netherlands", name: "Netherlands" },
    { _id: "Sweden", name: "Sweden" },
    { _id: "Norway", name: "Norway" },
    { _id: "Denmark", name: "Denmark" },
    { _id: "Finland", name: "Finland" },
    { _id: "Japan", name: "Japan" },
    { _id: "South Korea", name: "South Korea" },
    { _id: "Singapore", name: "Singapore" },
    { _id: "Malaysia", name: "Malaysia" },
    { _id: "Thailand", name: "Thailand" },
    { _id: "UAE", name: "UAE" },
    { _id: "Saudi Arabia", name: "Saudi Arabia" },
    { _id: "Qatar", name: "Qatar" },
    { _id: "South Africa", name: "South Africa" },
    { _id: "Brazil", name: "Brazil" },
    { _id: "Argentina", name: "Argentina" },
    { _id: "Mexico", name: "Mexico" },
    { _id: "India", name: "India" },
    { _id: "China", name: "China" },
    { _id: "Russia", name: "Russia" },
  ];

  return (
    <>
      <CommonHeroSection title="Visa Services" backgroundImage={bannerimg.src} 
      breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Visa Services", href: "/service/visa" },
        ]}
      />

      {/* --- Inline Styles for Marquee Animation --- */}
      <style dangerouslySetInnerHTML={{ __html: `
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

            {/* Left Column: Why Book With Us */}
            <div className="flex flex-col h-full">
              <div className="p-6 md:p-8 h-full flex flex-col">
                <div className="text-center lg:text-left mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Why Choose Our Visa Services
                  </h2>
                  <p className="text-gray-600 text-sm max-w-2xl mx-auto lg:mx-0">
                    Professional guidance for hassle-free visa processing to your dream destinations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 flex-grow">
                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Fast Processing</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Quick & efficient visa processing
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">High Success Rate</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        98% visa approval rate
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Document Assistance</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Complete document preparation
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Globe2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">150+ Countries</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Visa services worldwide
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Headset size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Expert Guidance</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Dedicated visa experts
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Secure Process</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Safe & confidential handling
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-auto">
                  <div className="relative w-80 h-80 mx-auto">
                    <Image
                      src={VisaVector}
                      alt="Visa Services"
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
                    <FileText size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Visa Assistance</h2>
                    <p className="text-gray-500 text-xs">Hassle-free visa processing</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FloatingLabelInput
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      error={errors.firstName}
                      placeholder="Enter first name"
                    />
                    <FloatingLabelInput
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      error={errors.lastName}
                      placeholder="Enter last name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FloatingLabelSelect
                      label="Nationality"
                      name="country"
                      options={countryOptions}
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Select nationality"
                      required
                      error={errors.country}
                    />
                    <FloatingLabelSelect
                      label="Destination"
                      name="countryToVisit"
                      options={countryOptions}
                      value={formData.countryToVisit}
                      onChange={handleChange}
                      placeholder="Select destination"
                      required
                      error={errors.countryToVisit}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FloatingLabelSelect
                      label="Visa Type"
                      name="visaType"
                      options={visaTypeOptions}
                      value={formData.visaType}
                      onChange={handleChange}
                      placeholder="Select visa type"
                      required
                      error={errors.visaType}
                    />
                    <FloatingLabelInput
                      label="Residence"
                      name="countryOfResidence"
                      value={formData.countryOfResidence}
                      onChange={handleChange}
                      placeholder="Current residence"
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
                    <FloatingLabelInput
                      label="Travel Start"
                      name="travelStartDate"
                      type="date"
                      value={formData.travelStartDate}
                      onChange={handleChange}
                      required
                      error={errors.travelStartDate}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <FloatingLabelInput
                      label="Travel End"
                      name="travelEndDate"
                      type="date"
                      value={formData.travelEndDate}
                      onChange={handleChange}
                      required
                      error={errors.travelEndDate}
                      min={formData.travelStartDate}
                    />
                  </div>

                  <FloatingLabelInput
                    label="Additional Notes"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    isTextarea
                    placeholder="Any special requirements or questions about your visa application..."
                  />

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-red-600 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {loading ? "Processing..." : "Submit Visa Request"}
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
                  <FileText size={28} />
                </div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-gray-100 leading-none mr-3">1</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base mb-1">Submit Application</h4>
                    <p className="text-gray-500 text-xs">Fill in your details</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="bg-red-50 p-4 rounded-xl text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <CheckCircle size={28} />
                </div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-gray-100 leading-none mr-3">2</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base mb-1">Document Review</h4>
                    <p className="text-gray-500 text-xs">We verify your documents</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="bg-red-50 p-4 rounded-xl text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Globe2 size={28} />
                </div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-gray-100 leading-none mr-3">3</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base mb-1">Get Your Visa</h4>
                    <p className="text-gray-500 text-xs">Travel with confidence</p>
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

export default VisaBookingSection;