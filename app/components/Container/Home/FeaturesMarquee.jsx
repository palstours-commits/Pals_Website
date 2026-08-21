"use client";

import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";

import features1 from "@/app/assets/features1.png";
import features2 from "@/app/assets/features2.png";
import features3 from "@/app/assets/features3.png";
import features4 from "@/app/assets/features4.png";
import features5 from "@/app/assets/features5.png";

const features = [
  {
    text: "Travel Operators",
    image: features1,
  },
  {
    text: "Government Recognised",
    image: features2,
  },
  {
    text: "Explore India",
    image: features3,
  },
  {
    text: "Discover Tamil Nadu",
    image: features4,
  },
  {
    text: "Experience Kerala",
    image: features5,
  },
];

const FeaturesMarquee = () => {
  const marqueeItems = [...features, ...features];

  return (
    <MainLayout className="bg-[#FFEDED] overflow-hidden py-3">
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
            className="mx-10 flex items-center gap-2 text-lg font-semibold text-black"
          >
            <img
              src={item.image.src}
              alt={item.text}
              className="h-16 w-16 object-contain"
            />

            <span>{item.text}</span>
          </div>
        ))}
      </motion.div>
    </MainLayout>
  );
};

export default FeaturesMarquee;