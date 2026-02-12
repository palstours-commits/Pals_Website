import Image from "next/image";
import tripadvisor from "@/app/assets/tripadvisor.svg";
import google from "@/app/assets/google.svg";
import { socialLinks } from "@/app/utils/siteConstants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div>
            <h4 className="font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>About us</li>
              <li>Blog</li>
              <li>Career</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Package</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>India Holidays</li>
              <li>International Holidays</li>
              <li>Domestic Holidays</li>
              <li>Train Tours</li>
              <li>Hill Station</li>
              <li>Ayurveda & Yoga Retreats</li>
              <li>Spiritual Tours</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>Flights</li>
              <li>Hotels</li>
              <li>Transportation Services</li>
              <li>Visa</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Contact Us</h4>
            <div className="text-sm text-gray-300 space-y-4">
              <p>
                Call / Whatsapp
                <br />
                +91 98412 55715
                <br />
                +91 98412 55715
              </p>
              <p>
                Mail us at
                <br />
                mail@palsholidays.com
                <br />
                palstours@gmail.com
              </p>
              <p>
                Our Websites
                <br />
                Palsholidays.com
                <br />
                Tour2india.com
                <br />
                Trip2southindia.com
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Review Us</h4>
            <div className="space-y-4">
              <div className="bg-white rounded-full w-[161px] h-[50px] flex items-center justify-center">
                <Image
                  src={tripadvisor}
                  alt="Tripadvisor"
                  className="h-[30px] w-auto"
                />
              </div>
              <div className="bg-white rounded-full w-[161px] h-[50px] flex items-center justify-center">
                <Image
                  src={google}
                  alt="Google Reviews"
                  className="h-[30px] w-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © 2025 PALS HOLIDAYS All rights reserved | Designed by Webdads2u PVT
            LTD.
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
