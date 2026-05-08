import { RequestConfig } from "@/types";
import { clientFetch } from "@/services/clientServices";

export const postComment = (config?: RequestConfig) => {
  return clientFetch(`/posts/homepage/${config?.id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...config,
  });
};

export const getComments = (config?: RequestConfig) => {
  return clientFetch(`/posts/homepage/${config?.id}/comments`, {
    method: "GET",
    ...config,
  });
};

export const getPost = (config?: RequestConfig) => {
  return clientFetch(`/posts`, {
    method: "GET",
    ...config,
  });
};
