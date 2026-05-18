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

const FloatingLabelInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  isTextarea = false,
  type = "text",
  error
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const isFloating =
    isFocused ||
    (value !== "" && value !== null && value !== undefined) ||
    type === "date";

  return (
    <div className="relative mt-5 sm:mt-6 w-full">
      <label
        className={`absolute left-3 px-1.5 transition-all duration-200 pointer-events-none z-10 ${
          isFloating
            ? "-top-2.5 text-[11px] font-bold text-gray-800 bg-white"
            : "top-3.5 text-gray-500 text-sm bg-transparent"
        }`}
      >
        {label.toUpperCase()} {required && <span className="text-red-500">*</span>}
      </label>

      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows="4"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 rounded-xl border ${
            error ? "border-red-500 bg-red-50" : "border-gray-200"
          } focus:border-gray-800 focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none text-sm sm:text-base`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={isFocused ? placeholder : ""}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 rounded-xl border ${
            error ? "border-red-500 bg-red-50" : "border-gray-200"
          } focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none transition-all text-sm sm:text-base`}
        />
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1 ml-1">
          {error}
        </p>
      )}
    </div>
  );
};

const Contactsection = () => {
  const { error, message, loading } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  const [showResultPopup, setShowResultPopup] = useState(false);
  const [popupType, setPopupType] = useState("success");
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    dispatch(getPackages());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(
        submitContact({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          mobile: form.mobile,
          message: form.message
        })
      );
    } else {
      // Adjusted scroll for mobile so it doesn't overshoot
      const formElement = document.getElementById("contact-form-container");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (message) {
      const responseMessage =
        message?.message ||
        message?.data?.message ||
        (typeof message === "string" ? message : null) ||
        "Thank you for contacting us. We'll get back to you soon!";

      setPopupType("success");
      setPopupMessage(responseMessage);
      setShowResultPopup(true);

      setForm(initialForm);
      setErrors(initialErrors);

      dispatch(clearContactState());
    }

    if (error) {
      const errorMessage =
        error?.message ||
        error?.data?.message ||
        (typeof error === "string" ? error : null) ||
        "Something went wrong. Please try again.";

      setPopupType("error");
      setPopupMessage(errorMessage);
      setShowResultPopup(true);

      dispatch(clearContactState());
    }
  }, [message, error, dispatch]);

  const handleClosePopups = () => {
    setShowResultPopup(false);
    setPopupMessage("");
  };

  return (
    <>
      <CommonHeroSection
        title="Contact Us"
        backgroundImage={bannerimg.src}
      />

      <MainLayout className="bg-gray-50 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            
            {/* Left Side - Contact Info */}
            <div className="space-y-6 md:space-y-8">
              
              {/* Header Section */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2 sm:mb-3 leading-tight">
                  Get in Touch
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We're here to help you plan your perfect journey.
                </p>
              </div>

              {/* Contact Items List */}
              {/* FIX: Changed from 'flex items-center justify-between' to 'flex flex-col' so they stack on mobile */}
              <div className="flex flex-col gap-6 md:gap-8">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    lines: [
                      { text: "mail@palsholidays.com", href: "mailto:mail@palsholidays.com" },
                      { text: "palstours@gmail.com", href: "mailto:palstours@gmail.com" }
                    ]
                  },
                  {
                    icon: Phone,
                    title: "Call / WhatsApp",
                    lines: [
                      { text: "+91 98412 55715", href: "tel:+919841255715" },
                      { text: "+91 90030 12226", href: "tel:+919003012226" }
                    ]
                  },
                  {
                    icon: MapPin,
                    title: "India Address",
                    lines: [
                      { text: "No.6, TNHB Office Complex,", href: null },
                      { text: "Mogappair, Chennai", href: null }
                    ]
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 sm:gap-4 items-start group">
                    
                    {/* Icon Container */}
                    <div className="text-red-600 bg-red-50 p-2.5 sm:p-3 rounded-xl h-fit shrink-0 transition-colors duration-300 group-hover:bg-red-100">
                      <item.icon className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                    </div>

                    {/* Text Container */}
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                        {item.title}
                      </h4>
                      
                      <div className="space-y-0.5 sm:space-y-1 mt-1">
                        {item.lines.map((line, j) => (
                          line.href ? (
                            <a 
                              key={j} 
                              href={line.href} 
                              className="block text-gray-600 text-xs sm:text-sm hover:text-red-600 transition-colors py-0.5"
                            >
                              {line.text}
                            </a>
                          ) : (
                            <p key={j} className="text-gray-600 text-xs sm:text-sm py-0.5">
                              {line.text}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <motion.div
              id="contact-form-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 mt-4 lg:mt-0"
            >
              <h2 className="text-xl sm:text-xl md:text-2xl font-bold text-gray-900 text-center">
                Plan Your Dream Trip Today
              </h2>

              <div className="flex justify-center mt-3 md:mt-4">
                <div className="h-1 w-16 md:w-20 bg-red-600 rounded-full"></div>
              </div>

              <form onSubmit={handleSubmitClick} className="space-y-2 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-6">
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
                  className="w-full mt-6 md:mt-8 bg-red-600 text-white font-semibold py-2 sm:py-4 rounded-xl shadow-lg hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? "Submitting..." : "Send Message"}
                </motion.button>
              </form>
            </motion.div>

          </div>
        </div>
      </MainLayout>

      <Message_Popups
        isOpen={showResultPopup}
        type={popupType}
        onClose={handleClosePopups}
      >
        <div className="text-center">
          <p className="text-sm text-gray-800">
            {popupMessage}
          </p>
        </div>
      </Message_Popups>
    </>
  );
};

export default Contactsection;