"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import MainLayout from "@/app/common/MainLayout";
import bannerimg from "@/app/assets/flight-bg.svg";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitVisaForm,
  clearServiceFormState,
} from "@/app/store/slice/serviceFormSlice";
import { notifyAlert } from "@/app/hooks/NotificationService";
import SingleSelectDropdown from "@/app/common/SingleSelectDropdown";

const initialVisaForm = {
  serviceType: "visa",
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: "",
  country: "",
  countryOfResidence: "",
  visaType: "",
  countryToVisit: "",
  travelStartDate: "",
  travelEndDate: "",
  message: "",
};

const VisaBookingSection = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.service);

  const [formData, setFormData] = useState(initialVisaForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitVisaForm(formData));
  };

  useEffect(() => {
    if (message) {
      notifyAlert({ title: "Success", message, type: "success" });
      dispatch(clearServiceFormState());
      setFormData(initialVisaForm);
    }

    if (error) {
      notifyAlert({ title: "Error", message: error, type: "error" });
      dispatch(clearServiceFormState());
    }
  }, [message, error, dispatch]);

  const visaTypeOptions = [
    { _id: "tourist", name: "Tourist Visa" },
    { _id: "visitor", name: "Visitor Visa" },
    { _id: "business", name: "Business Visa" },
    { _id: "transit", name: "Transit Visa" },
    { _id: "work_permit", name: "Work Permit Visa" },
    { _id: "entry", name: "Entry Visa" },
    { _id: "conference", name: "Conference Visa" },
  ];

  return (
    <>
      <CommonHeroSection
        title="Visa Services"
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "India Holidays", href: "/holidays/indian-holiday" },
          { label: "Visa Booking" },
        ]}
      />

      <MainLayout>
        <div className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" mb-10 text-center">
              <h4 className="font-bold mb-4">Visa Services</h4>
              <p className="text-gray-600 text-sm md:text-base ">
                We provide complete visa assistance for tourist, business,
                student, and work visas across multiple countries. Our expert
                team guides you through documentation, application submission,
                and appointment scheduling to ensure a smooth and hassle-free
                visa process. Enjoy transparent guidance, timely updates, and
                reliable support throughout your journey.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Country of Residence
                  </label>
                  <input
                    name="countryOfResidence"
                    value={formData.countryOfResidence}
                    onChange={handleChange}
                    placeholder="Country of Residence"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Nationality
                  </label>
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Nationality"
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
                <div className="relative">
                  <SingleSelectDropdown
                    label="Visa Type"
                    options={visaTypeOptions}
                    value={formData.visaType}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, visaType: val }))
                    }
                    placeholder="Select Visa Type"
                    searchable={false}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Country to Visit
                  </label>
                  <input
                    name="countryToVisit"
                    value={formData.countryToVisit}
                    onChange={handleChange}
                    placeholder="Country to Visit"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Travel Start Date
                  </label>
                  <input
                    type="date"
                    name="travelStartDate"
                    value={formData.travelStartDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-500">
                    Travel End Date
                  </label>
                  <input
                    type="date"
                    name="travelEndDate"
                    value={formData.travelEndDate}
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
                className={`w-full md:w-[500px] mx-auto block bg-red-600 hover:bg-red-700 transition text-white font-semibold py-4 rounded-full ${
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

export default VisaBookingSection;
