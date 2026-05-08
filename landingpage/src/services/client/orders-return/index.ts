import { clientFetch } from "@/services/clientServices";
import { RequestConfig } from "@/types";

export const getListOrderReturnService = (config?: RequestConfig) => {
  return clientFetch("/orders/order-return", config);
};

export const updateChooseReturndOrer = (config?: RequestConfig) => {
  return clientFetch(
    `/orders/update-choose-return/order/${config?.id}/${config?.body?.choose}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const updateChooseReturnItem = (config?: RequestConfig) => {
  return clientFetch(
    `/orders/update-choose-return/item/${config?.id}/${config?.body?.choose}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const cancelOrderService = (config?: RequestConfig) => {
  return clientFetch(`/orders/${config?.id}/cancel`, {
    method: "PATCH",
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const recieveOrderService = (config?: RequestConfig) => {
  return clientFetch(`/orders/order-return/refund/receive/${config?.id}`, {
    method: "POST",
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const returnOrderService = (config?: RequestConfig) => {
  return clientFetch(`/orders/order-return`, {
    method: "POST",
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
