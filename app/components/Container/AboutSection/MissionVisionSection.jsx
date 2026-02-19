import Image from "next/image";
import missionImg from "@/app/assets/about-bg-1.svg";
import visionImg from "@/app/assets/about-bg-2.svg";
import MainLayout from "@/app/common/MainLayout";
import {motion} from "framer-motion";
import {fadeFromBottom, fadeFromTop } from "@/app/common/animations";

const MissionVisionSection = () => {
  return (
    <>
      <MainLayout className="bg-[#f3f3f3] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <motion.h4 
                variants={fadeFromTop}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="text-2xl md:text-3xl font-bold mb-4">
                Our Mission
              </motion.h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Pals Holidays we consistently provide exceptional travel
                services to all clients, ensuring their continued confidence,
                loyalty, and lasting friendship. As a fully integrated travel
                company, we offer comprehensive solutions for both business and
                leisure travellers worldwide.
              </p>
              <motion.div 
                variants={fadeFromBottom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden">
                <Image
                  src={missionImg}
                  alt="Mission"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
            <div>
              <motion.h4 
                variants={fadeFromTop}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="text-2xl md:text-3xl font-bold mb-4 md:mt-30">
                Our Vision
              </motion.h4>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our team at Pals Holidays is committed to achieving the status
                of a world-class travel company and industry leader in the near
                future. We are dedicated to adopting a customer-centric approach
                to gain recognition among clients worldwide.
              </p>
              <motion.div 
                variants={fadeFromBottom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden">
                <Image
                  src={visionImg}
                  alt="Vision"
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

export default MissionVisionSection;
