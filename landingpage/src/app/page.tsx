import Banner from "@/containers/Home/Banner";
import GroupRedirect from "@/containers/Home/Container/GroupRedirect";
import Shop from "@/containers/Home/Container/Shop";
import Experts from "@/containers/Home/Container/Experts";
import { Metadata } from "next";

export default function Page() {
  return (
    <main>
      <Banner />
      <div className="container m-auto">
        <Shop />
      </div>
      <div className="bg-Moss/50 py-8">
        <Experts />
      </div>
    </main>
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
    category: "Health & E-Commerce",
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
      site: "@Hathyo.com",
      creator: "@Hathyo.com",
      title,
      description,
      images: ["https://hathyo.com/images/cover-bg-min.png"],
    },
  };
}
