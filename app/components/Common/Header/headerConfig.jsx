import companyIcon from "@/app/assets/office-building.svg";
import navItemIcon from "@/app/assets/serive_home-icon-1.svg";
import CustomImage from "@/app/common/Image";
import {
  Building2,
  Car,
  Compass,
  CreditCard,
  FileText,
  Globe2,
  Hotel,
  Map,
  Plane,
  Sparkles,
  Users,
} from "lucide-react";

export const red700Filter =
  "brightness(0) saturate(100%) invert(20%) sepia(89%) saturate(5000%) hue-rotate(355deg) brightness(90%) contrast(120%)";

export const navItemIconPath = navItemIcon;
export const companyIconPath = companyIcon;

export const specialOffersMenu = [
  { name: "Early Bird Offers", slug: "special-offers/early-bird" },
  { name: "EMI Offers", slug: "special-offers/emi" },
  { name: "Group Tours Offers", slug: "special-offers/group-tours" },
  { name: "Special Promo Offers", slug: "special-offers/special-promo" },
];

export const servicesMenu = [
  {
    name: "Flight",
    slug: "service/flight-booking",
    icon: <Plane size={16} />,
  },
  { name: "Hotel", slug: "service/hotel-booking", icon: <Hotel size={16} /> },
  {
    name: "Money Exchange",
    slug: "service/money-exchange",
    icon: <CreditCard size={16} />,
  },
  {
    name: "Visa",
    slug: "service/visa-booking",
    icon: <FileText size={16} />,
  },
  {
    name: "Car Rental",
    slug: "https://royalmilesindia.webdadsprojects.com/",
    icon: <Car size={16} />,
    external: true,
  },
];

export const companyMenu = [
  { name: "About Us", slug: "about-us" },
  { name: "Blog", slug: "blog" },
  { name: "Career", slug: "career" },
  { name: "Contact Us", slug: "contact-us" },
  { name: "Gallery", slug: "gallery" },
];

export const headerItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const planTourButtonVariants = {
  animate: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export function getMenuIcon(menuName, iconPath) {
  if (iconPath && iconPath !== navItemIcon && iconPath !== companyIcon) {
    return (
      <div className="flex h-5 w-5 items-center justify-center">
        <CustomImage
          src={iconPath}
          alt=""
          className="h-5 w-5 object-contain"
        />
      </div>
    );
  }

  const iconMap = {
    Destinations: <Globe2 size={18} className="text-red-600" />,
    Tours: <Compass size={18} className="text-red-600" />,
    Packages: <Map size={18} className="text-red-600" />,
    "Group Tours": <Users size={18} className="text-red-600" />,
    Corporate: <Building2 size={18} className="text-red-600" />,
  };

  return iconMap[menuName] || <Sparkles size={18} className="text-red-600" />;
}
