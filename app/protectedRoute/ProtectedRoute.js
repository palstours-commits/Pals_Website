"use client";
import { useSelectedLayoutSegments } from "next/navigation";
import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";
import WhatsAppButton from "../common/WhatsAppButton";
import Fixed_ContactSection from "../common/Fixed_ContactSection";
import FloatingContact from "../common/FloatingContact";

export default function AppWrapper({ children }) {
  const segments = useSelectedLayoutSegments();
  const isNotFound = segments.includes("not-found");

  return (
    <>
      {!isNotFound && <Header />}
      <main className="pb-28 sm:pb-24 md:pb-20 lg:pb-0">{children}</main>

      {!isNotFound && (
        <>
          <WhatsAppButton />
          <Fixed_ContactSection />
          <FloatingContact />
        </>
      )}

      {!isNotFound && <Footer />}
    </>
  );
}
