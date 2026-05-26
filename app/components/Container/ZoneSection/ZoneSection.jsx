"use client";
import CommonHeroSection from "@/app/common/CommonHeroSection";
import {
  getIdBySubmenu,
  getSlugBySubmenu,
} from "@/app/store/slice/submenuSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HolidayPlanner from "../Home/HolidayPlanner";

const ZoneSection = ({ menu, submenu }) => {
  const dispatch = useDispatch();
  const { selectedData } = useSelector((state) => state.submenu);

  useEffect(() => {
    if (submenu) {
      dispatch(getIdBySubmenu(submenu));
      dispatch(getSlugBySubmenu(menu)); // fetch zones using menu slug
    }
  }, [submenu, menu, dispatch]);

  return (
    <>
      <CommonHeroSection
        title={
          <>
            Experience the Timeless Beauty
            <br />
            {submenu}
          </>
        }
        backgroundImage={selectedData?.bannerImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: submenu },
        ]}
      />

      {/* pass menu slug */}
      <HolidayPlanner menuSlug={menu} activeSlugFromRoute={submenu} />
    </>
  );
};

export default ZoneSection;