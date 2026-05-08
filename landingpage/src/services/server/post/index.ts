import { RequestConfig } from "@/types";
import { serverFetch } from "@/services/serverServices";

export const getPostDetail = (config?: RequestConfig) => {
  return serverFetch(`/posts/homepage/${config?.id}`, config);
};

export const getPost = (config?: RequestConfig) => {
  return serverFetch(`/posts`, config);
};

export const getProductRelated = (config?: RequestConfig) => {
  return serverFetch(`/posts/${config?.id}/products`, config);
};
