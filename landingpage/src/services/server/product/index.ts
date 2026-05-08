import { RequestConfig } from "@/types";
import { serverFetch } from "@/services/serverServices";

export const getProductDetail = (config?: RequestConfig) => {
  return serverFetch(`/products/${config?.id}`, config);
};
