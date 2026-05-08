import { RequestConfig } from "@/types";
import { clientFetchFormData } from "@/services/clientServices";

export const uploadService = (config?: RequestConfig) => {
  return clientFetchFormData("/files/upload", config);
};
