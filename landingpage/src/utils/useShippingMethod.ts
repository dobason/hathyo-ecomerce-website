import { useState, useEffect } from "react";
import { getShippingMethods } from "@/services/shipping";

export type ShippingMethodType = {
  id: string;
  name: string;
  price: number;
  estimatedTime: string;
};

export type ShippingCheckResponse = {
  cartId: number;
  provinceId: number;
  availableMethods: ShippingMethodType[];
  hasMultipleMethods: boolean;
  success: boolean;
  message?: string;
};

export type UseShippingMethodsProps = {
  cartId: number;
  provinceId: number;
  enabled?: boolean;
};

export const SHIPPING_METHODS = {
  ECONOMY: {
    id: "economical",
    name: "Giao hàng tiết kiệm",
    price: 15000,
    estimatedTime: "3-5 ngày",
  },
  EXPRESS: {
    id: "express",
    name: "Giao hàng hoả tốc",
    price: 30000,
    estimatedTime: "1-2 ngày",
  },
} as const;

export function useShippingMethods({
  cartId,
  provinceId,
  enabled = true,
}: UseShippingMethodsProps) {
  const [data, setData] = useState<ShippingCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !cartId || !provinceId) return;

    const fetchShippingMethods = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getShippingMethods(cartId, provinceId);

        // Xử lý response từ API
        if (result.success) {
          setData(result);
        } else {
          // Fallback nếu API trả về không thành công
          const fallbackData: ShippingCheckResponse = {
            cartId,
            provinceId,
            availableMethods: [SHIPPING_METHODS.ECONOMY],
            hasMultipleMethods: false,
            success: true,
            message: "Fallback to economy shipping",
          };
          setData(fallbackData);
        }
      } catch (err) {
        console.error("Error fetching shipping methods:", err);
        setError(err instanceof Error ? err.message : "Unknown error");

        // Fallback data trong trường hợp lỗi
        const fallbackData: ShippingCheckResponse = {
          cartId,
          provinceId,
          availableMethods: [SHIPPING_METHODS.ECONOMY],
          hasMultipleMethods: false,
          success: false,
          message: "Error occurred, using fallback data",
        };
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingMethods();
  }, [cartId, provinceId, enabled]);

  const refetch = () => {
    if (cartId && provinceId) {
      setData(null);
      setError(null);
      // Re-trigger the useEffect by forcing a re-render
      setLoading(true);
    }
  };

  return {
    data,
    loading,
    error,
    refetch,
    availableMethods: data?.availableMethods || [],
    hasMultipleMethods: data?.hasMultipleMethods || false,
  };
}
