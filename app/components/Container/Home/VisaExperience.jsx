"use client";

import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";

import background from "@/app/assets/VisaExperience.svg";
import feature1 from "@/app/assets/features-1.png";
import feature2 from "@/app/assets/features-2.png";
import feature3 from "@/app/assets/features-3.png";
import feature4 from "@/app/assets/features-4.png";

const FEATURES = [feature1, feature2, feature3, feature4];

const textVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const VisaExperience = () => {
  return (
    <MainLayout className="bg-gradient-to-b from-[#FFFBF4] to-[#FFE9D9] pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-5">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-start mb-10 lg:mb-14"
        >
          <motion.h4
            variants={textVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-1"
          >
            More Than Travel, We Create Experiences
          </motion.h4>

          <motion.p
            variants={textVariants}
            className="text-xl text-gray-700"
          >
            Travel with confidence. Explore with us.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src={background.src}
            alt="Travel Experience"
            className="w-full h-auto rounded-2xl object-cover"
          />

          <div className="absolute left-0 right-0 bottom-[10px] px-2 sm:px-4 md:px-6 lg:px-10 overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex items-end gap-2 sm:gap-3 lg:gap-3">
              {FEATURES.map((image, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={textVariants}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                  }}
                  whileHover={{
                    y: -3,
                    scale: 1.02,
                  }}
                  className={`cursor-pointer flex-shrink-0 ${i === FEATURES.length - 1
                      ? 'w-20 sm:w-28 md:w-36 lg:w-auto lg:flex-1'
                      : 'w-28 sm:w-36 md:w-44 lg:w-auto lg:flex-1'
                    }`}
                >
                  <img
                    src={image.src}
                    alt={`Travel feature ${i + 1}`}
                    className="w-full h-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        <div className="h-16 md:h-20 lg:h-24" />
      </div>
    </MainLayout>
  );
};

export default VisaExperience;