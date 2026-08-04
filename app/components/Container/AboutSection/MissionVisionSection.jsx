import Image from "next/image";
import missionImg from "@/app/assets/about-bg-1.svg";
import visionImg from "@/app/assets/about-bg-2.svg";
import MainLayout from "@/app/common/MainLayout";
import { motion } from "framer-motion";

const MissionVisionSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInUpImage = {
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
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <MainLayout className="bg-[#f3f3f3] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h4
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              Our Mission
            </motion.h4>

            <motion.p
              variants={fadeInUp}
              className="text-gray-600 leading-relaxed mb-6"
            >
              At Pals Holidays we consistently provide exceptional travel
              services to all clients, ensuring their continued confidence,
              loyalty, and lasting friendship. As a fully integrated travel
              company, we offer comprehensive solutions for both business and
              leisure travellers worldwide.
            </motion.p>

            <motion.div
              variants={fadeInUpImage}
              className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden"
            >
              <Image
                src={missionImg}
                alt="Mission"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Vision Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h4
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold mb-4 md:mt-30"
            >
              Our Vision
            </motion.h4>

            <motion.p
              variants={fadeInUp}
              className="text-gray-600 leading-relaxed mb-8"
            >
              Our team at Pals Holidays is committed to achieving the status
              of a world-class travel company and industry leader in the near
              future. We are dedicated to adopting a customer-centric approach
              to gain recognition among clients worldwide.
            </motion.p>

            <motion.div
              variants={fadeInUpImage}
              className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden"
            >
              <Image
                src={visionImg}
                alt="Vision"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MissionVisionSection;