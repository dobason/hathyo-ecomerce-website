import { clientFetch } from "@/services/clientServices";
import { RequestConfig } from "@/types";

export type ShippingCheck = {
  cartId: number;
  express: boolean;
  economical: boolean;
};

export type ShippingItem = {
  cartId: number;
  shipping: "EXPRESS" | "ECONOMICAL";
  provinceId?: number;
};

export type UserNoteItem = {
  cartId: number;
  userNote: string;
};

export type CheckoutPreviewPayload = {
  addressId: number;
  couponId?: number | null;
  couponHathyoCode?: string | null;
  shippings: ShippingItem[];
};

export type CheckoutConfirmPayload = {
  addressId: number;
  couponId?: number | null;
  couponHathyoCode?: string | null;
  userNote: UserNoteItem[];
  shippings: ShippingItem[];
};

export type CheckoutPreviewResponse = Record<string, any>;
export type CheckoutConfirmResponse = Record<string, any>;

// Lấy shipping methods theo cart và tỉnh
export const getShippingMethods = (
  cartId: number,
  provinceId: number,
  config?: RequestConfig
) => {
  return clientFetch(`/product-shipping/check`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    baseUrl: process.env.API_URL,
    params: { cartId, provinceId },
    ...config,
  });
};

// Hàm build shipping mặc định
export const buildShippings = (
  carts: any[],
  provinceId: number,
  preferredMethods?: Record<number, "EXPRESS" | "ECONOMICAL">
): ShippingItem[] => {
  return carts
    .map((cart) => {
      const methods: string[] = cart.shippingMethods || [];

      let selected: "EXPRESS" | "ECONOMICAL" | null = null;

      if (preferredMethods && preferredMethods[cart.id]) {
        const preferred = preferredMethods[cart.id];
        if (methods.includes(preferred)) {
          selected = preferred;
        }
      }

      if (!selected) {
        if (provinceId === 50) {
          if (methods.includes("ECONOMICAL")) {
            selected = "ECONOMICAL";
          } else if (methods.includes("EXPRESS")) {
            selected = "EXPRESS";
          }
        } else {
          if (methods.includes("ECONOMICAL")) {
            selected = "ECONOMICAL";
          }
        }
      }

      if (!selected) {
        console.warn(
          `⚠️ Cart ${cart.id} không có phương thức shipping hợp lệ, bỏ qua`
        );
        return null;
      }

      return {
        cartId: cart.id,
        shipping: selected,
      };
    })
    .filter((s): s is ShippingItem => s !== null);
};

export const previewCheckoutAPI = (
  payload: CheckoutPreviewPayload,
  config?: RequestConfig
) => {
  if (!payload.shippings || payload.shippings.length === 0) {
    throw new Error("❌ Missing shippings array");
  }

  return clientFetch(`/checkout/preview`, {
    method: "POST",
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
    ...config,
  });
};

export const confirmCheckoutAPI = (
  payload: CheckoutConfirmPayload,
  config?: RequestConfig
) => {
  return clientFetch(`/checkout/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    ...config,
  });
};

// Hàm xác định shipping dựa trên tỉnh và phương thức shop hỗ trợ
export const determineAvailableShippingsByProvince = (
  provinceId: number,
  merchantMethods: { express: boolean; economical: boolean }
): string[] => {
  const available: string[] = [];

  if (provinceId !== 50) {
    // ngoài TP.HCM
    if (merchantMethods.economical) available.push("ECONOMICAL");
  } else {
    if (merchantMethods.economical) available.push("ECONOMICAL");
    if (merchantMethods.express) available.push("EXPRESS");
  }

  return available;
};
