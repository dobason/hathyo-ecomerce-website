import { getProducts } from "@/services/client/product";

const BASE_URL = "https://hathyo.com";

export async function generateProductSitemap() {
  try {
    const res = await getProducts({
      params: { page: 0, size: 1000, status: "APPROVED" },
    });

    return res?.products?.map((product: any) => ({
      url: `${BASE_URL}/product/${product.id}`,
      lastModified: product.updatedAt || product.createdAt,
      priority: 0.8,
      changeFrequency: "weekly",
    }));
  } catch (e) {
    console.log("Error", e);
  }
}

// Static pages collected from menus
const STATIC_PATHS: {
  href: string;
  changeFrequency?: string;
  priority?: number;
}[] = [
  // Trang chính
  { href: "/", priority: 1, changeFrequency: "monthly" },
  { href: "/product", priority: 0.8, changeFrequency: "weekly" },

  // Về Hathyo
  { href: "/info/about" },
  { href: "/apps/hathyo-tools" },
  { href: "/info/careers" },

  // Người dùng
  { href: "/user/wellness-transformations" },
  { href: "/user/faqs" },
  { href: "/static-content/terms-of-use" },
  { href: "/static-content/privacy-policy" },
  { href: "/static-content/dispute-resolution" },
  { href: "/static-content/disclaimers" },
  { href: "/helps/help-center" },
  { href: "/helps/feedback" },
  { href: "/helps/feedback/list" },

  // Mua sắm
  { href: "/static-content/buying-guide" },
  { href: "/static-content/selling-guide" },
  // Không thêm external: https://admin.hathyo.com
  { href: "/static-content/payment-methods" },
  { href: "/static-content/shipping-methods" },
  { href: "/static-content/return-policy" },
];

export default async function sitemap() {
  const productUrls = await generateProductSitemap();

  const staticUrls = STATIC_PATHS.map((item) => ({
    url: `${BASE_URL}${item.href}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency || "monthly",
    priority: item.priority || 0.5,
  }));

  return [...staticUrls, ...(productUrls || [])];
}
