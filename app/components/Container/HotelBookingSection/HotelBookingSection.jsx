"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import React, { useEffect, useState } from "react";
import bannerimg from "@/app/assets/flight-bg.svg";
import { ChevronDown } from "lucide-react";
import MainLayout from "@/app/common/MainLayout";
import {
  clearServiceFormState,
  submitHotelForm,
} from "@/app/store/slice/serviceFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { notifyAlert } from "@/app/hooks/NotificationService";

const initialHotelForm = {
  serviceType: "hotel",
  name: "",
  email: "",
  phoneNo: "",
  country: "",
  countryOfResidence: "",
  destination: "",
  rooms: 1,
  roomType: "",
  checkInDate: "",
  checkOutDate: "",
  noOfAdults: 1,
  noOfChildren: 0,
  message: "",
};

const HotelBookingSection = () => {
  const dispatch = useDispatch();
  const title = "Hotel Booking";
  const { loading, error, message } = useSelector((state) => state.service);
  const [formData, setFormData] = useState(initialHotelForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitHotelForm(formData));
  };

  useEffect(() => {
    if (message) {
      notifyAlert({
        title: "Success",
        message,
        type: "success",
      });
      dispatch(clearServiceFormState());
      setFormData(initialHotelForm);
    }

    if (error) {
      notifyAlert({
        title: "Error",
        message: error,
        type: "error",
      });
      dispatch(clearServiceFormState());
    }
  }, [message, error, dispatch]);

  return (
    <>
      <CommonHeroSection
        title={`Experience the Timeless Beauty of `}
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "India Holidays", href: "/holidays/indian-holiday" },
          { label: title || "Destination" },
        ]}
      />
      <MainLayout>
        <div className="bg-[#f5f5f5] py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" mb-10">
              <h4 className="font-bold mb-4">
                Book Hotels Online with Pals Holidays at affordable rates.
              </h4>
              <p className="text-gray-600 text-sm md:text-base max-w-3xl">
                Book Hotels online and enjoy affordable fares, warm service and
                reliable operations to destinations across India. We are
                available for 24*7 for our customers. Reserve, book and rebook
                Hotels according to your desires.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Full Name"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                />
                <div className="relative">
                  <input
                    type="text"
                    name="countryOfResidence"
                    placeholder="Enter Your Residence"
                    value={formData.countryOfResidence}
                    onChange={handleChange}
                    className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email Id"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                />
                <input
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="+91"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 text-gray-600 outline-0"
                >
                  <option value="">Room Type</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Standard">Standard</option>
                </select>

                <select
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 text-gray-600 outline-0"
                >
                  <option value={1}>1 Room</option>
                  <option value={2}>2 Rooms</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Destination"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                />
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
                <select
                  name="noOfAdults"
                  value={formData.noOfAdults}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 text-gray-600 outline-none"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                </select>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Note"
                className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-[500px] mx-auto block bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-4 rounded-full"
              >
                {loading ? "Submitting..." : "Claim Your Free Spot"}
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default HotelBookingSection;
