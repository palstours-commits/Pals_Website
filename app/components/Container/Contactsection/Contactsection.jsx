"use client";
import bannerimg from "@/app/assets/contact-banner.svg";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import MainLayout from "@/app/common/MainLayout";
import Message_Popups from "@/app/common/Message_Popups";
import { clearContactState, submitContact } from "@/app/store/slice/contactSlice";
import { getPackages } from "@/app/store/slice/packageSlice";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialForm = {
  firstName: "", 
  lastName: "", 
  email: "", 
  mobile: "", 
  message: ""
};

const initialErrors = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  message: ""
};

// --- Reusable Floating Input Component ---
const FloatingLabelInput = ({ label, name, value, onChange, placeholder, required = false, isTextarea = false, type = "text", error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || (value && value.toString().length > 0);

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

const Contactsection = () => {
  const { error, message, loading } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  
  // Popup states
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [popupType, setPopupType] = useState('success');
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => { 
    dispatch(getPackages()); 
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // First Name validation
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
      isValid = false;
    }

    // Last Name validation
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (form.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Mobile validation
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(form.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number";
      isValid = false;
    }

    // Message validation
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
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
    dispatch(submitContact({
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      mobile: form.mobile,
      message: form.message,
    }));
  };

  // Handle API response
  useEffect(() => {
    if (message) {
      // Extract message from API response
      const responseMessage = typeof message === 'string' 
        ? message 
        : message?.message || "Thank you for contacting us. We'll get back to you soon!";
      
      setPopupType('success');
      setPopupMessage(responseMessage);
      setShowResultPopup(true);
      setForm(initialForm);
      setErrors(initialErrors);
      dispatch(clearContactState());
    }
    if (error) {
      const errorMessage = typeof error === 'string' 
        ? error 
        : error?.message || "An error occurred. Please try again.";
      
      setPopupType('error');
      setPopupMessage(errorMessage);
      setShowResultPopup(true);
      dispatch(clearContactState());
    }
  }, [message, error, dispatch]);

  const handleClosePopups = () => {
    setShowConfirmPopup(false);
    setShowResultPopup(false);
    setPopupMessage('');
  };

  return (
    <>
      <CommonHeroSection title="Contact Us" backgroundImage={bannerimg.src} />
      <MainLayout className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Get in Touch</h2>
              <p className="text-gray-600 leading-relaxed">We're here to help you plan your perfect journey. Our team is just a call or message away.</p>
              
              {[
                { icon: Mail, title: "Email", lines: ["mail@palsholidays.com", "palstours@gmail.com"] },
                { icon: Phone, title: "Call / WhatsApp", lines: ["+91 98412 55715", "+91 90030 12226"] },
                { icon: MapPin, title: "India Address", lines: ["No.6, TNHB Office Complex,", "Mogappair, Chennai, 600037"] }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-red-600 bg-red-50 p-3 rounded-xl h-fit"><item.icon size={22} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    {item.lines.map((line, j) => <p key={j} className="text-gray-600 text-sm">{line}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100"
>
  {/* Form Header with better visual hierarchy */}
  <div className="text-center mb-10">
    {/* <div className="inline-flex bg-red-600 p-4 rounded-2xl text-white shadow-lg mb-4">
      <Phone size={30} />
    </div> */}
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Plan Your Dream Trip Today</h2>
    <div className="flex justify-center mt-4">
      <div className="h-1 w-20 bg-red-600 rounded-full"></div>
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
        label="First Name" 
        name="firstName" 
        value={form.firstName} 
        onChange={handleChange} 
        required 
        error={errors.firstName}
      />
      <FloatingLabelInput 
        label="Last Name" 
        name="lastName" 
        value={form.lastName} 
        onChange={handleChange} 
        required 
        error={errors.lastName}
      />
    </div>
    
    <FloatingLabelInput 
      label="Email Address" 
      name="email" 
      type="email" 
      value={form.email} 
      onChange={handleChange} 
      required 
      error={errors.email}
    />
    
    <FloatingLabelInput 
      label="Mobile Number" 
      name="mobile" 
      value={form.mobile} 
      onChange={handleChange} 
      required 
      error={errors.mobile}
    />
    
    <FloatingLabelInput 
      label="Message" 
      name="message" 
      value={form.message} 
      onChange={handleChange} 
      isTextarea 
      required
      error={errors.message}
    />
    
    <motion.button 
       whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
                type="submit" 
                disabled={loading} 
                className="w-full mt-10 bg-gray-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-red-600 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Submitting..." : "Send Message"}
    </motion.button>
  </form>
</motion.div>
          </div>
        </div>
      </MainLayout>

      {/* Map Section */}
      <div className="w-full h-[400px] grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          title="Map" 
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15544.705809832558!2d80.178049!3d13.088001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x824d29be61867bdb%3A0x2f78c920f9dd537c!2sPals%20Holidays!5e0!3m2!1sen!2sin!4v1771585251396!5m2!1sen!2sin" 
          className="w-full h-full border-0" 
          loading="lazy" 
        />
      </div>

      {/* Confirmation Popup - Simple confirmation message */}
      <Message_Popups
        isOpen={showConfirmPopup}
        type="confirm"
        onClose={handleClosePopups}
        onConfirm={handleConfirmSubmit}
      >
        <div className="space-y-2">
          <p className="text-sm text-gray-700">Are you sure you want to send this message.</p>
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

export default Contactsection;