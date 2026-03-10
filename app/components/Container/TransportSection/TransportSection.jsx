"use client";
import bannerimg from "@/app/assets/car_booking.svg";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import MainLayout from "@/app/common/MainLayout";
import Message_Popups from "@/app/common/Message_Popups";
import { clearServiceFormState, submitTransportForm } from "@/app/store/slice/serviceFormSlice";
import { AnimatePresence, motion } from "framer-motion";
import { Car } from 'lucide-react';
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
};

// --- Reusable Components ---
const FloatingLabelInput = ({ label, name, value, onChange, placeholder, required = false, isTextarea = false, type = "text", error, min, max }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value !== "" && value !== null && value !== undefined || type === "date";

  return (
    <div className="relative mt-6 w-full">
      <label className={`absolute left-3 px-1.5 transition-all duration-200 pointer-events-none z-10 ${
        isFloating ? "-top-2.5 text-[11px] font-bold text-gray-800 bg-white" : "top-3.5 text-gray-500 text-sm bg-transparent"
      }`}>
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
      <label className="absolute -top-2.5 left-3 px-1.5 text-[11px] font-bold text-gray-800 bg-white z-10">
        {label.toUpperCase()} {required && <span className="text-red-500">*</span>}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} cursor-pointer flex justify-between items-center bg-white hover:border-red-600 transition-all`}
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

const TransportSection = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.service);
  const [formData, setFormData] = useState(initialTransportForm);
  const [errors, setErrors] = useState(initialErrors);
  
  // Popup states
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [popupType, setPopupType] = useState('success');
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle number inputs
    if (name === 'noOfAdults' || name === 'noOfChildren') {
      const numValue = parseInt(value) || "";
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

    // Required fields validation
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

    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone number is required";
      isValid = false;
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Please enter a valid phone number";
      isValid = false;
    }

    if (!formData.location.trim()) {
      newErrors.location = "Pickup location is required";
      isValid = false;
    }

    if (!formData.rentalType) {
      newErrors.rentalType = "Please select rental type";
      isValid = false;
    }

    if (!formData.carType) {
      newErrors.carType = "Please select car type";
      isValid = false;
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    } else {
      // Check if start date is in the future
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(formData.startDate);
      if (startDate < today) {
        newErrors.startDate = "Start date must be in the future";
        isValid = false;
      }
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
      isValid = false;
    } else if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate < startDate) {
        newErrors.endDate = "End date must be after start date";
        isValid = false;
      }
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
    
    // Validate all fields
    if (validateForm()) {
      // Directly submit the form
      dispatch(submitTransportForm(formData));
    } else {
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle API response
  useEffect(() => {
    if (message) {
      // Extract message from API response
      const responseMessage = typeof message === 'string' 
        ? message 
        : message?.message || "Transport booking enquiry submitted successfully";
      
      setPopupType('success');
      setPopupMessage(responseMessage);
      setShowResultPopup(true);
      setFormData(initialTransportForm);
      setErrors(initialErrors);
      dispatch(clearServiceFormState());
    }
    if (error) {
      const errorMessage = typeof error === 'string' 
        ? error 
        : error?.message || "An error occurred. Please try again.";
      
      setPopupType('error');
      setPopupMessage(errorMessage);
      setShowResultPopup(true);
      dispatch(clearServiceFormState());
    }
  }, [message, error, dispatch]);

  const handleClosePopups = () => {
    setShowResultPopup(false);
    setPopupMessage('');
  };

  // Rental type options
  const rentalTypeOptions = [
    { _id: "Airport Pickup", name: "Airport Pickup/Drop" },
    { _id: "Hourly Rental", name: "Hourly Rental" },
    { _id: "Daily Rental", name: "Daily Rental" },
    { _id: "Weekly Rental", name: "Weekly Rental" },
    { _id: "Monthly Rental", name: "Monthly Rental" },
    { _id: "Point to Point", name: "Point to Point Transfer" },
    { _id: "Full Day Tour", name: "Full Day Tour" },
  ];

  // Car type options
  const carTypeOptions = [
    { _id: "Hatchback", name: "Hatchback (e.g., Swift, i20)" },
    { _id: "Sedan", name: "Sedan (e.g., Dzire, Etios)" },
    { _id: "SUV", name: "SUV (e.g., Innova, XUV)" },
    { _id: "Premium SUV", name: "Premium SUV (e.g., Fortuner)" },
    { _id: "Luxury", name: "Luxury (e.g., Mercedes, BMW)" },
    { _id: "Tempo Traveler", name: "Tempo Traveler (12 Seater)" },
    { _id: "Mini Bus", name: "Mini Bus (18-25 Seater)" },
  ];

  return (
    <>
      <CommonHeroSection title="Transport Booking" backgroundImage={bannerimg.src} />
      <MainLayout className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-red-600 p-4 rounded-2xl text-white">
                <Car size={30}/>
              </div>
              <div>
                <h2 className="text-2xl font-black">Transport Booking</h2>
                <p className="text-gray-500 text-sm">Reliable cars for business or pleasure</p>
              </div>
            </div>

            {/* Validation Summary */}
            {Object.keys(errors).some(key => errors[key]) && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 font-semibold mb-2">Please fix the following errors:</p>
                <ul className="list-disc list-inside text-sm text-red-500">
                  {Object.values(errors).map((error, index) => error && <li key={index}>{error}</li>)}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FloatingLabelInput 
                  label="Full Name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  error={errors.name}
                />
                <FloatingLabelInput 
                  label="Residence" 
                  name="countryOfResidence" 
                  value={formData.countryOfResidence} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FloatingLabelInput 
                  label="Email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  error={errors.email}
                />
                <FloatingLabelInput 
                  label="Phone" 
                  name="phoneNo" 
                  value={formData.phoneNo} 
                  onChange={handleChange} 
                  required 
                  error={errors.phoneNo}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FloatingLabelSelect 
                  label="Rental Type" 
                  name="rentalType" 
                  options={rentalTypeOptions} 
                  value={formData.rentalType} 
                  onChange={handleChange} 
                  placeholder="Select Rental Type" 
                  required
                  error={errors.rentalType}
                />
                <FloatingLabelSelect 
                  label="Car Type" 
                  name="carType" 
                  options={carTypeOptions} 
                  value={formData.carType} 
                  onChange={handleChange} 
                  placeholder="Select Car Type" 
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
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
                />
                <FloatingLabelInput 
                  label="Children" 
                  name="noOfChildren" 
                  type="number" 
                  min="0"
                  max="10"
                  value={formData.noOfChildren} 
                  onChange={handleChange} 
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
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
                type="submit" 
                disabled={loading} 
                className="w-full mt-10 bg-gray-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-red-600 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Confirm Transport Booking"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </MainLayout>

      {/* Success/Error Popup - Only shows API message */}
      <Message_Popups
        isOpen={showResultPopup}
        type={popupType}
        onClose={handleClosePopups}
      >
        <div className="text-center">
          <p className="text-sm text-gray-800">{popupMessage}</p>
        </div>
      </Message_Popups>
    </>
  );
};

export default TransportSection;