"use client";
import google from "@/app/assets/google.svg";
import { default as tripadvisor } from "@/app/assets/tripadvisor.svg";
import whitelogo from "@/app/assets/whitelogo.png";
import { socialLinks } from "@/app/utils/siteConstants";
import Image from "next/image";
import Link from "next/link";
import navbar_logo from "@/app/assets/navbar_logo.svg";
import { useSelector } from "react-redux";
export default function Footer() {

  const { submenus } = useSelector((state) => state.submenu);
  const sortedSubmenus = submenus ? [...submenus].sort((a, b) => a.order - b.order) : [];


  return (
    <footer className="bg-[#7a3d3d] text-white pt-12 md:pt-16 pb-8">
      <div className="px-5  max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12 lg:gap-8">
          <div className="flex flex-col">
            <h4 className="font-semibold text-lg mb-5 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-red-500 transition-colors block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-red-500 transition-colors block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/career"
                  className="hover:text-red-500 transition-colors block"
                >
                  Career
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-red-500 transition-colors block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-red-500 transition-colors block"
                >
                  Gallery
                </Link>
              </li>
            </ul>
            <div className="mt-8 md:mt-auto pt-8">
              <Image
                src={navbar_logo}
                alt="Pals Holidays"
                width={80}
                height={80}
              />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-5 text-white">Packages</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {sortedSubmenus?.map((item) => (
                <li key={item._id}>
                  <Link
                    href={`/${item.slug}`}
                    className="hover:text-red-500 transition-colors block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-5 text-white">Services</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link
                  href="/service/hotel-booking"
                  className="hover:text-red-500 transition-colors block"
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  href="/service/flight-booking"
                  className="hover:text-red-500 transition-colors block"
                >
                  Flights
                </Link>
              </li>
              <li>
                <Link
                  href="/service/visa-booking"
                  className="hover:text-red-500 transition-colors block"
                >
                  Visa Services
                </Link>
              </li>
              <li>
                <Link
                  href="/service/money-exchange"
                  className="hover:text-red-500 transition-colors block"
                >
                  Money Exchange
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://royalmilesindia.webdadsprojects.com/"
                  className="hover:text-red-500 transition-colors block"
                >
                  Car Rental{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-5 text-white">
              Contact Us
            </h4>
            <div className="text-sm text-gray-300 space-y-6">
              <div>
                <span className="block text-gray-300 text-xs uppercase tracking-wider mb-1.5 font-semibold">
                  Call / Whatsapp
                </span>
                <a
                  href="tel:+919841255715"
                  className="block hover:text-red-500 transition-colors py-0.5"
                >
                  +91 98412 55715
                </a>
                <a
                  href="tel:+919003012226"
                  className="block hover:text-red-500 transition-colors py-0.5"
                >
                  +91 90030 12226
                </a>
              </div>
              <div>
                <span className="block text-gray-300 text-xs uppercase tracking-wider mb-1.5 font-semibold">
                  Mail us at
                </span>
                <a
                  href="mailto:mail@palsholidays.com"
                  className="block hover:text-red-500 transition-colors py-0.5 break-words"
                >
                  mail@palsholidays.com
                </a>
                <a
                  href="mailto:palstours@gmail.com"
                  className="block hover:text-red-500 transition-colors py-0.5 break-words"
                >
                  palstours@gmail.com
                </a>
              </div>
              <div>
                <span className="block text-gray-300 text-xs uppercase tracking-wider mb-1.5 font-semibold">
                  Our Websites
                </span>
                <a
                  href="https://palsholidays.com"
                  target="_blank"
                  className="block hover:text-red-500 transition-colors py-0.5"
                >
                  Palsholidays.com
                </a>
                <a
                  href="https://tour2india.com"
                  target="_blank"
                  className="block hover:text-red-500 transition-colors py-0.5"
                >
                  Tour2india.com
                </a>
                <a
                  href="https://trip2southindia.com"
                  target="_blank"
                  className="block hover:text-red-500 transition-colors py-0.5"
                >
                  Trip2southindia.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-5 text-white">Review Us</h4>
            <div className="flex flex-row sm:flex-col gap-4">
              <a
                href="https://en.tripadvisor.com.hk/UserReviewEdit-g304556-d26612261-PALS_HOLIDAYS_Tour_Operators-Chennai_Madras_Chennai_District_Tamil_Nadu.html"
                target="_blank"
                className="bg-white rounded-full w-[140px] h-[45px] flex items-center justify-center hover:scale-105 transition-transform shadow-lg shrink-0"
              >
                <Image
                  src={tripadvisor}
                  alt="Tripadvisor"
                  className="h-[24px] w-auto"
                />
              </a>
              <a
                href="https://www.google.com/maps/place//data=!4m3!3m2!1s0x824d29be61867bdb:0x2f78c920f9dd537c!12e1?source=g.page.m.ia._&laa=nmx-review-solicitation-ia2"
                target="_blank"
                className="bg-white rounded-full w-[140px] h-[45px] flex items-center justify-center hover:scale-105 transition-transform shadow-lg shrink-0"
              >
                <Image
                  src={google}
                  alt="Google Reviews"
                  className="h-[24px] w-auto"
                />
              </a>
            </div>
          </div>


        </div>

        <div className="border-t border-gray-500 mt-12 md:mt-16 pt-6 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-300 text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} PALS HOLIDAYS. All rights reserved
            <span className="hidden md:inline px-2">|</span>
            <br className="md:hidden" />
            <Link
              href="https://www.webdads2u.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <span className="mt-3 md:mt-0 inline-flex items-center justify-center md:justify-start">
                Developed by

                <Image
                  src={whitelogo}
                  alt="WebDads2U Logo"
                  className="h-3.5 md:h-4 w-auto mx-2 opacity-80 hover:opacity-100 transition-opacity"
                />
              </span>
            </Link>
          </p>

          <div className="flex gap-4">
            {socialLinks?.map(({ href, Icon }, i) => (
              <Link
                key={i}
                href={href}
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-[#da251c] hover:text-white hover:border-transparent transition-all duration-300"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
