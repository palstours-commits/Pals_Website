import "./globals.css";
import AppWrapper from "./protectedRoute/ProtectedRoute";
import ReduxProvider from "./provider/ReduxProvider";
import { Poppins, Inter } from "next/font/google";

export const metadata = {
  title: "Pals",
  description: "Pals – Smart holiday and travel management platform",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <AppWrapper>{children}</AppWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
