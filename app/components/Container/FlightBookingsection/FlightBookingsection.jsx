"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import React, { useEffect, useState } from "react";
import bannerimg from "@/app/assets/flight-bg.svg";
import MainLayout from "@/app/common/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  clearServiceFormState,
  submitFlightForm,
} from "@/app/store/slice/serviceFormSlice";
import { notifyAlert } from "@/app/hooks/NotificationService";
import SingleSelectDropdown from "@/app/common/SingleSelectDropdown";

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

  const flightTypeOptions = [
    { _id: "Economic", name: "Economic" },
    { _id: "First Class", name: "First Class" },
  ];
  return (
    <>
      <CommonHeroSection
        title={`Flight`}
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: title || "Destination" },
        ]}
      />
      <MainLayout>
        <div className=" py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 md:mb-20 text-center">
              <h4 className="font-bold mb-4">
                Book Flights Online with Pals Holidays at affordable rates.
              </h4>
              <p className="text-gray-600 text-sm md:text-base">
                Book flights online and enjoy affordable fares, warm service and
                reliable operations to destinations across India. We are
                available for 24*7 for our customers. Reserve, book and rebook
                flights according to your desires.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    name="countryOfResidence"
                    placeholder="Enter Your Residence"
                    value={formData.countryOfResidence}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email Id"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNo"
                    placeholder="+91"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
              </div>
              <div className="relative">
                <SingleSelectDropdown
                  label="Flight Type"
                  options={flightTypeOptions}
                  value={formData.flightType}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, flightType: val }))
                  }
                  placeholder="Select Flight Type"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Number of Adults
                  </label>
                  <input
                    type="number"
                    name="noOfAdults"
                    min={1}
                    value={formData.noOfAdults}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Number of Children
                  </label>
                  <input
                    type="number"
                    name="noOfChildren"
                    min={0}
                    value={formData.noOfChildren}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    From
                  </label>
                  <input
                    type="text"
                    name="from"
                    placeholder="From"
                    value={formData.from}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    To
                  </label>
                  <input
                    type="text"
                    name="to"
                    placeholder="To"
                    value={formData.to}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Return Date
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-500"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Additional Note
                </label>
                <textarea
                  rows="5"
                  name="message"
                  placeholder="Note"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                />
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-3 w-full md:w-[500px] bg-red-600 hover:bg-red-700 transition text-white font-semibold py-4 rounded-full ${
                    loading
                      ? "opacity-60 cursor-not-allowed hover:bg-red-600"
                      : ""
                  }`}
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
