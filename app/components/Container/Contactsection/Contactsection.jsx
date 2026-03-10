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
    <div className="relative mt-6 w-full">

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
          } focus:border-gray-800 focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none`}
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
          } focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none transition-all`}
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

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
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

      <MainLayout className="bg-gray-50 py-16">

        <div className="max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div className="space-y-8">

              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                Get in Touch
              </h2>

              <p className="text-gray-600 leading-relaxed">
                We're here to help you plan your perfect journey.
              </p>

              {[
                {
                  icon: Mail,
                  title: "Email",
                  lines: ["mail@palsholidays.com", "palstours@gmail.com"]
                },
                {
                  icon: Phone,
                  title: "Call / WhatsApp",
                  lines: ["+91 98412 55715", "+91 90030 12226"]
                },
                {
                  icon: MapPin,
                  title: "India Address",
                  lines: ["No.6, TNHB Office Complex,", "Mogappair, Chennai"]
                }
              ].map((item, i) => (

                <div key={i} className="flex gap-4">

                  <div className="text-red-600 bg-red-50 p-3 rounded-xl h-fit">
                    <item.icon size={22} />
                  </div>

                  <div>

                    <h4 className="font-bold text-gray-900">
                      {item.title}
                    </h4>

                    {item.lines.map((line, j) => (
                      <p key={j} className="text-gray-600 text-sm">
                        {line}
                      </p>
                    ))}

                  </div>

                </div>
              ))}

            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100"
            >

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                Plan Your Dream Trip Today
              </h2>

              <div className="flex justify-center mt-4">
                <div className="h-1 w-20 bg-red-600 rounded-full"></div>
              </div>

              <form onSubmit={handleSubmitClick} className="space-y-2 mt-6">

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
                  className="w-full mt-10 bg-gray-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-red-600 transition-all disabled:opacity-50"
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