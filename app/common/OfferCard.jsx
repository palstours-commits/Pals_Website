"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Offericon2 from "@/app/assets/offer_icon2.svg";
import Offericon1 from "@/app/assets/offer_icon1.svg";
import { usePathname, useRouter } from "next/navigation";

const OfferCard = ({ item, isColor = true }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isOffersPage = pathname === "/offers";

  return (
    <div
      onClick={() => {
        if (!isOffersPage) {
          router.push("/offers");
        }
      }}
      className={`relative border-2 border-dashed rounded-xl p-8 min-h-[220px] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-lg
      ${isColor ? "bg-[#BEEAF6] border-[#28B6E8]" : "border-gray-300"}`}
    >
      <div className="absolute top-0 right-0 w-16 h-16">
        <Image
          src={item?.offerType === "package" ? Offericon1 : Offericon2}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <span className="bg-[#2CB3DB] text-white text-xs px-4 py-1 rounded-full w-fit mb-3">
        {item?.offerCategory}
      </span>

      <h5 className="font-bold text-lg mb-2">
        {item?.offerName}
      </h5>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {item?.description}
      </p>

      <Link
        href="/contact-us"
        onClick={(e) => e.stopPropagation()}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-5 py-2 rounded-full w-fit"
      >
        Explore Deals
      </Link>
    </div>
  );
};

export default OfferCard;