import PackageDetails from "@/app/components/Container/PackageDetails/PackageDetails";
import React from "react";

async function page({ params }) {
  const { slug } = await params;

  return <PackageDetails slug={slug} />;
}

export default page;
