"use client";
import Image from "next/image";
import leftimg from "@/app/assets/about-bg-1.svg";
import rightimg from "@/app/assets/about-bg-2.svg";
import { FaUsers, FaHeadset, FaTags } from "react-icons/fa";
import MainLayout from "@/app/common/MainLayout";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import bannerimg from "@/app/assets/about-bg.svg";
import { motion } from "framer-motion";
import { fadeFromTop, fadeFromBottom } from "@/app/common/animations";

const AboutPalsSection = () => {
  const title = "About Pals Holidays";

  return (
    <>
      <CommonHeroSection
        title={`Your Trusted One-Stop Travel Partner `}
        backgroundImage={bannerimg.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "India Holidays", href: "/packages" },
          { label: title || "Destination" },
        ]}
      />

      <MainLayout className="bg-[#f3f3f3] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            <div className="lg:col-span-8">

     
              <motion.div
                variants={fadeFromBottom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className="relative h-[321px] rounded-2xl overflow-hidden">
                  <Image
                    src={leftimg}
                    alt="About Pals"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-2xl md:text-3xl font-bold mb-4">
                    About Pals Holidays
                  </h4>
                  <p className="leading-relaxed mb-6">
                    Pals Holidays India Pvt Ltd is a dynamic travel and tour
                    organization in India, established as a premier travel
                    management agency with strong domestic and overseas
                    operations. We leverage the latest technology and
                    continuously monitor global safety and weather conditions to
                    deliver reliable travel services.
                  </p>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm cursor-pointer font-medium transition">
                    Get a Quote
                  </button>
                </div>
              </motion.div>

          
              <motion.div
                variants={fadeFromTop}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="mt-16"
              >
                <h4 className="text-xl font-bold mb-8">Why Pals?</h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                  <div className="flex gap-4">
                    <div>
                      <FaUsers
                        size={40}
                        className="text-gray-600 text-2xl mb-5"
                      />
                      <h5 className="font-semibold mb-1">Expert Guidance</h5>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Our team knows exactly what documents you need and helps
                        you avoid mistakes that cause delays.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div>
                      <FaHeadset
                        size={40}
                        className="text-gray-600 text-2xl mb-5"
                      />
                      <h5 className="font-semibold mb-1">24/7 Support</h5>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Got questions at midnight? No problem. Our support team
                        is always available to help you.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div>
                      <FaTags
                        size={40}
                        className="text-gray-600 text-2xl mb-5"
                      />
                      <h5 className="font-semibold mb-1">
                        Best Price Guarantee
                      </h5>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Competitive pricing, no hidden charges. Get full value
                        for your money with every application.
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>

            </div>

         
            <div className="lg:col-span-4">
              <motion.div
                variants={fadeFromBottom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="relative h-[600px] rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src={rightimg}
                  alt="Travel Destination"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default AboutPalsSection;
