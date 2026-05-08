/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-page-custom-font */
import "./globals.css";
import "@vietmap/vietmap-gl-js/dist/vietmap-gl.css";
import "./vcard.css";
import "normalize.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "aos/dist/aos.css";
import "react-loading-skeleton/dist/skeleton.css";

import React, { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
import PageChange from "@/components/PageChange";
import { getCurrentLocale } from "@/utils/languageHelper";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "@/context/authContext";
import { Nunito, Lexend, Baloo_2 } from "next/font/google";
import classNames from "classnames";
import { ReducerProvider } from "./StoreProvider";
import { incrementReport } from "@/services/server/report";

import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const nunito = Nunito({ subsets: ["latin"], display: "swap" });
const lexend = Lexend({ subsets: ["latin"], display: "swap" });
const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

async function handleReport() {
  try {
    await incrementReport();
  } catch (e) {
    console.log("Error", e);
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getCurrentLocale();
  await handleReport();

  return (
    <html
      lang={locale}
      className={classNames(
        "scroll-smooth xl:scroll-auto",
        nunito.className,
        lexend.className
      )}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="6ynsxitsz9pD2SocNfVH0ynh7MZ6Ix8oNK3RGzVWLz4"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Be+Vietnam+Pro&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
        <link rel="canonical" href="https://hathyo.com/" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/images/brand/favicon.ico" />
      </head>
      <body className={classNames("bg-gray-50", nunito.className)}>
        <Suspense fallback={<PageChange />}>
          <NextTopLoader />
          <ReducerProvider>
            <AuthProvider>
              <Header />
              {children}
              <Footer />
            </AuthProvider>
            <ToastContainer />
          </ReducerProvider>
        </Suspense>
      </body>
    </html>
  );
}

export function generateMetadata(): Metadata {
  const title = "Hathyo cùng bạn vui khỏe hơn!";
  const description =
    "Cùng vui mua sắm, Bán hàng vui khỏe, Quà tặng cuộc sống, Trẻ đẹp hơn mỗi ngày, Lành mạnh và khoa học hơn";

  return {
    title,
    description,
    applicationName: "Hathyo",
    authors: [{ name: "Hathyo Team", url: "https://hathyo.com" }],
    publisher: "Hathyo",
    category: "Health & E-Commerce",
    generator: "Next.js",
    keywords: [
      "Cùng vui mua sắm",
      "Bán hàng vui khỏe",
      "Quà tặng cuộc sống",
      "Trẻ đẹp hơn mỗi ngày",
      "Lành mạnh và khoa học hơn",
      "Vui khỏe trẻ đẹp hơn",
      "Vì một Việt Nam mạnh mẽ hơn",
    ],
    metadataBase: new URL("https://hathyo.com"),
    alternates: {
      canonical: "/",
      languages: {
        vi: "/vi",
        en: "/en",
      },
    },
    icons: {
      icon: "/images/brand/favicon.ico",
      shortcut: "/images/brand/favicon.ico",
      apple: "/images/brand/favicon.ico",
    },
    manifest: "/manifest.json",
    themeColor: "#ffffff",
    openGraph: {
      type: "website",
      url: "https://hathyo.com",
      title,
      description,
      siteName: "Hathyo",
      images: [
        {
          url: "https://hathyo.com/images/cover-bg-min.png",
          width: 1200,
          height: 630,
          alt: "Hathyo cùng bạn vui khỏe hơn",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@Hathyo.com",
      site: "@Hathyo.com",
      title,
      description,
      images: ["https://hathyo.com/images/cover-bg-min.png"],
    },
  };
}
