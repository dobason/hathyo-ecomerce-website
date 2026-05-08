"use client";
import { Baloo_2 } from "next/font/google";

export interface SaveQuoteProps {
  background: string;
  quoteText: string;
  authorText: string;
  forwardRef?: React.Ref<HTMLDivElement>;
  isSharePage?: boolean;
}

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-baloo",
});

export default function SaveQuote({
  background,
  quoteText,
  authorText,
  forwardRef,
  isSharePage = false,
}: SaveQuoteProps) {
  return (
    <div
      ref={forwardRef}
      className="relative w-[600px] h-[350px] rounded-lg overflow-hidden"
    >
      {/* Background */}
      <img
        src={background || "/images/banner/01.png"}
        alt="Main banner"
        className="w-full h-full object-cover"
        crossOrigin="anonymous"
      />

      <div className="absolute top-[20px] left-[20px] text-green-700 text-center text-[13px] font-normal font-extrabold px-[10px] py-[12px] bg-white/40 backdrop-blur-sm !rounded-xl leading-tight">
        {/* <p>
          {new Date().toLocaleDateString("vi-VN", {
            weekday: "long",
          }) +
            " - " +
            new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
        </p> */}
        <p>Chủ nhật - 03/08/2025</p>
        <p
          className={`${baloo.className} text-green-700 font-extrabold text-[13px]`}
        >
          HATHYO chúc bạn luôn
        </p>
        <p
          className={`${baloo.className} uppercase text-green-700 font-extrabold text-[13px]`}
        >
          Vui - Khỏe
        </p>
      </div>

      <div className="absolute left-1/2 top-[68%] -translate-x-1/2 -translate-y-1/2 px-10 py-6  bg-white/70 backdrop-blur-sm !rounded-xl max-w-[460px] z-10 ">
        <p
          className={`italic ${
            baloo.className
          } text-green-900 text-center font-bold leading-relaxed ${
            isSharePage ? "text-[15px]" : "text-[16px]"
          }`}
        >
          &quot;{quoteText}&quot;
        </p>
        <p
          className={`italic ${
            baloo.className
          } text-green-800 mt-2 font-bold text-center ${
            isSharePage ? "text-[14px]" : "text-[15px]"
          }`}
        >
          — {authorText}
        </p>
      </div>

      {/* QR code bên phải */}
      <div className="absolute top-[20px] right-[20px] z-50 flex flex-col items-center">
        <img
          src="/QR.png"
          alt="QR Code"
          className="w-16 h-16 border border-gray-300 rounded"
          crossOrigin="anonymous"
        />
        <p className="mt-1 text-green-700 text-xs font-bold ${baloo.className}">
          hathyo.com
        </p>
      </div>
    </div>
  );
}
