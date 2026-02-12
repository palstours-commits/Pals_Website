import CommonHeroSection from "@/app/common/CommonHeroSection";
import React from "react";
import bannerimg from "@/app/assets/contact-banner.svg";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import MainLayout from "@/app/common/MainLayout";
import ContactBgimg from "@/app/assets/contact-bg.svg";
import Image from "next/image";
const Contactsection = () => {
  const title = "Contact Us";
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

              <div className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your First Name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Last Name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your Address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Mobile number
                  </label>
                  <input
                    type="text"
                    placeholder="+91"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block text-sm text-gray-500 mb-1">
                      Person
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 appearance-none focus:ring-2 focus:ring-red-500 outline-none transition">
                      <option>Select</option>
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-[42px] text-gray-500 pointer-events-none"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm text-gray-500 mb-1">
                      Plan
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 appearance-none focus:ring-2 focus:ring-red-500 outline-none transition">
                      <option>Select</option>
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-[42px] text-gray-500 pointer-events-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Note
                  </label>
                  <textarea
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition"
                  ></textarea>
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-4 sm:py-5 rounded-full text-sm">
                  Claim Your Free Spot
                </button>
              </div>
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
