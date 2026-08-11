"use client";
import { motion } from "framer-motion";
const features = [
  "Your Trusted Travel Partner",
  "Government Recognised by the Ministry of Tourism",
  "Exceptional Travel Experiences Across India",
];

const FeaturesMarquee = () => {
  return (
    <div className="bg-[#9adbe8] overflow-hidden py-3">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
        }}
      >
        {[...features, ...features].map((item, i) => (
          <div key={i} className="mx-10 text-sm font-semibold text-black">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturesMarquee;
