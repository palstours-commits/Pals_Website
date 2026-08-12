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
    <MainLayout className="bg-gradient-to-b from-[#FFFBF4] to-[#FFE9D9] pt-10 sm:pt-16">
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-start mb-8 sm:mb-10"
        >
          <motion.h3
            variants={textVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black mb-2"
          >
            More Than Travel, We Create Experiences
          </motion.h3>

          <motion.p
            variants={textVariants}
            className="text-sm sm:text-md mt-2"
          >
            Travel with confidence. Explore with us.
          </motion.p>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            relative
            w-full
            overflow-hidden
            rounded-2xl
          "
        >
          {/* Background */}
          <img
            src={background.src}
            alt="Travel Experience"
            className="
              block
              w-full
              h-[320px]
              sm:h-auto
              object-cover
              rounded-2xl
            "
          />

          {/* Feature Cards */}
          <div
            className="
              absolute
              left-0
              right-0
              bottom-[10px]
              px-2
              sm:px-4
              md:px-6
              lg:px-10
              overflow-x-auto
              overflow-y-hidden
              scrollbar-hide
            "
          >
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
                  className={`
                    cursor-pointer
                    flex-shrink-0
                    ${
                      i === FEATURES.length - 1
                        ? "w-[calc((100vw-28px)/2)] sm:w-28 md:w-36 lg:w-auto lg:flex-1"
                        : "w-[calc((100vw-28px)/2)] sm:w-36 md:w-44 lg:w-auto lg:flex-1"
                    }
                  `}
                >
                  <img
                    src={image.src}
                    alt={`Travel feature ${i + 1}`}
                    className="block w-full h-auto object-contain"
                  />
                </motion.div>
              ))}

            </div>
          </div>
        </motion.div>

        <div className="h-12 sm:h-16 md:h-20 lg:h-24" />

      </div>
    </MainLayout>
  );
};

export default VisaExperience;