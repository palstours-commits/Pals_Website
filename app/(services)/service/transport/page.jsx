import TransportSection from "@/app/components/Container/TransportSection/TransportSection";
import React from "react";

export const metadata = {
  title: "Transport Services | Reliable Travel Transportation",
  description:
    "Explore reliable transport services for comfortable and convenient travel. Book transportation solutions for your trips with ease.",
  alternates: {
    canonical: "/service/transport",
  },
};

function page() {
  return <TransportSection />;
}

export default page;