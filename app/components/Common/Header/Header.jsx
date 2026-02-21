"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  ChevronRight,
  Mail,
  ChevronUp,
} from "lucide-react";
import navbar_logo from "@/app/assets/navbar_logo.svg";
import navItemIcon from "@/app/assets/serive_home-icon-2.svg";
import navActiveIcon from "@/app/assets/serive_home-icon-1.svg";
import companyIcon from "@/app/assets/office-building.svg";
import { useDispatch, useSelector } from "react-redux";
import { getSubMenus } from "@/app/store/slice/submenuSlice";
import CustomImage from "@/app/common/Image";

export default function Header() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const { submenus } = useSelector((state) => state.submenu);

  useEffect(() => {
    dispatch(getSubMenus());
  }, [dispatch]);

  const STATIC_SERVICES = [
    { name: "Flight", slug: "flight" },
    { name: "Hotel", slug: "hotel" },
    { name: "Transport", slug: "transport" },
    { name: "Money Exchange", slug: "money-exchange" },
    { name: "Visa", slug: "visa" },
  ];

  const COMPANY_MENU = [
    { name: "About Us", slug: "about-us" },
    { name: "Blog", slug: "blog" },
    { name: "Career", slug: "career" },
    { name: "Contact Us", slug: "contact-us" },
  ];

  return (
    <>
      <div className="w-full bg-black text-white text-xs font-light text-center py-2 hidden md:block">
        Black Friday Last-Minute Specials: Save up to $1,000 by 11/23 on trips
        departing this winter or spring. →
      </div>
      <header className="sticky top-0 z-9999 bg-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-3 z-10 md:relative top-2"
          >
            <Image
              src={navbar_logo}
              alt="Pals Holidays"
              className="h-10 md:h-20 w-auto"
              priority
            />
          </Link>
          <nav className="hidden lg:flex ml-8  max-w-[600px]  2xl:max-w-[520px] ">
            <div className="flex items-center  min-w-max">
              {submenus?.map((menu, index) => {
                const isActive = active === index;
                const hasSubmenu = menu?.submenus?.length > 0;
                return (
                  <div
                    key={menu._id}
                    className="relative shrink-0"
                    onMouseEnter={() => hasSubmenu && setActive(index)}
                    onMouseLeave={() => hasSubmenu && setActive(null)}
                  >
                    {hasSubmenu ? (
                      <button
                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition
            ${
              isActive
                ? "border border-red-500 text-red-500 bg-[#FFDCDA]"
                : "text-gray-700 hover:text-red-500"
            }`}
                      >
                        <CustomImage
                          src={menu?.icon}
                          alt="icon"
                          className="w-5 h-5 object-contain"
                        />
                        {menu.name}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${isActive ? "rotate-180" : ""}`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={`/${menu.slug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-red-500"
                      >
                        <CustomImage
                          src={menu?.icon}
                          alt="icon"
                          className="w-5 h-5 object-contain"
                        />
                        {menu.name}
                      </Link>
                    )}
                    {hasSubmenu && isActive && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                        {menu.submenus.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/${menu.slug}/${sub.slug}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div
                className="relative shrink-0"
                onMouseEnter={() => setActive("services")}
                onMouseLeave={() => setActive(null)}
              >
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition
      ${
        active === "services"
          ? "border border-red-500 text-red-500 bg-[#FFDCDA]"
          : "text-gray-700 hover:text-red-500"
      }
    `}
                >
                  <Image
                    src={active === "services" ? navItemIcon : navItemIcon}
                    alt="icon"
                    className="w-5 h-5 object-contain"
                  />
                  Services
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      active === "services" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {active === "services" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-50 bg-white shadow-lg rounded-lg py-2 z-50">
                    {STATIC_SERVICES.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/service/${item.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div
                className="relative shrink-0"
                onMouseEnter={() => setActive("company")}
                onMouseLeave={() => setActive(null)}
              >
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition
      ${
        active === "company"
          ? "border border-red-500 text-red-500 bg-[#FFDCDA]"
          : "text-gray-700 hover:text-red-500"
      }`}
                >
                  <Image
                    src={active === "company" ? companyIcon : companyIcon}
                    alt="icon"
                    className="w-5 h-5 object-contain"
                  />
                  Company
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      active === "company" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {active === "company" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-50 bg-white shadow-lg rounded-lg py-2 z-50">
                    {COMPANY_MENU?.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            <div className="hidden 2xl:flex items-center gap-2 text-sm text-gray-700">
              <Phone size={16} />
              <a href="tel:+919841255715" className="hover:text-red-600">
                +91-98412-55715
              </a>
              <span>/</span>
              <Mail size={16} />
              <a
                href="mailto:mail@palsholidays.com"
                className="hover:text-red-600"
              >
                mail@palsholidays.com
              </a>
            </div>
            <div className="flex 2xl:hidden items-center gap-3 text-gray-700">
              <a
                href="tel:+919841255715"
                aria-label="Call PALS Holidays"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-red-600 hover:text-red-600 transition"
              >
                <Phone size={16} />
              </a>

              <a
                href="mailto:mail@palsholidays.com"
                aria-label="Email PALS Holidays"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-red-600 hover:text-red-600 transition"
              >
                <Mail size={16} />
              </a>
            </div>
            <Link
              href={"/contact-us"}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-xs font-semibold transition flex items-center gap-2"
            >
              <span className="w-4 h-4 rounded-md border border-white flex items-center justify-center ">
                <ChevronUp size={15} />
              </span>
              Plan My Tour
            </Link>
          </div>
          <button className="lg:hidden ml-auto" onClick={() => setOpen(true)}>
            <Menu size={26} />
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              <motion.aside
                className="fixed top-0 right-0 h-full w-full bg-white p-6"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
              >
                <div className="flex items-center justify-end mb-8">
                  <X
                    size={24}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <nav className="flex flex-col gap-2">
                  {submenus?.map((menu, index) => {
                    const isActive = active === index;
                    const hasSubmenu = menu?.submenus?.length > 0;
                    return (
                      <div key={menu._id} className="flex flex-col gap-1">
                        <button
                          onClick={() =>
                            hasSubmenu && setActive(isActive ? null : index)
                          }
                          className={`flex items-center justify-between px-4 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition ${
                            isActive ? "bg-gray-100 text-red-500" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={isActive ? navActiveIcon : navItemIcon}
                              alt="icon"
                              className="w-5 h-5 object-contain"
                            />
                            {menu.name}
                          </div>
                          {hasSubmenu && (
                            <ChevronRight
                              size={16}
                              className={`transition-transform ${isActive ? "rotate-180" : ""}`}
                            />
                          )}
                        </button>
                        {hasSubmenu && isActive && (
                          <div className="flex flex-col ml-6 mt-1 gap-1">
                            {menu.submenus.map((sub) => (
                              <Link
                                key={sub._id}
                                href={`/${menu.slug}/${sub.slug}`}
                                onClick={() => setOpen(false)}
                                className="text-sm text-gray-700 py-1 px-2 rounded-md hover:bg-gray-100 transition"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() =>
                        setActive(active === "services" ? null : "services")
                      }
                      className={`flex items-center justify-between px-4 py-2 rounded-md font-medium transition
      ${
        active === "services"
          ? "bg-gray-100 text-red-500"
          : "text-gray-700 hover:bg-gray-100"
      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={
                            active === "services" ? navItemIcon : navItemIcon
                          }
                          alt="Services icon"
                          className="w-5 h-5 object-contain"
                        />
                        <span>Services</span>
                      </div>

                      <ChevronRight
                        size={16}
                        className={`transition-transform ${
                          active === "services" ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {active === "services" && (
                      <div className="flex flex-col ml-10 mt-1 gap-1">
                        {STATIC_SERVICES.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/service/${item.slug}`}
                            onClick={() => setOpen(false)}
                            className="text-sm text-gray-700 py-1 px-2 rounded-md hover:bg-gray-100 transition"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() =>
                        setActive(active === "company" ? null : "company")
                      }
                      className={`flex items-center justify-between px-4 py-2 rounded-md font-medium transition
      ${
        active === "company"
          ? "bg-gray-100 text-red-500"
          : "text-gray-700 hover:bg-gray-100"
      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={active === "company" ? companyIcon : companyIcon}
                          alt="Company icon"
                          className="w-5 h-5 object-contain"
                        />
                        <span>Company</span>
                      </div>

                      <ChevronRight
                        size={16}
                        className={`transition-transform ${
                          active === "company" ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {active === "company" && (
                      <div className="flex flex-col ml-10 mt-1 gap-1">
                        {COMPANY_MENU.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/${item.slug}`}
                            onClick={() => setOpen(false)}
                            className="text-sm text-gray-700 py-1 px-2 rounded-md hover:bg-gray-100 transition"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </nav>
                <button className="mt-10 text-sm bg-red-600 text-white py-3 w-32 rounded-full font-semibold">
                  Plan My Tour
                </button>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
