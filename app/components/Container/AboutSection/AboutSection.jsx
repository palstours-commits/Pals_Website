"use client";
import React from "react";
import Image from "next/image";
import OurServices from "../Home/OurServices";
import MissionVisionSection from "./MissionVisionSection";
import Travel from "@/app/assets/travel-img.svg";
import Destinations from "@/app/assets/destinations.svg";
import Countries from "@/app/assets/countries.svg";
import AboutPalsSection from "./AboutPalsSection";
import { motion } from "framer-motion";

const AboutSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <>
      <AboutPalsSection />
      <section className="w-full bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 text-center gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center"
            >
              <Image src={Travel} alt="Travel" width={50} height={50} />
              <h4 className="text-white text-2xl font-bold mt-4">10,000 +</h4>
              <p className="text-white mt-2 font-semibold">
                Travel Experiences
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
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
              variants={fadeInUp}
              className="flex flex-col items-center"
            >
              <Image src={Countries} alt="Countries" width={50} height={50} />
              <h4 className="text-white text-2xl font-bold mt-4">85+</h4>
              <p className="text-white mt-2 font-semibold">Countries</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <MissionVisionSection />
      <OurServices />
    </>
  );
};

export default AboutSection;