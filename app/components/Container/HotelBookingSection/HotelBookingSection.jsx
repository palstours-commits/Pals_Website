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
import SingleSelectDropdown from "@/app/common/SingleSelectDropdown";

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

  const roomTypeOptions = [
    { _id: "premium", name: "Premium" },
    { _id: "standard", name: "Standard" },
    { _id: "luxury", name: "Luxury" },
  ];

  return (
    <>
      <CommonHeroSection
        title={`Hotel Booking`}
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "India Holidays", href: "/holidays/indian-holiday" },
          { label: title || "Destination" },
        ]}
      />

      <MainLayout>
        <div className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" mb-10 text-center">
              <h4 className="font-bold mb-4">
                Book Hotels Online with Pals Holidays at affordable rates.
              </h4>
              <p className="text-gray-600 text-sm md:text-base ">
                Book Hotels online and enjoy affordable fares, warm service and
                reliable operations to destinations across India. We are
                available for 24*7 for our customers. Reserve, book and rebook
                Hotels according to your desires.
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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email Id"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
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
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <SingleSelectDropdown
                    label="Room Type"
                    options={roomTypeOptions}
                    value={formData.roomType}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, roomType: val }))
                    }
                    placeholder="Select Room Type"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Number of Rooms
                  </label>
                  <input
                    name="rooms"
                    type="number"
                    value={formData.rooms}
                    onChange={handleChange}
                    placeholder="Rooms"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Destination
                  </label>
                  <input
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="Destination"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Number of Adults
                  </label>
                  <input
                    name="noOfAdults"
                    value={formData.noOfAdults}
                    onChange={handleChange}
                    placeholder="Adults"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkOutDate"
                    value={formData.checkOutDate}
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
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Note"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                />
              </div>
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
