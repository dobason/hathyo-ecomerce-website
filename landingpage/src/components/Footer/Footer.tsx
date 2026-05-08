"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";

const Footer = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? "";
  const [imageSrc, setImageSrc] = useState("/images/hathyo-new-logo.jpg");
  const handleImageError = () => {
    if (imageSrc.includes(".jpg")) {
      setImageSrc("/images/HathyoV1_Rectangle_Full.png");
    } else if (imageSrc.includes(".png")) {
      setImageSrc("/images/HathyoV1_Rectangle_Full.svg");
    }
  };
  const footerLinks = [
    {
      title: "VỀ HATHYO",
      links: [
        { label: "Giới thiệu Hathyo", href: "/info/about" },
        { label: "Công cụ vui khỏe Hathyo", href: "/apps/hathyo-tools" },
        { label: "Tuyển dụng Hathyo", href: "/info/careers" },
      ],
    },
    {
      title: "NGƯỜI DÙNG",
      links: [
        {
          label: "Hành trình vui khỏe",
          href: "/user/wellness-transformations",
        },
        { label: "Câu hỏi thường gặp", href: "/user/faqs" },
        { label: "Quy chế hoạt động", href: "/static-content/terms-of-use" },
        { label: "Chính sách bảo mật", href: "/static-content/privacy-policy" },
        {
          label: "Cơ chế giải quyết tranh chấp",
          href: "/static-content/dispute-resolution",
        },
        { label: "Lưu ý quan trọng", href: "/static-content/disclaimers" },
        { label: "Trung tâm trợ giúp", href: "/helps/help-center" },

        { label: "Tiếp nhận phản ánh của TCXH", href: "/tcxh" },
        { label: "Danh sách phản ánh của TCXH", href: "/tcxh/list" },
      ],
    },
    {
      title: "MUA SẮM",
      links: [
        { label: "Liên hệ Hathyo", href: "/helps/feedback" },
        { label: "Tra cứu xử lý liên hệ", href: "/helps/feedback/list" },
        { label: "Hướng dẫn mua hàng", href: "/static-content/buying-guide" },
        { label: "Hướng dẫn bán hàng", href: "/static-content/selling-guide" },
        { label: "Bán hàng trên Hathyo", href: "https://admin.hathyo.com" },
        {
          label: "Phương thức thanh toán",
          href: "/static-content/payment-methods",
        },
        {
          label: "Phương thức vận chuyển",
          href: "/static-content/shipping-methods",
        },
        {
          label: "Chính sách đổi trả hàng",
          href: "/static-content/return-policy",
        },
      ],
    },
  ];

  const socialMediaLinks = [
    { label: "Zalo", icon: "/zalo.svg", href: "https://zalo.me/084827000248" },
    {
      label: "Facebook",
      icon: "/facebook.svg",
      href: "https://facebook.com/hathyo",
    },
    {
      label: "Instagram",
      icon: "/instagram.svg",
      href: "https://instagram.com/hathyo",
    },
    {
      label: "Tiktok",
      icon: "/tiktok.svg",
      href: "https://tiktok.com/@hathyo",
    },
    {
      label: "Youtube",
      icon: "/youtube.svg",
      href: "https://youtube.com/@hathyo",
    },
    {
      label: "Linkedin",
      icon: "/linkedin.svg",
      href: "https://linkedin.com/company/hathyo",
    },
  ];

  return mode === "mobile" ? null : (
    <div className="relative">
      <div className="flex flex-col gap-1">
        <div className="bg-white">
          <div className="container m-auto md:py-10 py-4  flex xl:flex-row flex-col gap-8">
            {/* Logo + Bộ Công Thương */}
            <div className="flex gap-4 flex-col xl:gap-2">
              <Link href="/" className="hover:opacity-90 transition">
                <img
                  src={imageSrc}
                  onError={handleImageError}
                  alt="Hathyo logo"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </Link>

              <a href="http://online.gov.vn/Website/chi-tiet-132045">
                <img
                  alt="Bộ Công Thương"
                  title="Bộ Công Thương"
                  src="/images/logoCCDV.png"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </a>
            </div>

            {/* Danh mục */}
            <div className="flex flex-1 gap-4 grid grid-cols-2 md:grid-cols-3">
              {footerLinks.map((section, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="body-bold text-Grayiron/700">
                    {section.title}
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.href}
                        target="_blank"
                        className="body-sm-medium text-Grayiron/500 hover:text-Moss/500 transition duration-200"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Kết nối + App */}
            <div className="flex flex-col gap-4">
              <div className="body-bold text-Grayiron/700 flex justify-center xl:justify-start">
                KẾT NỐI VUI KHỎE HATHYO
              </div>
              <div className="flex gap-4 justify-between flex-row xl:items-center">
                <div className="flex flex-col gap-1">
                  {socialMediaLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row gap-4 items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                    >
                      <div className="flex-none w-6">
                        <Image
                          src={social.icon}
                          alt={social.label}
                          width={28}
                          height={28}
                        />
                      </div>
                      <div className="flex-auto text-Grayiron/700 hover:text-Moss/500 body-sm-medium transition">
                        {social.label}
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-center">
                    <Image
                      src="/QR.png"
                      alt="QR Code"
                      className="w-24 rounded-md hover:scale-105 transition-transform duration-300"
                      width={72}
                      height={72}
                    />
                  </div>
                  <div className="flex justify-center">
                    <div className="transition duration-200 cursor-not-allowed opacity-70">
                      <Image
                        src="/app-store.svg"
                        alt="App Store"
                        width={180}
                        height={220}
                        className="w-24"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Link
                      href="https://hathyo-app-apk.s3.ap-southeast-1.amazonaws.com/hathyo_8_2.apk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition duration-200"
                    >
                      <Image
                        src="/google-play.svg"
                        alt="Google Play"
                        width={140}
                        height={180}
                        className="w-24"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white">
          {/* Thông tin công ty */}
          <div className="bg-white container m-auto md:py-10 py-4  flex flex-col xl:flex-row xl:justify-between xl:items-center xl:gap-8 gap-4">
            <div className="flex flex-1 w-full flex-col gap-2">
              <div className="body-bold text-Grayiron/700">
                Công ty TNHH Cuộc Sống Vui Khỏe
              </div>
              <div className="body-xs-regular text-Grayiron/700">
                  82 Phan Đăng Lưu, Phường Đức Nhuận, TP HCM
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="body-xs-regular text-Grayiron/700">
                      Điện thoại:
                    </span>
                    <Link
                      href="tel:0084-827000248"
                      className="body-xs-regular text-Grayiron/700 hover:text-Moss/500 hover:underline transition"
                    >
                      0084-827000248
                    </Link>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="body-xs-regular text-Grayiron/700">
                      Email:
                    </span>
                    <Link
                      href="mailto:email@hathyo.com"
                      className="body-xs-regular text-Grayiron/700 hover:text-Moss/500 hover:underline transition"
                    >
                      email@hathyo.com
                    </Link>
                  </div>
                </div>
                <div className="body-xs-regular text-Grayiron/700">
                  Giấy chứng nhận đăng ký doanh nghiệp số 0318170229 do Sở KHĐT
                  TP.HCM cấp ngày 17/11/2023.
                </div>
                <div className="body-xs-regular text-Grayiron/700">
                  Giấy phép Sàn giao dịch TMĐT, Website khuyến mại trực tuyến số
                  2025-0737/ĐK/TMĐT do Cục Thương mại điện tử và Kinh tế số – Bộ
                  Công Thương cấp ngày 12/09/2025.
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="body-xs-regular text-Grayiron/700 flex items-center gap-2">
                <span className="body-xs-medium">
                  Người chịu trách nhiệm quản lý website:
                </span>
                <span className="body-xs-regular">
                  Hoàng Minh Phụng – Giám đốc
                </span>
              </div>
              <div className="text-Grayiron/700 flex flex-col gap-2">
                <div className="body-xs-regular">
                  Đầu mối liên hệ, đại diện ủy quyền phối hợp với cơ quan nhà
                  nước có thẩm quyền:
                </div>
                <div className="body-xs-regular">Ông Hoàng Minh Phụng</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="body-xs-regular text-Grayiron/700">
                      Điện thoại:
                    </span>
                    <Link
                      href="tel:0908556220"
                      className="body-xs-regular text-Grayiron/700 hover:text-Moss/500 hover:underline transition"
                    >
                      0908556220
                    </Link>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="body-xs-regular text-Grayiron/700">
                      Email:
                    </span>
                    <Link
                      href="mailto:phunghm@gmail.com"
                      className="body-xs-regular text-Grayiron/700 hover:text-Moss/500 hover:underline transition"
                    >
                      phunghm@gmail.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white copyright">
          {/* Copyright */}
          <div className="container m-auto flex justify-center">
            <div className="body-xs-semibold text-Grayiron/700 text-center">
              © 2023 - {new Date().getFullYear()} Bản quyền thuộc về Công ty
              TNHH Cuộc Sống Vui Khỏe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
