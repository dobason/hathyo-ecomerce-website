import ContactCard from "@/containers/contacts/PhungHoang";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "HATHYO - Cùng Bạn Vui Khỏe Hơn! CEO Phùng Hoàng",
  description:
    "Danh thiếp kỹ thuật số của Hoàng Minh Phụng, CEO của HATHYO - thương hiệu chăm sóc sức khỏe chủ động.",
  keywords: [
    "HATHYO",
    "Hoàng Minh Phụng",
    "CEO",
    "Wellness Architect",
    "Danh thiếp kỹ thuật số",
    "Liên hệ HATHYO",
    "HATHYO contact",
  ],
  openGraph: {
    title: "HATHYO - Cùng Bạn Vui Khỏe Hơn!",
    description:
      "Thông tin liên hệ và danh thiếp kỹ thuật số của CEO HATHYO - Hoàng Minh Phụng.",
    url: "https://hathyo.com/contacts/phung-hoang",
    images: [
      {
        url: "https://hathyo.com/images/vcards/phung-hoang.png",
        width: 800,
        height: 800,
        alt: "Hoàng Minh Phụng - CEO HATHYO",
      },
    ],
    siteName: "HATHYO",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "HATHYO - Danh thiếp CEO Phùng Hoàng",
    description: "Thông tin liên hệ CEO HATHYO: Hoàng Minh Phụng.",
    images: ["https://hathyo.com/images/vcards/phung-hoang.png"],
  },
});

export default function Page() {
  return (
    <main className="vcard-bg w-full">
      <ContactCard />
    </main>
  );
}
