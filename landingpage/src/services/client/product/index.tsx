import { RequestConfig } from "@/types";
import { clientFetch } from "@/services/clientServices";

export const postProductComment = (config?: RequestConfig) => {
  return clientFetch(`/products/homepage/${config?.id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...config,
  });
};

export const getProducts = (config?: RequestConfig) => {
  return clientFetch(`/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...config,
  });
};

export const getProductComments = (config?: RequestConfig) => {
  return clientFetch(`/products/homepage/${config?.id}/comments`, {
    method: "GET",
    ...config,
  });
};

export const getProductSimilarCart = (config?: RequestConfig) => {
  return clientFetch(`/products/similar-cart`, {
    method: "GET",
    ...config,
  });
};

export const getProductRating = (config?: RequestConfig) => {
  return clientFetch(`/products/rate`, {
    method: "GET",
    ...config,
  });
};
