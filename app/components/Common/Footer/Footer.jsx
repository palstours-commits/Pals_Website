import google from "@/app/assets/google.svg";
import { default as tripadvisor } from "@/app/assets/tripadvisor.svg";
import whitelogo from "@/app/assets/whitelogo.png";
import { getPackages } from "@/app/store/slice/packageSlice";
import { socialLinks } from "@/app/utils/siteConstants";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Footer() {
  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.packages);

  useEffect(() => {
    dispatch(getPackages());
  }, [dispatch]);

  return (
    <footer className="bg-black text-white pt-12 md:pt-20 pb-8 md:pb-6">
      <div className="px-4 md:px-1 max-w-7xl mx-auto">
        
        {/* Smart Responsive Grid: 2 cols on mobile, 5 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10 md:gap-10">
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold text-base md:text-lg mb-4 md:mb-6">Quick Links</h4>
            <ul className="space-y-2.5 md:space-y-3 text-sm text-gray-300">
              <li>
                <Link href="/about-us" className="hover:text-white transition block py-1 md:py-0">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition block py-1 md:py-0">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-white transition block py-1 md:py-0">
                  Career
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition block py-1 md:py-0">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Package */}
          <div className="col-span-1">
            <h4 className="font-semibold text-base md:text-lg mb-4 md:mb-6">Package</h4>
            <ul className="space-y-2.5 md:space-y-3 text-sm text-gray-300">
              {packages?.slice(0, 5).map((item) => (
                <li key={item._id}>
                  <Link
                    href={`/package/${item.slug || item._id}`}
                    className="hover:text-white transition block py-1 md:py-0 line-clamp-2"
                  >
                    {item.packageName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Full width on mobile, 1 col on desktop */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h4 className="font-semibold text-base md:text-lg mb-4 md:mb-6">Services</h4>
            <ul className="space-y-2.5 md:space-y-3 text-sm text-gray-300">
              <li>
                <Link href="/service/flight" className="hover:text-white transition block py-1 md:py-0">
                  Flights
                </Link>
              </li>
              <li>
                <Link href="/service/hotel" className="hover:text-white transition block py-1 md:py-0">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/service/transport" className="hover:text-white transition block py-1 md:py-0">
                  Transportation Services
                </Link>
              </li>
              <li>
                <Link href="/service/visa" className="hover:text-white transition block py-1 md:py-0">
                  Visa
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us - Full width on mobile, 1 col on desktop */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h4 className="font-semibold text-base md:text-lg mb-4 md:mb-6">Contact Us</h4>
            <div className="text-sm text-gray-300 space-y-5 md:space-y-4">
              <p>
                <span className="block text-gray-400 mb-1 font-medium">Call / Whatsapp</span>
                <a href="tel:+919841255715" className="block text-white hover:text-red-500 transition py-0.5">
                  +91 98412 55715
                </a>
                <a href="tel:+919003012226" className="block text-white hover:text-red-500 transition py-0.5">
                  +91 90030 12226
                </a>
              </p>

              <p>
                <span className="block text-gray-400 mb-1 font-medium">Mail us at</span>
                <a href="mailto:mail@palsholidays.com" className="block text-white hover:text-red-500 transition py-0.5 break-all">
                  mail@palsholidays.com
                </a>
                <a href="mailto:palstours@gmail.com" className="block text-white hover:text-red-500 transition py-0.5 break-all">
                  palstours@gmail.com
                </a>
              </p>

              <p>
                <span className="block text-gray-400 mb-1 font-medium">Our Websites</span>
                <a href="https://palsholidays.com" target="_blank" className="block text-white hover:text-red-500 transition py-0.5">
                  Palsholidays.com
                </a>
                <a href="https://tour2india.com" target="_blank" className="block text-white hover:text-red-500 transition py-0.5">
                  Tour2india.com
                </a>
                <a href="https://trip2southindia.com" target="_blank" className="block text-white hover:text-red-500 transition py-0.5">
                  Trip2southindia.com
                </a>
              </p>
            </div>
          </div>

          {/* Review Us - Full width on mobile, 1 col on desktop */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-base md:text-lg mb-4 md:mb-6">Review Us</h4>
            <div className="flex flex-row sm:flex-col lg:flex-col gap-4 flex-wrap">
              <a
                href="https://en.tripadvisor.com.hk/UserReviewEdit-g304556-d26612261-PALS_HOLIDAYS_Tour_Operators-Chennai_Madras_Chennai_District_Tamil_Nadu.html"
                target="_blank"
                className="bg-white rounded-full w-[150px] md:w-[161px] h-[45px] md:h-[50px] flex items-center justify-center hover:scale-105 transition shadow-lg"
              >
                <Image
                  src={tripadvisor}
                  alt="Tripadvisor"
                  className="h-[25px] md:h-[30px] w-auto"
                />
              </a>

              <a
                href="https://www.google.com/maps/place//data=!4m3!3m2!1s0x824d29be61867bdb:0x2f78c920f9dd537c!12e1?source=g.page.m.ia._&laa=nmx-review-solicitation-ia2"
                target="_blank"
                className="bg-white rounded-full w-[150px] md:w-[161px] h-[45px] md:h-[50px] flex items-center justify-center hover:scale-105 transition shadow-lg"
              >
                <Image
                  src={google}
                  alt="Google Reviews"
                  className="h-[25px] md:h-[30px] w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Reverses flex direction on mobile to put icons on top */}
        <div className="border-t border-gray-800 mt-12 md:mt-16 pt-6 flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-4">
          <p className="text-xs text-gray-400 text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} PALS HOLIDAYS. All rights reserved <span className="hidden md:inline">|</span><br className="md:hidden" />
            <span className="mt-2 md:mt-0 inline-flex items-center justify-center md:justify-start">
              Developed by <Image src={whitelogo} alt="@" className="inline h-3.5 md:h-4 w-auto mx-1.5" />
            </span>
          </p>
          
          <div className="flex gap-4 md:gap-3">
            {socialLinks?.map(({ href, Icon }, i) => (
              <Link
                key={i}
                href={href}
                target="_blank"
                className="w-10 h-10 md:w-9 md:h-9 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#da251c] transition"
              >
                <Icon size={18} className="md:w-4 md:h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}