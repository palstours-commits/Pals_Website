"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import {
  getIdBySubmenu,
  getSlugBySubmenu,
} from "@/app/store/slice/submenuSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HolidayPlanner from "../Home/HolidayPlanner";

const ZoneSection = ({ menu, submenu }) => {
  const dispatch = useDispatch();
  const { selectedData } = useSelector((state) => state.submenu);

  useEffect(() => {
    dispatch(getIdBySubmenu(submenu));
    dispatch(getSlugBySubmenu(submenu));
  }, [submenu]);

  return (
    <>
      <CommonHeroSection
        title={`Experience the Timeless Beauty of ${submenu}`}
        backgroundImage={selectedData?.bannerImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: menu, href: "/packages" },
          { label: submenu },
        ]}
      />
      <HolidayPlanner activeSlugFromRoute={submenu} />
    </>
  );
};

export default ZoneSection;
