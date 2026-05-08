import { RequestConfig } from "@/types";
import { clientFetch } from "@/services/clientServices";

export const getAddressFromLatLng = (config?: RequestConfig) => {
  return clientFetch(`/vietmap/reverse`, {
    method: "POST",
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
