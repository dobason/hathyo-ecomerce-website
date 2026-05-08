import { RequestConfig } from "@/types";
import { serverFetch } from "@/services/serverServices";

export const getContent = (config?: RequestConfig) => {
  return serverFetch(`/static-content/detail`, config);
};
