import Image from "next/image";
import tripadvisor from "@/app/assets/tripadvisor.svg";
import google from "@/app/assets/google.svg";
import { socialLinks } from "@/app/utils/siteConstants";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getPackages } from "@/app/store/slice/packageSlice";
import { useEffect } from "react";

export default function Footer() {
  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.packages);

  useEffect(() => {
    dispatch(getPackages());
  }, [dispatch]);

  return (
    <footer className="bg-black text-white pt-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div>
            <h4 className="font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link href="/about-us" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Career
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Package</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {packages?.slice(0, 5).map((item) => (
                <li key={item._id}>
                  <Link
                    href={`/package/${item.slug || item._id}`}
                    className="hover:text-white transition"
                  >
                    {item.packageName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link
                  href="/service/flight"
                  className="hover:text-white transition"
                >
                  Flights
                </Link>
              </li>
              <li>
                <Link
                  href="/service/hotel"
                  className="hover:text-white transition"
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  href="/service/transport"
                  className="hover:text-white transition"
                >
                  Transportation Services
                </Link>
              </li>
              <li>
                <Link
                  href="/service/visa"
                  className="hover:text-white transition"
                >
                  Visa
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Contact Us</h4>
            <div className="text-sm text-gray-300 space-y-4">
              <p>
                Call / Whatsapp <br />
                <a
                  href="tel:+919841255715"
                  className="hover:text-white transition"
                >
                  +91 98412 55715
                </a>
                <br />
                <a
                  href="tel:+919003012226"
                  className="hover:text-white transition"
                >
                  +91 90030 12226
                </a>
              </p>

              <p>
                Mail us at <br />
                <a
                  href="mailto:mail@palsholidays.com"
                  className="hover:text-white transition"
                >
                  mail@palsholidays.com
                </a>
                <br />
                <a
                  href="mailto:palstours@gmail.com"
                  className="hover:text-white transition"
                >
                  palstours@gmail.com
                </a>
              </p>

              <p>
                Our Websites <br />
                <a
                  href="https://palsholidays.com"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  Palsholidays.com
                </a>
                <br />
                <a
                  href="https://tour2india.com"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  Tour2india.com
                </a>
                <br />
                <a
                  href="https://trip2southindia.com"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  Trip2southindia.com
                </a>
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Review Us</h4>
            <div className="space-y-4">
              <a
                href="https://en.tripadvisor.com.hk/UserReviewEdit-g304556-d26612261-PALS_HOLIDAYS_Tour_Operators-Chennai_Madras_Chennai_District_Tamil_Nadu.html"
                target="_blank"
                className="bg-white rounded-full w-[161px] h-[50px] flex items-center justify-center hover:scale-105 transition"
              >
                <Image
                  src={tripadvisor}
                  alt="Tripadvisor"
                  className="h-[30px] w-auto"
                />
              </a>

              <a
                href="https://www.google.com/maps/place//data=!4m3!3m2!1s0x824d29be61867bdb:0x2f78c920f9dd537c!12e1?source=g.page.m.ia._&laa=nmx-review-solicitation-ia2"
                target="_blank"
                className="bg-white rounded-full w-[161px] h-[50px] flex items-center justify-center hover:scale-105 transition"
              >
                <Image
                  src={google}
                  alt="Google Reviews"
                  className="h-[30px] w-auto"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} PALS HOLIDAYS. All rights reserved |
            Designed by Webdads2u PVT LTD.
          </p>
          <div className="flex gap-3">
            {socialLinks?.map(({ href, Icon }, i) => (
              <Link
                key={i}
                href={href}
                target="_blank"
                className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#da251c] transition"
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
