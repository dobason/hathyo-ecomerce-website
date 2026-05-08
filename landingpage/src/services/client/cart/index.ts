import { clientFetch } from "@/services/clientServices";
import { RequestConfig } from "@/types";

export const getClientCart = (config?: RequestConfig) => {
  return clientFetch("/carts", config);
};

export const getUserCart = (config?: RequestConfig) => {
  return clientFetch("/carts/user-carts", config);
};

export const addCartItemService = (config?: RequestConfig) => {
  return clientFetch("/carts/add-item", {
    method: "POST",
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  }) as any;
};

export const updateChooseByProductId = (config?: RequestConfig) => {
  return clientFetch(
    `/carts/update-choose/by-product-id/${config?.body?.id}/${config?.body?.choose}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ) as any;
};

export const updateChooseByMerchantId = (config?: RequestConfig) => {
  return clientFetch(
    `/carts/update-choose/by-merchant-id/${config?.body?.id}/${config?.body?.choose}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ) as any;
};

export const updateChooseByItemId = (config?: RequestConfig) => {
  return clientFetch(
    `/carts/update-choose/by-item-id/${config?.body?.id}/${config?.body?.choose}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ) as any;
};

export const updateChooseAll = (config?: RequestConfig) => {
  return clientFetch(`/carts/update-choose/all/${config?.body?.choose}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  }) as any;
};

export const updateCartItemService = (config?: RequestConfig) => {
  return clientFetch("/carts/update-item", {
    method: "PUT",
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  }) as any;
};

export const removeCartItemService = (config?: RequestConfig) => {
  return clientFetch(`/carts/remove-item/${config?.params?.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }) as any;
};
