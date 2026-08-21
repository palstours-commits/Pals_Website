"use client";

import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";

import features1 from "@/app/assets/features1.png";
import features2 from "@/app/assets/features2.png";
import features3 from "@/app/assets/features3.png";

const features = [
  {
    text: "Your Trusted Travel Partner",
    image: features1,
  },
  {
    text: "Government Recognised by the Ministry of Tourism",
    image: features2,
  },
  {
    text: "Creating Exceptional Travel Experiences Across India",
    image: features3,
  },
];

const FeaturesMarquee = () => {
  const marqueeItems = [...features, ...features];

  return (
    <MainLayout className="bg-[#9adbe8] overflow-hidden py-3">
      <motion.div
        className="flex w-max items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
        }}
      >
        {marqueeItems.map((item, i) => (
          <div
            key={i}
            className="mx-10 flex items-center gap-1 text-sm font-semibold text-black"
          >
            <img
              src={item.image.src}
              alt={item.text}
              className="h-8 w-8 object-contain"
            />

            <span>{item.text}</span>
          </div>
        ))}
      </motion.div>
    </MainLayout>
  );
};

export default FeaturesMarquee;