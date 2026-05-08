// services/checkout.ts
export interface ShippingItem {
  cartId: number;
  shipping: "EXPRESS" | "ECONOMICAL";
}

export interface UserNoteItem {
  cartId: number;
  userNote: string;
}

export interface CheckoutPreviewPayload {
  addressId: number;
  couponId: number;
  couponHathyoCode: string;
  shippings: ShippingItem[];
}

export interface CheckoutPreviewResponse {
  // Add response interface based on your API response
  [key: string]: any;
}

export interface CheckoutConfirmPayload {
  addressId: number;
  couponId: number;
  couponHathyoCode: string;
  userNote: UserNoteItem[];
  shippings: ShippingItem[];
}

export interface CheckoutConfirmResponse {
  // Add response interface based on your API response
  [key: string]: any;
}

export const previewCheckout = async (
  payload: CheckoutPreviewPayload
): Promise<CheckoutPreviewResponse> => {
  try {
    const response = await fetch("/api/v1/checkout/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to preview checkout: ${response.status} ${response.statusText}`
      );
    }

    const data: CheckoutPreviewResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error in previewCheckout:", error);
    throw error;
  }
};

/**
 * Xác nhận đơn hàng
 * @param payload - Thông tin checkout confirm
 * @returns Promise<CheckoutConfirmResponse>
 */
export const confirmCheckout = async (
  payload: CheckoutConfirmPayload
): Promise<CheckoutConfirmResponse> => {
  try {
    const response = await fetch("/api/v1/checkout/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to confirm checkout: ${response.status} ${response.statusText}`
      );
    }

    const data: CheckoutConfirmResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error in confirmCheckout:", error);
    throw error;
  }
};


export const determineAvailableShippingsByProvince = (
  provinceId: number,
  merchantShippings: { express: boolean; economical: boolean }
): ("EXPRESS" | "ECONOMICAL")[] => {
  const { express, economical } = merchantShippings;

  // Nếu provinceId là 50 (TP.HCM) thì hiển thị cả 2 phương thức nếu merchant có
  if (provinceId === 50) {
    const available: ("EXPRESS" | "ECONOMICAL")[] = [];
    if (economical) available.push("ECONOMICAL");
    if (express) available.push("EXPRESS");
    return available;
  } else {
    // Khác TP.HCM chỉ trả về phương thức tiết kiệm
    return economical ? ["ECONOMICAL"] : [];
  }
};
