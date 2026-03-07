"use client";
import bannerimg from "@/app/assets/flight-bg.svg";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import MainLayout from "@/app/common/MainLayout";
import Message_Popups from "@/app/common/Message_Popups";
import { clearServiceFormState, submitFlightForm } from "@/app/store/slice/serviceFormSlice";
import { AnimatePresence, motion } from "framer-motion";
import { PlaneTakeoff } from 'lucide-react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialForm = {
  serviceType: "flight", 
  name: "", 
  email: "", 
  phoneNo: "", 
  country: "",
  countryOfResidence: "", 
  flightType: "", 
  from: "", 
  to: "", 
  departureDate: "",
  returnDate: "", 
  noOfAdults: 1, 
  noOfChildren: 0, 
  message: "",
};

const initialErrors = {
  name: "",
  email: "",
  phoneNo: "",
  from: "",
  to: "",
  departureDate: "",
  flightType: "",
};

// --- Floating Label Components ---
const FloatingLabelInput = ({ label, name, value, onChange, placeholder, required = false, isTextarea = false, type = "text", error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || (value && value.length > 0) || type === "date";

  return (
    <div className="relative mt-6 w-full">
      <label className={`absolute left-3 px-1.5 transition-all duration-200 pointer-events-none z-10 ${
        isFloating ? "-top-2.5 text-[11px] font-bold text-red-600 bg-white" : "top-3.5 text-gray-500 text-sm bg-transparent"
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
        <span className={value ? "text-gray-900" : "text-gray-400"}>{selectedOption ? selectedOption.name : placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`transition-transform ${isOpen ? 'rotate-180 text-red-600' : 'text-gray-400'}`}>
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl p-2 max-h-60 overflow-y-auto">
            {options.map(opt => (
              <div key={opt._id} className="px-4 py-2 hover:bg-red-50 rounded-lg cursor-pointer text-sm transition-all" onClick={() => { onChange({ target: { name, value: opt._id } }); setIsOpen(false); }}>{opt.name}</div>
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
  
  // Popup states
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [popupType, setPopupType] = useState('success');
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
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

    if (!formData.from.trim()) {
      newErrors.from = "Departure city is required";
      isValid = false;
    }

    if (!formData.to.trim()) {
      newErrors.to = "Destination city is required";
      isValid = false;
    }

    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required";
      isValid = false;
    } else {
      // Check if departure date is in the future
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const departureDate = new Date(formData.departureDate);
      if (departureDate < today) {
        newErrors.departureDate = "Departure date must be in the future";
        isValid = false;
      }
    }

    if (!formData.flightType) {
      newErrors.flightType = "Please select a flight class";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (validateForm()) {
      // Show confirmation popup if validation passes
      setShowConfirmPopup(true);
    } else {
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmPopup(false);
    // Now submit the form
    dispatch(submitFlightForm(formData));
  };

  // Handle API response
  useEffect(() => {
    if (message) {
      // Extract message from API response
      const responseMessage = typeof message === 'string' 
        ? message 
        : message?.message || "Flight enquiry submitted successfully";
      
      setPopupType('success');
      setPopupMessage(responseMessage);
      setShowResultPopup(true);
      setFormData(initialForm);
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
    setShowConfirmPopup(false);
    setShowResultPopup(false);
    setPopupMessage('');
  };

  return (
    <>
      <CommonHeroSection title="Flight Booking" backgroundImage={bannerimg.src} />
      <MainLayout className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-red-600 p-4 rounded-2xl text-white"><PlaneTakeoff size={30}/></div>
              <div>
                <h2 className="text-2xl font-black">Book Your Flight</h2>
                <p className="text-gray-500 text-sm">Experience seamless travel with Pals Holidays</p>
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

            <form onSubmit={handleSubmitClick} className="space-y-2">
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
                  label="Country of Residence" 
                  name="countryOfResidence" 
                  value={formData.countryOfResidence} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FloatingLabelInput 
                  label="Email Address" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  type="email"
                  error={errors.email}
                />
                <FloatingLabelInput 
                  label="Phone Number" 
                  name="phoneNo" 
                  value={formData.phoneNo} 
                  onChange={handleChange} 
                  required 
                  type="tel"
                  error={errors.phoneNo}
                />
              </div>

              <FloatingLabelSelect 
                label="Flight Class" 
                name="flightType" 
                options={[
                  {_id: "Economic", name: "Economic"}, 
                  {_id: "Premium Economy", name: "Premium Economy"},
                  {_id: "Business", name: "Business Class"}, 
                  {_id: "First Class", name: "First Class"}
                ]} 
                value={formData.flightType} 
                onChange={handleChange} 
                placeholder="Select Class" 
                required
                error={errors.flightType}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FloatingLabelInput 
                  label="From" 
                  name="from" 
                  value={formData.from} 
                  onChange={handleChange} 
                  required 
                  error={errors.from}
                />
                <FloatingLabelInput 
                  label="To" 
                  name="to" 
                  value={formData.to} 
                  onChange={handleChange} 
                  required 
                  error={errors.to}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FloatingLabelInput 
                  label="Departure" 
                  name="departureDate" 
                  type="date" 
                  value={formData.departureDate} 
                  onChange={handleChange} 
                  required 
                  error={errors.departureDate}
                />
                <FloatingLabelInput 
                  label="Return" 
                  name="returnDate" 
                  type="date" 
                  value={formData.returnDate} 
                  onChange={handleChange} 
                  min={formData.departureDate}
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
                {loading ? "Processing..." : "Claim Your Free Spot"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </MainLayout>

      {/* Confirmation Popup - Keep this for user confirmation before submission */}
      <Message_Popups
        isOpen={showConfirmPopup}
        type="confirm"
        onClose={handleClosePopups}
        onConfirm={handleConfirmSubmit}
      >
        <div className="space-y-2">
          <p className="text-sm text-gray-700">Are you sure you want to book the ticket.</p>
        </div>
      </Message_Popups>

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

export default FlightBookingSection;