/* eslint-disable no-unused-vars */
"use client";

import { memo, useState, useCallback, useEffect } from "react";
import ItemInformation from "./ItemInformation";
import ImageFallback from "@/components/ImageFallback";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateAllIsChoose, updateIsChooseByMerchant } from "@/store/cartSlice";
import {
  setPaymentShippingMethod,
  setPaymentMerchantShippingMethods,
} from "@/store/paymentSlice";
import { getShippingMethods, ShippingCheck } from "@/services/shipping";
import { PaymentShippingMethod as ShippingMethod } from "@/store/paymentSlice";

type Props = {
  className?: string;
};

type ShippingState = {
  data: ShippingCheck | null;
  loading: boolean;
  error: string | null;
  rawResponse: any;
  debugInfo: any;
};

const HEADER_LABELS = ["Đơn giá", "Số lượng", "Số tiền", "Thao tác"];
const DEFAULT_PROVINCE_ID = 50; // HCM

function ItemAvailable({ className = "" }: Props) {
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.cart.carts);

  // Lấy shipping data từ Redux
  const selectedShippingMethods = useAppSelector(
    (state) => state.payment.selectedShippingMethods
  );

  const merchantShippingMethods = useAppSelector(
    (state) => state.payment.merchantShippingMethods
  );

  const [shippingStates, setShippingStates] = useState<
    Record<number, ShippingState>
  >({});

  const [dropdownOpen, setDropdownOpen] = useState<Record<number, boolean>>({});

  const toggleDropdown = (cartId: number) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [cartId]: !prev[cartId],
    }));
  };

  const fetchShippingMethods = useCallback(
    async (cartId: number, provinceId: number = DEFAULT_PROVINCE_ID) => {
      if (!cartId) {
        const errorMsg = "Cart ID is missing";
        console.error("[ShippingCheck] Error:", errorMsg);
        setShippingStates((prev) => ({
          ...prev,
          [cartId]: {
            data: null,
            loading: false,
            error: errorMsg,
            rawResponse: null,
            debugInfo: {},
          },
        }));
        return;
      }

      setShippingStates((prev) => ({
        ...prev,
        [cartId]: {
          ...prev[cartId],
          loading: true,
          error: null,
        },
      }));

      try {
        const startTime = performance.now();
        const res = await getShippingMethods(cartId, provinceId);
        const endTime = performance.now();

        const currentDebugInfo = {
          requestTime: new Date().toISOString(),
          responseTime: `${(endTime - startTime).toFixed(2)}ms`,
          cartId,
          provinceId,
          responseType: typeof res,
          responseConstructor: res?.constructor?.name,
        };

        let payload: ShippingCheck = {
          cartId,
          express: false,
          economical: false,
        };

        if (res && typeof res === "object") {
          payload = {
            cartId,
            express: Boolean(res.express),
            economical: Boolean(res.economical),
          };
        }

        // Update states
        setShippingStates((prev) => ({
          ...prev,
          [cartId]: {
            data: payload,
            loading: false,
            error: null,
            rawResponse: res,
            debugInfo: currentDebugInfo,
          },
        }));

        dispatch(
          setPaymentMerchantShippingMethods({ cartId, methods: payload })
        );

        const availableMethods: ShippingMethod[] = [];

        if (payload.economical) {
          availableMethods.push({
            id: "economical",
            name: "Giao hàng tiết kiệm",
            price: 0,
            estimatedTime: "3-5 ngày",
          });
        }

        if (payload.express) {
          availableMethods.push({
            id: "express",
            name: "Giao hàng nhanh",
            price: 0,
            estimatedTime: "1-2 ngày",
          });
        }

        if (availableMethods.length > 0) {
          const defaultMethod =
            availableMethods.find((method) => method.id === "economical") ||
            availableMethods[0];
          console.log(
            `[ItemAvailable] Set default method cho cart ${cartId}: ${defaultMethod.id}`
          );
          dispatch(setPaymentShippingMethod({ cartId, method: defaultMethod }));
        }
      } catch (err: any) {
        console.error("[ShippingCheck] === ERROR OCCURRED ===");
        console.error("[ShippingCheck] Error details:", {
          name: err?.name,
          message: err?.message,
          cartId,
          provinceId,
          timestamp: new Date().toISOString(),
        });

        const errorMsg = err?.message || "Lỗi khi tải phương thức vận chuyển";
        const defaultPayload = { cartId, express: true, economical: true };

        setShippingStates((prev) => ({
          ...prev,
          [cartId]: {
            data: defaultPayload,
            loading: false,
            error: errorMsg,
            rawResponse: null,
            debugInfo: { error: err },
          },
        }));

        dispatch(
          setPaymentMerchantShippingMethods({ cartId, methods: defaultPayload })
        );

        const defaultMethod: ShippingMethod = {
          id: "economical",
          name: "Giao hàng tiết kiệm",
          price: 0,
          estimatedTime: "3-5 ngày",
        };

        dispatch(setPaymentShippingMethod({ cartId, method: defaultMethod }));
      }
    },
    []
  );

  useEffect(() => {
    if (carts?.carts) {
      carts.carts.forEach((cart) => {
        const hasShippingData = merchantShippingMethods[cart.id];
        if (hasShippingData && !shippingStates[cart.id]?.data) {
          setShippingStates((prev) => ({
            ...prev,
            [cart.id]: {
              data: hasShippingData,
              loading: false,
              error: null,
              rawResponse: null,
              debugInfo: {},
            },
          }));
        }
      });
    }
  }, [carts?.carts, merchantShippingMethods]);

  useEffect(() => {
    if (carts?.carts) {
      console.log("[ItemAvailable] Debug sessionStorage:");
      carts.carts.forEach((cart) => {
        const storedMethod = sessionStorage.getItem(`cart_shipping_${cart.id}`);
        console.log(`Cart ${cart.id}: ${storedMethod || "null"}`);
      });

      carts.carts.forEach((cart) => {
        const hasShippingData = merchantShippingMethods[cart.id];
        const hasShippingState = shippingStates[cart.id]?.data;

        if (
          !hasShippingData &&
          !hasShippingState &&
          !shippingStates[cart.id]?.loading
        ) {
          fetchShippingMethods(cart.id);
        }
      });
    }
  }, [carts?.carts, fetchShippingMethods, merchantShippingMethods]);

  const handleToggleSelectAll = () => {
    dispatch(updateAllIsChoose({ choose: !carts?.choose }));
  };

  const handleMerchantToggle = (id: number, choose: boolean) => {
    dispatch(updateIsChooseByMerchant({ id, choose }));
  };

  const handleShippingChange = (cartId: number, method: ShippingMethod) => {
    dispatch(setPaymentShippingMethod({ cartId, method }));

    sessionStorage.setItem(`cart_shipping_${cartId}`, method.id);

    setDropdownOpen((prev) => ({
      ...prev,
      [cartId]: false,
    }));
  };

  const renderShippingSection = (cartId: number, merchantName: string) => {
    const shippingState = shippingStates[cartId];
    const selectedMethod = selectedShippingMethods[cartId];

    if (shippingState?.loading) {
      return (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-Moss/500"></div>
            <span className="text-sm text-gray-600">
              Đang kiểm tra phương thức vận chuyển...
            </span>
          </div>
        </div>
      );
    }

    const data = shippingState?.data;
    if (!data) {
      return (
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="text-sm text-gray-500">
            Không có dữ liệu phương thức vận chuyển
          </span>
        </div>
      );
    }

    const availableShippingMethods = [];
    if (data.economical) {
      availableShippingMethods.push({
        id: "economical",
        name: "Giao hàng tiết kiệm",
        estimatedTime: "3-5 ngày",
        description: "Phí vận chuyển thấp, thời gian giao hàng dài hơn",
        icon: "🚚",
      });
    }
    if (data.express) {
      availableShippingMethods.push({
        id: "express",
        name: "Giao hàng hoả tốc",
        estimatedTime: "1-2 ngày",
        description: "Giao hàng nhanh chóng, ưu tiên cao",
        icon: "⚡",
      });
    }

    return (
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-Moss/500 rounded-full"></div>
          <h3 className="font-semibold text-gray-800">
            Phương thức vận chuyển - {merchantName}
          </h3>
        </div>

        <button
          type="button"
          onClick={() => toggleDropdown(cartId)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-Moss/500 focus:border-Moss/500 hover:border-Moss/300 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {selectedMethod ? (
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {selectedMethod.id === "express" ? "⚡" : "🚚"}
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {selectedMethod.name}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {selectedMethod.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="text-gray-500">
                  Chọn phương thức vận chuyển
                </span>
              )}
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
                dropdownOpen[cartId] ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {dropdownOpen[cartId] && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {availableShippingMethods.map((method) => {
              const isSelected = selectedMethod?.id === method.id;
              return (
                <div
                  key={method.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                    isSelected ? "bg-Moss/50" : ""
                  }`}
                  onClick={() =>
                    handleShippingChange(cartId, {
                      id: method.id === "express" ? "express" : "economical",
                      name: method.name,
                      price: 0, // Sẽ được cập nhật sau khi có giá từ API
                      estimatedTime: method.estimatedTime,
                    })
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-xl">{method.icon}</span>
                      <div>
                        <div
                          className={`font-medium ${
                            isSelected ? "text-Moss/700" : "text-gray-900"
                          }`}
                        >
                          {method.name}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {method.description}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {method.estimatedTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div
                        className={`font-semibold ${
                          isSelected ? "text-Moss/700" : "text-gray-900"
                        }`}
                      ></div>
                      {isSelected && (
                        <svg
                          className="w-5 h-5 text-Moss/600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-2xl shadow text-gray-800 ${className}`}>
      <div className="bg-Moss/500 text-white rounded-t-2xl px-4 py-4 md:px-6 md:py-6 flex flex-wrap items-center">
        <div className="w-full md:w-1/2 flex items-center gap-3 text-base font-medium">
          <input
            type="checkbox"
            className="h-5 w-5 appearance-none rounded border border-gray-300 checked:bg-Moss/500 checked:border-Moss/500 focus:ring-2 focus:ring-Moss/200 cursor-pointer"
            checked={carts?.choose}
            onChange={handleToggleSelectAll}
          />
          <span>Sản phẩm</span>
        </div>
        <div className="hidden md:flex w-full md:w-1/2 justify-between text-sm font-medium text-white mt-4 md:mt-0 gap-x-4">
          {HEADER_LABELS.map((label, index) => (
            <div key={index} className="w-1/4 flex justify-center items-center">
              {label}
            </div>
          ))}
        </div>
      </div>

      {carts?.carts?.map((merchantCart) => (
        <div
          key={merchantCart.id}
          className="border-b border-gray-100 px-4 md:px-6 py-4 space-y-4"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none rounded border border-gray-300 checked:bg-Moss/500 checked:border-Moss/500 focus:ring-2 focus:ring-Moss/200 cursor-pointer"
              checked={merchantCart.choose}
              onChange={() =>
                handleMerchantToggle(
                  merchantCart.merchant.id,
                  !merchantCart.choose
                )
              }
            />
            <ImageFallback
              src={merchantCart.merchant?.logo}
              alt="merchant logo"
              width={32}
              height={32}
              errorImg="/product-fallback-image.png"
              className="rounded-full h-8 w-8 border object-cover"
            />
            <span className="font-semibold text-Moss/500">
              {merchantCart.merchant.storeName}
            </span>

            <div className="ml-auto flex items-center gap-2">
              {shippingStates[merchantCart.id]?.loading && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-400"></div>
                  <span>Đang tải vận chuyển...</span>
                </div>
              )}

              {shippingStates[merchantCart.id]?.error && (
                <div className="text-xs text-red-500">❌ Lỗi vận chuyển</div>
              )}

              {shippingStates[merchantCart.id]?.data &&
                !shippingStates[merchantCart.id]?.loading &&
                !shippingStates[merchantCart.id]?.error && (
                  <div className="text-xs text-green-600">
                    ✅ Vận chuyển khả dụng
                  </div>
                )}
            </div>
          </div>

          {/* Product List */}
          <div className="pt-2">
            <ItemInformation items={merchantCart.cartItemResponses} />
          </div>

          {/* Shipping Method Section */}
          <div className="pt-4 border-t border-gray-100">
            {renderShippingSection(
              merchantCart.id,
              merchantCart.merchant.storeName
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(ItemAvailable);
