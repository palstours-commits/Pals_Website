"use client";
import { UserCheck, BadgeDollarSign, Sparkles, Headphones } from "lucide-react";

const FEATURES = [
  {
    title: "Expert Guidance",
    desc: "Our visa team knows exactly what documents you need and helps you avoid mistakes that cause delays.",
    Icon: UserCheck,
  },
  {
    title: "Best Price Guarantee",
    desc: "Competitive pricing, no hidden charges. Get full value for your money with every application.",
    Icon: BadgeDollarSign,
  },
  {
    title: "Curated Experiences",
    desc: "We recommend the right visa options based on your purpose tourism, business, or transit so you never overpay.",
    Icon: Sparkles,
  },
  {
    title: "24/7 Support",
    desc: "Got questions at midnight? No problem. Our support team is always available to help you.",
    Icon: Headphones,
  },
];

const VisaExperience = () => {
  return (
    <section className="bg-[#FA812F]  text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl md:text-4xl font-bold leading-tight max-w-3xl">
          Experience Hassle-free, Unforgettable Visa Journey With Expert
          Guidance
        </h3>
        <p className="mt-4 text-sm opacity-90 max-w-xl">
          We handle every detail of your visa process, ensuring a smooth and
          stress-free start to your journey.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-12 mt-16">
          {FEATURES?.map((item, i) => (
            <div key={i}>
              <item.Icon size={28} className="mb-4" />
              <h4 className="font-semibold mb-2">{item?.title}</h4>
              <p className="text-xs opacity-90 leading-relaxed">{item?.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaExperience;
