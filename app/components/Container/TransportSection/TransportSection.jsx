"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import React, { useEffect, useState } from "react";
import bannerimg from "@/app/assets/flight-bg.svg";
import MainLayout from "@/app/common/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { notifyAlert } from "@/app/hooks/NotificationService";
import {
  clearServiceFormState,
  submitTransportForm,
} from "@/app/store/slice/serviceFormSlice";

const initialTransportForm = {
  serviceType: "transport",
  name: "",
  email: "",
  phoneNo: "",
  country: "",
  countryOfResidence: "",
  rentalType: "",
  carType: "",
  startDate: "",
  endDate: "",
  noOfAdults: 1,
  noOfChildren: 0,
  location: "",
  message: "",
};

const TransportSection = () => {
  const title = "Transport";
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.service);
  const [formData, setFormData] = useState(initialTransportForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitTransportForm(formData));
  };

  useEffect(() => {
    if (message) {
      notifyAlert({ title: "Success", message, type: "success" });
      dispatch(clearServiceFormState());
      setFormData((prev) => ({ ...prev, ...initialTransportForm }));
    }

    if (error) {
      notifyAlert({ title: "Error", message: error, type: "error" });
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
                CAR RENTAL SERVICES IN CHENNAI & ALL OVER INDIA
              </h4>
              <p className="text-gray-600 text-sm md:text-base max-w-3xl">
                We hereby proudly introduce, Pals Tours and Travels is the
                Travel Company striving to deliver the standards of fine quality
                and service that will make us the #1 car rental company. Whether
                you are traveling for business or pleasure, you can be assured
                of quality cars and a wide range of services that makes Pals
                Tours and Travels your First choice of car rental. We offer a
                wide range of vehicle range from Economic, Executive and
                Luxurious Vehicle to spacious MPVs to suit your needs.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Full Name"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
                <input
                  name="countryOfResidence"
                  value={formData.countryOfResidence}
                  onChange={handleChange}
                  placeholder="Country of Residence"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email Id"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
                <input
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="+91"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select
                  name="rentalType"
                  value={formData.rentalType}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0 text-gray-600"
                >
                  <option value="">Rental Type</option>
                  <option value="Local">Local</option>
                  <option value="Outstation">Outstation</option>
                  <option value="Airport">Airport Transfer</option>
                </select>

                <select
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0 text-gray-600"
                >
                  <option value="">Car Type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Innova">Innova</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Pickup Location"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
                <select
                  name="noOfAdults"
                  value={formData.noOfAdults}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0 text-gray-600"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                </select>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Note"
                className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-[500px] mx-auto block bg-red-600 hover:bg-red-700 text-white py-4 rounded-full ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
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

export default TransportSection;
