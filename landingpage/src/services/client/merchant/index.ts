import { RequestConfig } from "@/types";
import { clientFetch } from "@/services/clientServices";

export const getMerchantInfoClient = (config?: RequestConfig) => {
  return clientFetch(`/merchant/${config?.id}`, config);
};
