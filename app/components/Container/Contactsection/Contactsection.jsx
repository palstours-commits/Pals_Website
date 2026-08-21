"use client";
import bannerimg from "@/app/assets/contact-banner.svg";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import { FloatingLabelInput } from "@/app/common/FloatingLabelInput";
import { FloatingLabelSelect } from "@/app/common/FloatingLabelSelect";
import MainLayout from "@/app/common/MainLayout";
import Message_Popups from "@/app/common/Message_Popups";
import { clearContactState, submitContact } from "@/app/store/slice/contactSlice";
import { getPackages } from "@/app/store/slice/packageSlice";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialForm = {
  serviceType: "flight",
  name: "",
  email: "",
  mobile: "",
  country: "",
  tourDescription: "",
  arrivalDate: "",
  departureDate: "",
  stayType: "",
  numberOfGuests: "",
};

const initialErrors = {
  email: "",
  mobile: "",
  numberOfGuests: "",
  tourDescription: "",
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
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Phone number is required";
      isValid = false;
    }

    if (!form.numberOfGuests.toString().trim()) {
      newErrors.numberOfGuests = "Number of guests is required";
      isValid = false;
    } else if (parseInt(form.numberOfGuests) < 1) {
      newErrors.numberOfGuests = "At least 1 guest is required";
      isValid = false;
    }

    if (!form.tourDescription.trim()) {
      newErrors.tourDescription = "Tour description is required";
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
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          country: form.country,
          tourDescription: form.tourDescription,
          arrivalDate: form.arrivalDate,
          departureDate: form.departureDate,
          stayType: form.stayType,
          numberOfGuests: Number(form.numberOfGuests),
        })
      );
    } else {
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
      <CommonHeroSection title="Contact Us" backgroundImage={bannerimg.src} breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact" || "Destination" },
      ]} />
      <MainLayout className="bg-gray-50 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                  Get in Touch
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We're here to help you plan your perfect journey.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    lines: [
                      { text: "mail@palsholidays.com", href: "mailto:mail@palsholidays.com" },
                      { text: "palstours@gmail.com", href: "mailto:palstours@gmail.com" },
                    ],
                  },
                  {
                    icon: Phone,
                    title: "Call / WhatsApp",
                    lines: [
                      { text: "+91 98412 55715", href: "tel:+919841255715" },
                      { text: "+91 90030 12226", href: "tel:+919003012226" },
                    ],
                  },
                  {
                    icon: MapPin,
                    title: "India Address",
                    lines: [
                      { text: "No.6, TNHB Office Complex,", href: null },
                      { text: "Mogappair, Chennai", href: null },
                    ],
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 sm:gap-4 items-start group">
                    <div className="text-red-600 bg-red-50 p-2.5 sm:p-3 rounded-xl h-fit shrink-0 transition-colors duration-300 group-hover:bg-red-100">
                      <item.icon className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                        {item.title}
                      </h4>
                      <div className="space-y-0.5 sm:space-y-1 mt-1">
                        {item.lines.map((line, j) =>
                          line.href ? (
                            <a
                              key={j}
                              href={line.href}
                              className="block text-gray-600 text-xs sm:text-sm hover:text-red-600 transition-colors"
                            >
                              {line.text}
                            </a>
                          ) : (
                            <p key={j} className="text-gray-600 text-xs sm:text-sm">
                              {line.text}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              id="contact-form-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-5 sm:p-8 rounded-xl shadow-xl border border-gray-100 mt-4 lg:mt-0"
            >
              <h3 className="text-xl sm:text-xl md:text-xl font-bold text-gray-900 text-center">
                Plan My Tour
              </h3>
              <div className="flex justify-center mt-1">
                <div className="h-1 w-16 md:w-30 bg-red-600 rounded-full"></div>
              </div>
              <div className="w-full h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-3 md:p-6 h-full"
                >
                  <form onSubmit={handleSubmitClick}>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <FloatingLabelInput
                          label="Full Name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                        />
                        <FloatingLabelInput
                          label="Email Address"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          type="email"
                          error={errors.email}
                          placeholder="user@example.com"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <FloatingLabelInput
                          label="Mobile Number"
                          name="mobile"
                          value={form.mobile}
                          onChange={handleChange}
                          required
                          type="tel"
                          error={errors.mobile}
                          placeholder="9876543210"
                        />
                        <FloatingLabelInput
                          label="Country"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          placeholder="India"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div className="relative">
                          <label className="block text-xs ps-1 font-medium text-gray-600">
                            Arrival Date
                          </label>
                          <FloatingLabelInput
                            name="arrivalDate"
                            type="date"
                            value={form.arrivalDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>

                        <div className="relative">
                          <label className="block text-xs font-medium ps-1 text-gray-600">
                            Departure Date
                          </label>
                          <FloatingLabelInput
                            name="departureDate"
                            type="date"
                            value={form.departureDate}
                            onChange={handleChange}
                            min={
                              form.arrivalDate ||
                              new Date().toISOString().split("T")[0]
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                        <div>
                          <FloatingLabelInput
                            label="Number of Guests"
                            type="number"
                            name="numberOfGuests"
                            value={form.numberOfGuests}
                            onChange={handleChange}
                            required
                            error={errors.numberOfGuests}
                            placeholder="4"
                            min="1"
                            max="99"
                          />
                        </div>
                        <div>
                          <FloatingLabelSelect
                            isLabel={false}
                            label="Select Accommodation Type"
                            name="stayType"
                            options={[
                              { _id: "Standard", name: "Standard" },
                              { _id: "Deluxe", name: "Deluxe" },
                              { _id: "Premium", name: "Premium" },
                              { _id: "Luxury", name: "Luxury" },
                            ]}
                            value={form.stayType}
                            onChange={handleChange}
                            placeholder="Select Type of Stay"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <FloatingLabelInput
                          label="Tour Description"
                          name="tourDescription"
                          value={form.tourDescription}
                          onChange={handleChange}
                          required
                          isTextarea
                          error={errors.tourDescription}
                          placeholder="We are planning a 7-day South India tour covering Kerala and Tamil Nadu."
                        />
                      </div>
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
          <p className="text-sm text-gray-800">{popupMessage}</p>
        </div>
      </Message_Popups>

      <div className="w-full">
        <iframe
          title="Pals Holidays"
          src="https://maps.google.com/maps?q=Pals%20Holidays&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
};

export default Contactsection;