"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import {
  getIdBySubmenu,
  getSlugBySubmenu,
} from "@/app/store/slice/submenuSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ZoneSection = ({ menu, submenu }) => {
  const dispatch = useDispatch();
  const { selectedData } = useSelector((state) => state.submenu);

  useEffect(() => {
    dispatch(getIdBySubmenu(submenu));
    dispatch(getSlugBySubmenu(submenu));
  }, [submenu]);

  console.log(selectedData?.bannerimg);
  
  return (
    <>
      <CommonHeroSection
        title={`Experience the Timeless Beauty of `}
        backgroundImage={selectedData?.bannerimg}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: menu, href: "/packages" },
          { label: "Destination" },
        ]}
      />
    </>
  );
};

export default ZoneSection;
