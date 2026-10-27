import HomeSection from "./components/Container/Home/HomeSection";

export const metadata = {
  title: "Best Tour Operators & Holiday Packages in India",
  description:
    "Discover curated South & North India holiday packages, family tours, and travel deals with Pals Holidays. Book your perfect getaway today.",
  keywords: [
    "Pals Holidays",
    "Holiday Packages India",
    "South India Tour Packages",
    "Golden Triangle Tour Operator",
    "Family Vacation Planning",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Tour Operators & Holiday Packages in India | Pals Holidays",
    description:
      "Book customized holiday packages and family tours with Pals Holidays.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Tour Operators & Holiday Packages in India | Pals Holidays",
    description:
      "Book holiday packages and travel experiences with Pals Holidays.",
  },
};

export default function Page() {
  return <HomeSection />;
}