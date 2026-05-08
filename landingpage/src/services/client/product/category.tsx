import { RequestConfig } from "@/types";
import { clientFetch } from "@/services/clientServices";

export const getShopCategories = (config?: RequestConfig) => {
  return clientFetch(`/shop-categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...config,
  });
};
