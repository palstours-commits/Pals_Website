import { Jost } from "next/font/google";
import "./globals.css";
import AppWrapper from "./protectedRoute/ProtectedRoute";
import ReduxProvider from "./provider/ReduxProvider";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-jost",
});

const siteUrl = process.env.NEXT_SITE_URL;

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Pals Holidays | Best Holiday Packages & Villa Booking",
    template: "%s | Pals Holidays",
  },

  description:
    "Explore luxury villas, holiday packages, resorts, and unforgettable travel experiences with Pals Holidays. Book your dream vacation today.",

  keywords: [
    "Pals Holidays",
    "Holiday Packages",
    "Villa Booking",
    "Travel Agency",
    "Luxury Villas",
    "Resorts",
    "Vacation",
    "Family Trips",
    "Weekend Getaways",
    "Tour Packages",
  ],

  authors: [
    {
      name: "Pals Holidays",
    },
  ],

  creator: "Pals Holidays",
  publisher: "Pals Holidays",

  alternates: {
    canonical: "/",
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
    title: "Pals Holidays | Best Holiday Packages",
    description:
      "Book luxury villas and amazing holiday packages with Pals Holidays.",
    url: "https://www.palsholidays.com",
    siteName: "Pals Holidays",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pals Holidays",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pals Holidays",
    description:
      "Book luxury villas and holiday packages with Pals Holidays.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={jost.variable}
    >
      <body suppressHydrationWarning>
        <ReduxProvider>
          <AppWrapper>{children}</AppWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}