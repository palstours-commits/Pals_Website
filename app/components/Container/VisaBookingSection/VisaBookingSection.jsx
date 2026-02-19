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

  return (
    <>
      <CommonHeroSection
        title="Experience the Timeless Beauty of"
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "India Holidays", href: "/holidays/indian-holiday" },
          { label: "Visa Booking" },
        ]}
      />

      <MainLayout>
        <div className="bg-[#f5f5f5] py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" mb-10">
              <h4 className="font-bold mb-4">Visa Services</h4>
              <p className="text-gray-600 text-sm md:text-base max-w-3xl">
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
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="countryOfResidence"
                  value={formData.countryOfResidence}
                  onChange={handleChange}
                  placeholder="Country of Residence"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Nationality"
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
                <div className="relative">
                  <select
                    name="visaType"
                    value={formData.visaType}
                    onChange={handleChange}
                    className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0 text-gray-600 appearance-none"
                  >
                    <option value="">Visa Type</option>
                    <option value="Tourist">Tourist</option>
                    <option value="Business">Business</option>
                    <option value="Student">Student</option>
                    <option value="Work">Work</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-4 text-gray-500"
                    size={18}
                  />
                </div>

                <input
                  name="countryToVisit"
                  value={formData.countryToVisit}
                  onChange={handleChange}
                  placeholder="Country to Visit"
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="date"
                  name="travelStartDate"
                  value={formData.travelStartDate}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0 text-gray-500"
                />
                <input
                  type="date"
                  name="travelEndDate"
                  value={formData.travelEndDate}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-3 outline-0 text-gray-500"
                />
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
