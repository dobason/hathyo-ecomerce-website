import { clientFetch } from "@/services/clientServices";
import { RequestConfig } from "@/types";

export const postFeedback = (config?: RequestConfig) => {
  return clientFetch(`/feedbacks`, {
    method: "POST",
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getListFeedback = (config?: RequestConfig) => {
  return clientFetch(`/feedbacks/filter`, {
    method: "POST",
    ...config,
  });
};
