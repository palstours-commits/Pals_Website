import TravelDetails from "@/app/components/Container/TravelDetails/TravelDetails";
import React from "react";

async function page({ params }) {
  const { slug } = await params;

  return <TravelDetails slug={slug} />;
}

export default page;
