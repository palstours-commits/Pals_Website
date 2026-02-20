"use client";
import { useSelectedLayoutSegments, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { setupTokenRefresh, isLoginExpired } from "../utils/setupTokenRefresh";
import WhatsAppButton from "../common/WhatsAppButton";

export default function AppWrapper({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  // const accessToken = useSelector((state) => state.auth.accessToken);
  const segments = useSelectedLayoutSegments();
  const isNotFound = segments.includes("not-found");

  // useEffect(() => {
  //   if (isLoginExpired()) {
  //     localStorage.clear();
  //     dispatch(logout());
  //     router.push("/login");
  //     return;
  //   }
  //   if (accessToken) {
  //     setupTokenRefresh(dispatch, logout, refreshToken);
  //   }
  // }, [accessToken]);

  return (
    <>
      {!isNotFound && <Header />}
      <main>{children}</main>
      {!isNotFound && <WhatsAppButton />}
      {!isNotFound && <Footer />}
    </>
  );
}
