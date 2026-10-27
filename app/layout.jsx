import Script from 'next/script';
import { Jost } from "next/font/google";
import "./globals.css";
import AppWrapper from "./protectedRoute/ProtectedRoute";
import ReduxProvider from "./provider/ReduxProvider";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-jost",
});


const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.palsholidays.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pals Holidays | Best Tour Operators & Holiday Packages in India",
    template: "%s | Pals Holidays",
  },
  description:
    "Explore customized domestic and international holiday packages, flight bookings, and unforgettable travel experiences with Pals Holidays Chennai.",
  keywords: [
    "Pals Holidays",
    "Tour Operators in India",
    "Holiday Packages Chennai",
    "South India Tour Packages",
    "Customized Vacation Planning",
    "Travel Agency India",
  ],
  authors: [{ name: "Pals Holidays" }],
  creator: "Pals Holidays",
  publisher: "Pals Holidays",
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Pals Holidays | Best Tour Operators & Holiday Packages in India",
    description:
      "Book customized holiday packages and flights with top tour operators.",
    url: "./",
    siteName: "Pals Holidays",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pals Holidays",
    description: "Book holiday packages and flights with Pals Holidays.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Pals Holidays",
    "@id": "https://www.palsholidays.com",
    url: "https://www.palsholidays.com",
    telephone: "+91-9841255715",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:30",
      closes: "18:30",
    },
    priceRange: "$$",
  };
  return (
    <html lang="en" suppressHydrationWarning className={jost.variable}>
      <head>
        <Script
          id="json-ld-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <AppWrapper>{children}</AppWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
