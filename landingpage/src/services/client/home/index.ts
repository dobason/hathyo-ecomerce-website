import { RequestConfig } from "@/types";
import { clientFetch } from "@/services/clientServices";

export const getHomeData = (config?: RequestConfig) => {
  return clientFetch("/posts/homepage", config);
};

export const getQuotes = (config?: RequestConfig) => {
  return clientFetch("/quotes", config);
};

export const getProducts = (config?: RequestConfig) => {
  return clientFetch("/products/homepage", config);
};
