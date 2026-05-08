import { clientFetch } from "@/services/clientServices";
import { RequestConfig } from "@/types";

/**
 * Gửi yêu cầu xác nhận thanh toán
 * @param config RequestConfig chứa body và headers
 * @returns Promise resolved hoặc rejected với dữ liệu từ API
 */
export const handleCheckout = async (config?: RequestConfig) => {
  try {
    const response = await clientFetch(`/checkout/confirm`, {
      method: "POST",
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers || {}),
      },
    });
    return Promise.resolve(response);
  } catch (error) {
    console.error("handleCheckout error:", error);
    return Promise.reject(error);
  }
};

/**
 * Gửi yêu cầu xem trước đơn hàng thanh toán
 * @param config RequestConfig chứa body và headers
 * @returns Promise resolved hoặc rejected với dữ liệu từ API
 */
export const getCheckoutInfo = async (config?: RequestConfig) => {
  try {
    const response = await clientFetch(`/checkout/preview`, {
      method: "POST",
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers || {}),
      },
    });
    return Promise.resolve(response);
  } catch (error) {
    console.error("getCheckoutInfo error:", error);
    return Promise.reject(error);
  }
};
