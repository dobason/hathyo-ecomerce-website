import { clientFetch } from "@/services/clientServices";
import { RequestConfig } from "@/types";

export const getListAddressService = (config?: RequestConfig) => {
  return clientFetch("/addresses", config);
};

export const getListProvinceService = (config?: RequestConfig) => {
  return clientFetch("/addresses/province", config);
};

export const getListDistrictService = (config?: RequestConfig) => {
  return clientFetch("/addresses/district", config);
};

export const getListWardService = (config?: RequestConfig) => {
  return clientFetch("/addresses/ward", config);
};

export const getOneAddressService = (config?: RequestConfig) => {
  return clientFetch(`/addresses/${config?.params?.id}`);
};

export const addAddressService = (config?: RequestConfig) => {
  return clientFetch("/addresses", {
    method: "POST",
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  }) as any;
};

export const updateAddressService = (config?: RequestConfig) => {
  return clientFetch(`/addresses/${config?.body?.id}`, {
    method: "PATCH",
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  }) as any;
};

export const removeAddressService = (config?: RequestConfig) => {
  return clientFetch(`/addresses/${config?.body?.id}`, {
    method: "DELETE",
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  }) as any;
};

export const convertCoordsToAddressService = (config?: RequestConfig) => {
  return clientFetch("/vietmap/convert", config);
};