"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import React, { useEffect, useState } from "react";
import bannerimg from "@/app/assets/contact-banner.svg";
import { Mail, MapPin, Phone } from "lucide-react";
import MainLayout from "@/app/common/MainLayout";
import ContactBgimg from "@/app/assets/contact-bg.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  clearContactState,
  submitContact,
} from "@/app/store/slice/contactSlice";
import { notifyAlert } from "@/app/hooks/NotificationService";
import { getPackages } from "@/app/store/slice/packageSlice";
import SingleSelectDropdown from "@/app/common/SingleSelectDropdown";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  noOfPersons: "",
  plan: "",
  message: "",
};

const Contactsection = () => {
  const { error, message, loading } = useSelector((state) => state.contact);
  const { packages } = useSelector((state) => state.packages);
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialFormState);
  const title = "Contact Us";

  useEffect(() => {
    dispatch(getPackages());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      mobile: form.mobile,
      noOfPersons: form.noOfPersons === "family" ? 4 : Number(form.noOfPersons),
      plan: form.plan,
      message: form.message,
    };
    setForm(initialFormState);
    dispatch(submitContact(payload));
  };

  useEffect(() => {
    if (message) {
      notifyAlert({
        title: "Success",
        message,
        type: "success",
      });
      dispatch(clearContactState());
    }

    if (error) {
      notifyAlert({
        title: "Error",
        message: error,
        type: "error",
      });
      dispatch(clearContactState());
    }
  }, [message, error, dispatch]);

  return (
    <>
      <CommonHeroSection
        title={`Experience the Timeless Beauty of `}
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "India Holidays", href: "/packages" },
          { label: title || "Destination" },
        ]}
      />
      <MainLayout>
        <div className="py-10 md:py-20 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="max-w-xl">
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Get in Touch with Pals Holidays
                </h4>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We're here to help you plan your perfect journey. Whether
                  you're looking for holiday packages, flight bookings, visa
                  assistance, or customized travel solutions, our team is just a
                  call or message away.
                </p>
                <div className="flex gap-4 mb-6">
                  <div className="text-red-600 mt-1">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="text-red-600 font-semibold">Email</h4>
                    <p className="text-gray-700 text-sm">
                      mail@palsholidays.com
                    </p>
                    <p className="text-gray-700 text-sm">palstours@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-4 mb-6">
                  <div className="text-red-600 mt-1">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="text-red-600 font-semibold">
                      Call / Whatsapp
                    </h4>
                    <p className="text-gray-700 text-sm">+91 98412 55715</p>
                    <p className="text-gray-700 text-sm">+91 90030 12226</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-red-600 mt-1">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="text-red-600 font-semibold">
                      India Address
                    </h4>
                    <p className="text-gray-700 text-sm">
                      No.6, TNHB Office Complex,
                      <br />
                      Mogappair, Chennai, 600037
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Enter Your First Name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3  outline-0 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Enter Your Last Name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3  outline-0 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your Address"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3  outline-0 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Mobile number
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="+91"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3  outline-0 transition"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="block text-sm text-gray-500 mb-1">
                        Persons
                      </label>
                      <select
                        name="noOfPersons"
                        value={form.noOfPersons}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3  text-gray-500  outline-0"
                      >
                        <option value="">Select</option>
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="family">Family</option>
                      </select>
                    </div>
                    <div className="relative">
                      <SingleSelectDropdown
                        label="Plan"
                        options={packages}
                        value={form.plan}
                        labelKey="packageName"
                        onChange={(id) =>
                          setForm((prev) => ({
                            ...prev,
                            plan: id,
                          }))
                        }
                        placeholder="Select Plan"
                        searchable
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="6"
                      placeholder="Write your message"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3  outline-0 transition"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-4 sm:py-5 rounded-full text-sm
    ${loading ? "opacity-60 cursor-not-allowed hover:bg-red-600" : ""}
  `}
                  >
                    {loading ? "Submitting..." : "Claim Your Free Spot"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MainLayout>
      <MainLayout>
        <div className="relative w-full ">
          <Image
            src={ContactBgimg}
            alt="Map Background"
            className="w-full h-[420px] object-cover"
            priority
          />
        </div>
      </MainLayout>
    </>
  );
};

export default Contactsection;
