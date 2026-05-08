import { RequestConfig } from "@/types";
import { serverFetch } from "@/services/serverServices";

export const getOrdersHistory = (config?: RequestConfig) => {
  return serverFetch("/orders", config);
};
