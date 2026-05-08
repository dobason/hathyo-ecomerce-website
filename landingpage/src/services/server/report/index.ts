import { RequestConfig } from "@/types";
import { serverFetch } from "@/services/serverServices";

export const incrementReport = (config?: RequestConfig) => {
  return serverFetch(`/report/increment-so-luong-truy-cap`, {
    method: "POST",
    ...config,
  });
};
