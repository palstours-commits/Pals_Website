"use client";
import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";
import { BadgeDollarSign, Headphones, Sparkles, UserCheck } from "lucide-react";

const FEATURES = [
  {
    title: "Your Trusted Travel Partner",
    desc: "Trusted Since 2005 – Recognised by the Ministry of Tourism, Government of India. Discover the world with a partner you can trust.",
    Icon: UserCheck,
  },
  {
    title: "Customer Focus",
    desc: "Shaping unforgettable travel experiences centred entirely around your comfort and satisfaction.",
    Icon: BadgeDollarSign,
  },
  {
    title: "Customized Holidays",
    desc: "Tailor-made itineraries designed to perfectly match your unique travel style and preferences.",
    Icon: Sparkles,
  },
  {
    title: "24/7 Support Partner",
    desc: "Round-the-clock assistance, just a call away, wherever you are.",
    Icon: Headphones,
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const VisaExperience = () => {
  return (
    <MainLayout className="bg-gradient-to-br from-[#FA812F] to-[#FF6B35] py-16 lg:py-10">
      <div className=" max-w-7xl mx-auto px-5 ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.h3
            variants={textVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent mb-3"
          >
            More Than Travel, We Create Experiences
          </motion.h3>
          <motion.p
            variants={textVariants}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Travel with confidence. Explore with us.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {FEATURES?.map((item, i) => (
            <motion.div
              key={i}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.Icon size={28} className="text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2 leading-tight">
                {item.title}
              </h4>
              <p className="text-white/90 text-base leading-tight">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default VisaExperience;
