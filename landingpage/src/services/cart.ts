// services/cart.ts
export interface ShippingCheckResponse {
  cartId: number;
  express: boolean;
  economical: boolean;
}

export interface ShippingCheckParams {
  cartId: number;
}


export const getShippingMethods = async (
  cartId: number
): Promise<ShippingCheckResponse> => {
  try {
    const response = await fetch(
      `/api/v1/product-shipping/check?cartId=${cartId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch shipping methods: ${response.status} ${response.statusText}`
      );
    }

    const data: ShippingCheckResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getShippingMethods:", error);
    throw error;
  }
};

export const getDefaultShippingMethod = (
  shippingMethods: ShippingCheckResponse
): "economical" | "express" => {
  if (shippingMethods.express && shippingMethods.economical) {
    return "economical";
  }

  return shippingMethods.express ? "express" : "economical";
};


export const getAvailableShippingMethods = (
  shippingMethods: ShippingCheckResponse
): string[] => {
  const methods = [];
  if (shippingMethods.economical) methods.push("economical");
  if (shippingMethods.express) methods.push("express");
  return methods;
};
