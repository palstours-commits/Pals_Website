"use client";

import navbarLogo from "@/app/assets/navbar_logo.svg";
import { HeaderSkeleton } from "@/app/common/animations";
import SearchBar from "@/app/common/search/SearchBar";
import { getMenus } from "@/app/store/slice/submenuSlice";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DesktopHeaderActions from "./DesktopHeaderActions";
import DesktopHeaderNavigation from "./DesktopHeaderNavigation";
import MobileHeaderNavigation from "./MobileHeaderNavigation";
import { headerItemVariants } from "./headerConfig";

const Header = () => {
  const dispatch = useDispatch();
  const { submenus, loading, loaded } = useSelector((state) => state.submenu);
  const menus = submenus
    ? [...submenus].sort((a, b) => a.order - b.order)
    : [];

  useEffect(() => {
    if (!loaded) dispatch(getMenus());
  }, [dispatch, loaded]);

  if (loading && !menus.length) {
    return <HeaderSkeleton />;
  }

  return (
    <>
      <motion.div
        variants={headerItemVariants}
        initial="hidden"
        animate="visible"
        className="hidden w-full bg-[#da251c] py-2 text-center text-xs font-light text-white lg:block"
      >
        <span className="inline-flex items-center gap-2">
          <Sparkles size={14} />
          Black Friday Last-Minute Specials: Save up to $1,000 by 11/23 on trips
          departing this winter or spring.
          <Sparkles size={14} />
        </span>
      </motion.div>

      <div className="w-full overflow-hidden bg-[#da251c] py-2 text-white lg:hidden">
        <motion.div
          className="flex w-max whitespace-nowrap"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          <span className="inline-flex items-center gap-2 px-4 text-xs font-light">
            <Sparkles size={14} className="shrink-0" />
            Black Friday Last-Minute Specials: Save up to $1,000 by 11/23 on
            trips departing this winter or spring.
            <Sparkles size={14} className="shrink-0" />
          </span>
        </motion.div>
      </div>

      <header className="sticky top-0 z-[9999] border-b border-gray-200 bg-white shadow-lg">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.2 },
            },
          }}
          initial="hidden"
          animate="visible"
          className="relative mx-auto flex h-20 max-w-full items-center px-2 sm:px-3"
        >
          <motion.div
            variants={headerItemVariants}
            className="relative top-2 z-10 shrink-0"
          >
            <Link href="/" aria-label="Pals Holidays home">
              <div className="mt-12 h-[138px] w-[100px] overflow-hidden md:mt-10">
                <Image
                  src={navbarLogo}
                  alt="Pals Holidays"
                  className="h-full w-auto object-cover"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          <DesktopHeaderNavigation menus={menus} />
          <DesktopHeaderActions />

          <div className="ml-auto flex min-w-0 items-center gap-1 xl:ml-3">
            <div className="relative z-20 w-11 shrink-0">
              <SearchBar className="max-w-none" />
            </div>
            <MobileHeaderNavigation menus={menus} />
          </div>
        </motion.div>
      </header>
    </>
  );
};

export default Header;
