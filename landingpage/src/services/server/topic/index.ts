import { RequestConfig } from "@/types";
import { serverFetch } from "@/services/serverServices";

export const getTopics = (config?: RequestConfig) => {
  return serverFetch("/topics", config);
};
