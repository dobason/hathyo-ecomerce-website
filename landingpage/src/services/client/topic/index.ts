import { RequestConfig } from "@/types";
import { clientFetch } from "@/services/clientServices";

export const getPostsByTopic = (config?: RequestConfig) => {
  return clientFetch(`/posts/homepage/topic/${config?.id}`, config);
};

export const getTopicsClient = (config?: RequestConfig) => {
  return clientFetch("/topics", config);
};
