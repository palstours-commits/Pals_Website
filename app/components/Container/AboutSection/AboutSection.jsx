"use client";
import React from "react";
import Image from "next/image";
import OurServices from "../Home/OurServices";
import MissionVisionSection from "./MissionVisionSection";
import Travel from "@/app/assets/travel-img.svg";
import Destinations from "@/app/assets/destinations.svg";
import Countries from "@/app/assets/countries.svg";
import AboutPalsSection from "./AboutPalsSection";
import {motion} from "framer-motion";
import {fadeFromBottom } from "@/app/common/animations";

const AboutSection = () => {
  return (
    <>
      <AboutPalsSection />
      <section className="w-full bg-secondary py-12">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-8">
            
            {/* <div className="flex flex-col items-center"> */}
            <motion.div
              variants={fadeFromBottom}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="flex flex-col items-center"
            >
              <Image src={Travel} alt="Travel" width={50} height={50} />
              <h4 className="text-white text-2xl font-bold mt-4">10,000 +</h4>
              <p className="text-white mt-2 font-semibold">
                Travel Experiences
              </p>
              </motion.div>
           
            {/* <div className="flex flex-col items-center"> */}
            <motion.div
              variants={fadeFromBottom}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="flex flex-col items-center"
            >
              <Image
                src={Destinations}
                alt="Destinations"
                width={50}
                height={50}
              />
              <h4 className="text-white text-2xl font-bold mt-4">300 K+</h4>
              <p className="text-white mt-2 font-semibold">Destinations</p>
              </motion.div>
            
             <motion.div
              variants={fadeFromBottom}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="flex flex-col items-center"
            >
            {/* <div className="flex flex-col items-center"> */}
              <Image src={Countries} alt="Countries" width={50} height={50} />
              <h4 className="text-white text-2xl font-bold mt-4">85+</h4>
              <p className="text-white mt-2 font-semibold">Countries</p>
              </motion.div>
            {/* </div> */}
          </div>
        </div>
      </section>
      <MissionVisionSection />
      <OurServices />
    </>
  );
};

export default AboutSection;
