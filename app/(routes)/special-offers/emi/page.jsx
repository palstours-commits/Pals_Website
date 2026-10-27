import EasyEMIHolidayPlansSection from "@/app/components/Container/EmiSection/EmiSection";
import React from "react";

export const metadata = {
  title: "Holiday Packages on Easy EMI | Travel Now Pay Later",
  description:
    "Don’t worry about budget! Book your dream holiday package with easy monthly installments (EMI). Simple payment options with Pals Holidays.",
  keywords: [
    "Travel on EMI",
    "Holiday package monthly installment",
    "Affordable vacation payment plans",
  ],
  alternates: {
    canonical: "/special-offers/emi",
  },
  openGraph: {
    title:
      "Holiday Packages on Easy EMI | Travel Now Pay Later | Pals Holidays",
    description:
      "Book your dream holiday package with easy monthly installments (EMI).",
    url: "/special-offers/emi",
    locale: "en_IN",
    type: "website",
  },
};

function page() {
  return <EasyEMIHolidayPlansSection />;
}

export default page;
