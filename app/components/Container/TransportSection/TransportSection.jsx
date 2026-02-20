"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import React, { useEffect, useState } from "react";
import bannerimg from "@/app/assets/car_booking.svg";
import MainLayout from "@/app/common/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { notifyAlert } from "@/app/hooks/NotificationService";
import {
  clearServiceFormState,
  submitTransportForm,
} from "@/app/store/slice/serviceFormSlice";
import SingleSelectDropdown from "@/app/common/SingleSelectDropdown";

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

  const rentalTypeOptions = [
    { _id: "airport", name: "Airport Pickup / Drop" },
    { _id: "city", name: "One Day City Hire" },
    { _id: "outstation", name: "Outstation Hire" },
    { _id: "others", name: "Others" },
  ];

  const carTypeOptions = [
    { _id: "4_seater", name: "4 Seater" },
    { _id: "5_seater", name: "5 Seater" },
    { _id: "7_seater", name: "7 Seater" },
    { _id: "7_seater_plus", name: "7 Seater+" },
  ];

  return (
    <>
      <CommonHeroSection
        title={`Car Booking`}
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
            <div className=" mb-10 text-center">
              <h4 className="font-bold mb-4">
                CAR RENTAL SERVICES IN CHENNAI & ALL OVER INDIA
              </h4>
              <p className="text-gray-600 text-sm md:text-base ">
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
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Full Name"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-0"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Country of Residence
                  </label>
                  <input
                    name="countryOfResidence"
                    value={formData.countryOfResidence}
                    onChange={handleChange}
                    placeholder="Country of Residence"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-0"
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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email Id"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-0"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Phone Number
                  </label>
                  <input
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    placeholder="+91"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SingleSelectDropdown
                  label="Rental Type"
                  options={rentalTypeOptions}
                  value={formData.rentalType}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, rentalType: val }))
                  }
                  placeholder="Select Rental Type"
                />

                <SingleSelectDropdown
                  label="Car Type"
                  options={carTypeOptions}
                  value={formData.carType}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, carType: val }))
                  }
                  placeholder="Select Car Type"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Pickup Location
                  </label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Pickup Location"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-0"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Number of Adults
                  </label>
                  <input
                    type="number"
                    name="noOfAdults"
                    value={formData.noOfAdults}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-0 text-gray-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-0 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-0 text-gray-600"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Additional Note
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Note"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-0"
                />
              </div>
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
