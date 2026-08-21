"use client";
import bannerimg from "@/app/assets/hotel_booking.png";
import bannerimgMobile from "@/app/assets/hotel_booking_mobile.png";
import hotelImageVector from "@/app/assets/hotelImageVector.png";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import { FloatingLabelInput } from "@/app/common/FloatingLabelInput";
import { FloatingLabelSelect } from "@/app/common/FloatingLabelSelect";
import MainLayout from "@/app/common/MainLayout";
import Message_Popups from "@/app/common/Message_Popups";
import { clearServiceFormState, submitHotelForm } from "@/app/store/slice/serviceFormSlice";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  Coffee,
  Headset,
  MapPin,
  Sparkles,
  Wifi
} from 'lucide-react';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialHotelForm = {
  serviceType: "hotel",
  name: "",
  email: "",
  phoneNo: "",
  country: "",
  countryOfResidence: "",
  destination: "",
  rooms: "",
  roomType: "",
  mealType: "",
  checkInDate: "",
  checkOutDate: "",
  noOfAdults: "",
  noOfChildren: "",
  message: "",
};

const initialErrors = {
  name: "",
  email: "",
  phoneNo: "",
  destination: "",
  checkInDate: "",
  checkOutDate: "",
  roomType: "",
  noOfAdults: "",
};



const HotelBookingSection = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.service);
  const [formData, setFormData] = useState(initialHotelForm);
  const [errors, setErrors] = useState(initialErrors);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [popupType, setPopupType] = useState('success');
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'rooms' || name === 'noOfAdults' || name === 'noOfChildren') {
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
    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required";
      isValid = false;
    }
    if (!formData.checkInDate) {
      newErrors.checkInDate = "Check-in date is required";
      isValid = false;
    }
    if (!formData.checkOutDate) {
      newErrors.checkOutDate = "Check-out date is required";
      isValid = false;
    }
    if (!formData.roomType) {
      newErrors.roomType = "Room type is required";
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
      dispatch(submitHotelForm(formData));
    }
  };

  useEffect(() => {
    if (message) {
      const responseMessage = message?.message || message?.data?.message || (typeof message === "string" ? message : null) || "Hotel enquiry submitted successfully";
      setPopupType("success");
      setPopupMessage(responseMessage);
      setShowResultPopup(true);
      setFormData(initialHotelForm);
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

  const roomTypeOptions = [
    { _id: "Standard", name: "Standard Room" },
    { _id: "Deluxe", name: "Deluxe Room" },
    { _id: "Suite", name: "Suite" },
    { _id: "Executive", name: "Executive Suite" },
    { _id: "Presidential", name: "Presidential Suite" },
  ];

  const mealTypeOptions = [
    { _id: "Room Only", name: "Room Only" },
    { _id: "Bed & Breakfast", name: "Bed & Breakfast" },
    { _id: "Half Board", name: "Half Board" },
    { _id: "Full Board", name: "Full Board" },
    { _id: "All Inclusive", name: "All Inclusive" },
  ];

  return (
    <>
      <CommonHeroSection title="Hotel Booking"
        height="min-h-[300px] sm:min-h-[380px]"
        backgroundImage={{
          desktop: bannerimg.src,
          mobile: bannerimgMobile.src,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Hotel Booking", href: "/service/hotel" },
        ]}
      />
      <MainLayout className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className="flex flex-col h-full">
              <div className=" p-6 md:p-8 h-full flex flex-col">
                <div className="text-center lg:text-left mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Why Book Hotels With Us
                  </h3>
                  <p className="text-gray-600 text-sm max-w-2xl mx-auto lg:mx-0">
                    Find your perfect stay with exclusive deals and premium service.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 flex-grow">
                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Best Hotel Deals</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Exclusive rates at top hotels worldwide
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Wifi size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Free Amenities</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Wi-Fi, breakfast & more included
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Headset size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">24/7 Support</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Round-the-clock assistance
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="bg-red-50 p-2.5 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Flexible Booking</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Free cancellation on most rooms
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-auto">
                  <div className="relative w-80 h-80 mx-auto">
                    <Image
                      src={hotelImageVector}
                      alt="Hotel Booking"
                      fill
                      className="object-contain mix-blend-multiply"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-600 p-2.5 rounded-lg text-white">
                    <Building2 size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Book Your Hotel</h3>
                    <p className="text-gray-500 text-xs">Find your perfect stay</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
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

                  <FloatingLabelInput
                    label="Destination / Hotel"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    error={errors.destination}
                    placeholder="Enter city, resort, or hotel name"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FloatingLabelSelect
                      name="roomType"
                      options={roomTypeOptions}
                      value={formData.roomType}
                      onChange={handleChange}
                      placeholder="Select room type"
                      error={errors.roomType}
                    />
                    <FloatingLabelInput
                      label="Rooms"
                      name="rooms"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.rooms}
                      onChange={handleChange}
                      placeholder="Number of rooms"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FloatingLabelSelect
                      name="mealType"
                      options={mealTypeOptions}
                      value={formData.mealType}
                      onChange={handleChange}
                      placeholder="Select meal plan"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <FloatingLabelInput
                        label="Adults"
                        name="noOfAdults"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.noOfAdults}
                        onChange={handleChange}
                        required
                        error={errors.noOfAdults}
                        placeholder="Adults"
                      />
                      <FloatingLabelInput
                        label="Children"
                        name="noOfChildren"
                        type="number"
                        min="0"
                        max="10"
                        value={formData.noOfChildren}
                        onChange={handleChange}
                        placeholder="Children"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FloatingLabelInput
                      label="Check-in"
                      name="checkInDate"
                      type="date"
                      value={formData.checkInDate}
                      onChange={handleChange}
                      required
                      error={errors.checkInDate}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <FloatingLabelInput
                      label="Check-out"
                      name="checkOutDate"
                      type="date"
                      value={formData.checkOutDate}
                      onChange={handleChange}
                      required
                      error={errors.checkOutDate}
                      min={formData.checkInDate}
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
                    {loading ? "Processing..." : "Check Hotel Availability"}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
          <div className="mt-16 md:mt-30">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center group">
                <div className="bg-red-50 p-4 rounded-xl text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <MapPin size={28} />
                </div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-gray-100 leading-none mr-3">1</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base mb-1">Choose Destination</h4>
                    <p className="text-gray-500 text-xs">Select your perfect location</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="bg-red-50 p-4 rounded-xl text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Calendar size={28} />
                </div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-gray-100 leading-none mr-3">2</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base mb-1">Pick Dates</h4>
                    <p className="text-gray-500 text-xs">Select check-in & check-out</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="bg-red-50 p-4 rounded-xl text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Coffee size={28} />
                </div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-gray-100 leading-none mr-3">3</span>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base mb-1">Enjoy Your Stay</h4>
                    <p className="text-gray-500 text-xs">Relax and make memories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </MainLayout>
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

export default HotelBookingSection;