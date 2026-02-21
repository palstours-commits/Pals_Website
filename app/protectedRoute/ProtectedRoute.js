"use client";
import { useSelectedLayoutSegments, useRouter } from "next/navigation";
import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";
import WhatsAppButton from "../common/WhatsAppButton";

export default function AppWrapper({ children }) {
  const segments = useSelectedLayoutSegments();
  const isNotFound = segments.includes("not-found");

  return (
    <>
      {!isNotFound && <Header />}
      <main>{children}</main>
      {!isNotFound && <WhatsAppButton />}
      {!isNotFound && <Footer />}
    </>
  );
}
