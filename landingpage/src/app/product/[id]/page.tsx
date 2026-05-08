// import { getHomePageData } from "@/services/serverServices";
import SuggestedProducts from "@/components/SuggestedProducts";
import Rating from "@/containers/Product/Rating";
import MerchantInfo from "@/containers/Product/MerchantInfo";
import ProductDescription from "@/containers/Product/ProductDescription";
import ProductInfo from "@/containers/Product/ProductInfo";
import { getProductDetail } from "@/services/server/product";
import { getProducts } from "@/services/client/product";
import type { Metadata, ResolvingMetadata } from "next";
import { ProductItem, ListResponse } from "@/types";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ✅ Hàm loại bỏ thẻ HTML khỏi shortDescription (dùng trên server)
function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

async function getProduct(id: string) {
  const res = await getProductDetail({ id: parseInt(id) });
  const product = await res;
  if (!product) return [];
  return product;
}

export async function generateStaticParams() {
  const res = (await getProducts({
    params: { page: 1, limit: 1000, status: "APPROVED" },
  })) as ListResponse;

  return res?.products
    ? res?.products?.map((product: ProductItem) => ({
        id: String(product.id),
      }))
    : [];
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const product = await getProductDetail({ id: parseInt(id) });
  const previousImages = (await parent).openGraph?.images || [];

  const cleanDescription = stripHTML(product?.shortDescription || "");
  const siteName = "Hathyo";
  const url = `https://hathyo.com/product/${id}`;
  const mainImage =
    product?.mainImageUrl || "https://hathyo.com/default-og-image.jpg";

  return {
    title: `Hathyo cùng bạn vui khỏe hơn! - Sản phẩm ${product?.title}`,
    description: `${cleanDescription} - Cùng vui mua sắm, Bán hàng vui khỏe, Quà tặng cuộc sống, Trẻ đẹp hơn mỗi ngày, Lành mạnh và khoa học hơn`,
    keywords: [
      "Cùng vui mua sắm",
      "Bán hàng vui khỏe",
      "Quà tặng cuộc sống",
      "Trẻ đẹp hơn mỗi ngày",
      "Lành mạnh và khoa học hơn",
      "Vui khỏe trẻ đẹp hơn",
      "Vì một Việt Nam mạnh mẽ hơn",
      product?.brandName,
      product?.name,
    ],
    metadataBase: new URL("https://hathyo.com"),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product?.title,
      description: cleanDescription,
      url,
      type: "website", // ✅ Sửa ở đây
      siteName,
      images: [
        mainImage,
        ...(product?.otherImageUrls || []),
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product?.title,
      description: cleanDescription,
      creator: "@Hathyo",
      site: "@Hathyo",
      images: [
        mainImage,
        ...(product?.otherImageUrls || []),
        ...previousImages,
      ],
    },
    applicationName: siteName,
    authors: [{ name: "Hathyo", url: "https://hathyo.com" }],
    creator: "Hathyo",
    publisher: "Hathyo",
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    viewport:
      "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=1",
    themeColor: "#0A6D3D", // màu thương hiệu nếu có
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const productDetail = await getProduct(id);

  return (
    <main>
      <div className="md:container m-auto flex flex-col gap-6 my-4">
        <ProductInfo product={productDetail} />
        <MerchantInfo
          id={productDetail?.merchant?.id}
          logo={productDetail?.merchant?.logo}
          storeName={productDetail?.merchant?.storeName ?? "Hathyo partner"}
          createdAt={productDetail?.merchant?.createdAt}
          numOfTotalProducts={productDetail?.merchant?.numOfTotalProducts}
          numOfFollowers={productDetail?.merchant?.numOfFollowers}
          responseRate={productDetail?.merchant?.responseRate}
          rating={productDetail?.merchant?.rating}
        />
        <ProductDescription description={productDetail?.fullDescription} />
        {!!productDetail?.suggestedProducts &&
          productDetail?.suggestedProducts?.length > 0 && (
            <SuggestedProducts
              title="Sản phẩm gợi ý"
              products={productDetail?.suggestedProducts}
            />
          )}
        <Rating id={id} product={productDetail} />
      </div>
      {/* <CardSideBar items={cartItem.cart} /> */}
    </main>
  );
}
