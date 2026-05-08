import { RequestConfig } from "@/types";
import { clientFetch } from "@/services/clientServices";

export const collectCoupon = (config?: RequestConfig) => {
  return clientFetch(`/coupons/collect`, {
    method: "POST",
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getCoupons = (config?: RequestConfig) => {
  return clientFetch(`/coupons`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...config,
  });
};

export const removeCouponCollect = (config?: RequestConfig) => {
  return clientFetch(`/coupons/collect`, {
    method: "DELETE",
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  }) as any;
};
