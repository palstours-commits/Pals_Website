"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import React, { useEffect, useState } from "react";
import bannerimg from "@/app/assets/flight-bg.svg";
import { ChevronDown } from "lucide-react";
import MainLayout from "@/app/common/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  clearServiceFormState,
  submitFlightForm,
} from "@/app/store/slice/serviceFormSlice";
import { notifyAlert } from "@/app/hooks/NotificationService";

const initialForm = {
  serviceType: "flight",
  name: "",
  email: "",
  phoneNo: "",
  country: "",
  countryOfResidence: "",
  flightType: "Round-trip",
  from: "",
  to: "",
  departureDate: "",
  returnDate: "",
  noOfAdults: 1,
  noOfChildren: 0,
  message: "",
};

const FlightBookingSection = () => {
  const dispatch = useDispatch();
  const title = "Flight Booking";
  const { loading, error, message } = useSelector((state) => state.service);
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(submitFlightForm(formData));
  };

  useEffect(() => {
    if (message) {
      notifyAlert({
        title: "Success",
        message,
        type: "success",
      });
      dispatch(clearServiceFormState());
      setFormData(initialForm);
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
                Book Flights Online with Pals Holidays at affordable rates.
              </h4>
              <p className="text-gray-600 text-sm md:text-base max-w-3xl">
                Book flights online and enjoy affordable fares, warm service and
                reliable operations to destinations across India. We are
                available for 24*7 for our customers. Reserve, book and rebook
                flights according to your desires.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
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
                  placeholder="Enter Your Email Id"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                />

                <input
                  type="text"
                  name="phoneNo"
                  placeholder="+91"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <select
                    name="flightType"
                    value={formData.flightType}
                    onChange={handleChange}
                    className="w-full border border-gray-400 rounded-md px-4 py-3 text-gray-600 appearance-none outline-none"
                  >
                    <option value="Round-trip">Round-trip</option>
                    <option value="One-way">One-way</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-4 text-gray-500"
                    size={18}
                  />
                </div>
                <div className="relative">
                  <select
                    name="noOfAdults"
                    value={formData.noOfAdults}
                    onChange={handleChange}
                    className="w-full border border-gray-400 rounded-md px-4 py-3 text-gray-600 appearance-none outline-none"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-4 text-gray-500"
                    size={18}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="from"
                  placeholder="From"
                  value={formData.from}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none "
                />
                <input
                  type="text"
                  name="to"
                  placeholder="To"
                  value={formData.to}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none text-gray-500"
                />

                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none text-gray-500"
                />
              </div>
              <textarea
                rows="5"
                name="message"
                placeholder="Note"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md px-4 py-3 outline-none"
              />
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  onClick={() => console.log(formData)}
                  className={`px-3 w-full md:w-[500px] bg-red-600 hover:bg-red-700 transition text-white font-semibold py-4 rounded-full ${loading ? "opacity-60 cursor-not-allowed hover:bg-red-600" : ""}`}
                >
                  {loading ? "Submitting..." : "Claim Your Free Spot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default FlightBookingSection;
