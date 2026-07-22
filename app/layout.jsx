import { DM_Sans } from "next/font/google";
import "./globals.css";
import AppWrapper from "./protectedRoute/ProtectedRoute";
import ReduxProvider from "./provider/ReduxProvider";

export const metadata = {
  title: "Pals Holidays",
  description: "Smart holiday and travel management platform",
};



const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dmSans",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={` ${dmSans.variable}`}>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <AppWrapper>{children}</AppWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
