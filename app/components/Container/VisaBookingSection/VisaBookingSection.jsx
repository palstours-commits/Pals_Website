"use client";
import bannerimg from "@/app/assets/visa_booking.svg";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import MainLayout from "@/app/common/MainLayout";
import Message_Popups from "@/app/common/Message_Popups";
import { clearServiceFormState, submitVisaForm } from "@/app/store/slice/serviceFormSlice";
import { AnimatePresence, motion } from "framer-motion";
import { FileText } from 'lucide-react';
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

// --- Reusable Floating Input Component ---
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

const VisaBookingSection = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.service);
  const [formData, setFormData] = useState(initialVisaForm);
  const [errors, setErrors] = useState(initialErrors);
  
  // Popup states
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
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
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

    if (!formData.country.trim()) {
      newErrors.country = "Nationality is required";
      isValid = false;
    }

    if (!formData.countryToVisit.trim()) {
      newErrors.countryToVisit = "Destination country is required";
      isValid = false;
    }

    if (!formData.visaType) {
      newErrors.visaType = "Please select visa type";
      isValid = false;
    }

    if (!formData.travelStartDate) {
      newErrors.travelStartDate = "Travel start date is required";
      isValid = false;
    } else {
      // Check if start date is in the future
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(formData.travelStartDate);
      if (startDate < today) {
        newErrors.travelStartDate = "Travel start date must be in the future";
        isValid = false;
      }
    }

    if (!formData.travelEndDate) {
      newErrors.travelEndDate = "Travel end date is required";
      isValid = false;
    } else if (formData.travelStartDate && formData.travelEndDate) {
      const startDate = new Date(formData.travelStartDate);
      const endDate = new Date(formData.travelEndDate);
      if (endDate <= startDate) {
        newErrors.travelEndDate = "Travel end date must be after start date";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (validateForm()) {
      // Directly submit the form
      dispatch(submitVisaForm(formData));
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
        : message?.message || "Visa enquiry submitted successfully";
      
      setPopupType('success');
      setPopupMessage(responseMessage);
      setShowResultPopup(true);
      setFormData(initialVisaForm);
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

  // Visa type options
  const visaTypeOptions = [
    { _id: "Tourist", name: "Tourist Visa" },
    { _id: "Business", name: "Business Visa" },
    { _id: "Student", name: "Student Visa" },
    { _id: "Work", name: "Work Visa" },
    { _id: "Transit", name: "Transit Visa" },
    { _id: "Medical", name: "Medical Visa" },
    { _id: "Diplomatic", name: "Diplomatic Visa" },
    { _id: "E-Visa", name: "Electronic Visa (E-Visa)" },
  ];

  // Popular countries list (can be expanded)
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
    { _id: "UAE", name: "United Arab Emirates" },
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
      <CommonHeroSection title="Visa Services" backgroundImage={bannerimg.src} />
      <MainLayout className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-red-600 p-4 rounded-2xl text-white">
                <FileText size={30}/>
              </div>
              <div>
                <h2 className="text-2xl font-black">Visa Assistance</h2>
                <p className="text-gray-500 text-sm">Professional guidance for your global travel</p>
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
                  label="First Name" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                  error={errors.firstName}
                />
                <FloatingLabelInput 
                  label="Last Name" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                  error={errors.lastName}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FloatingLabelSelect 
                  label="Nationality" 
                  name="country" 
                  options={countryOptions} 
                  value={formData.country} 
                  onChange={handleChange} 
                  placeholder="Select Nationality" 
                  required
                  error={errors.country}
                />
                <FloatingLabelSelect 
                  label="Country to Visit" 
                  name="countryToVisit" 
                  options={countryOptions} 
                  value={formData.countryToVisit} 
                  onChange={handleChange} 
                  placeholder="Select Destination" 
                  required
                  error={errors.countryToVisit}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FloatingLabelSelect 
                  label="Visa Type" 
                  name="visaType" 
                  options={visaTypeOptions} 
                  value={formData.visaType} 
                  onChange={handleChange} 
                  placeholder="Select Visa Type" 
                  required
                  error={errors.visaType}
                />
                <FloatingLabelInput 
                  label="Country of Residence" 
                  name="countryOfResidence" 
                  value={formData.countryOfResidence} 
                  onChange={handleChange} 
                  placeholder="Current residence"
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
                <FloatingLabelInput 
                  label="Travel Start Date" 
                  name="travelStartDate" 
                  type="date" 
                  value={formData.travelStartDate} 
                  onChange={handleChange} 
                  required 
                  error={errors.travelStartDate}
                  min={new Date().toISOString().split('T')[0]}
                />
                <FloatingLabelInput 
                  label="Travel End Date" 
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
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
                type="submit" 
                disabled={loading} 
                className="w-full mt-10 bg-gray-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-red-600 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Confirm Visa Request"}
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

export default VisaBookingSection;