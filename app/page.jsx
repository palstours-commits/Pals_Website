import HomeSection from "./components/Container/Home/HomeSection";

export const metadata = {
  title: "Pals Holidays | Luxury Villas & Holiday Packages",
  description:
    "Discover luxury villas, resorts, and curated holiday packages with Pals Holidays. Book your perfect getaway today.",

  keywords: [
    "Pals Holidays",
    "Holiday Packages",
    "Luxury Villas",
    "Villa Booking",
    "Travel",
    "Resorts",
    "Vacation",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Pals Holidays | Luxury Villas & Holiday Packages",
    description:
      "Book luxury villas and holiday packages with Pals Holidays.",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pals Holidays",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pals Holidays",
    description:
      "Book luxury villas and holiday packages with Pals Holidays.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <HomeSection />;
}