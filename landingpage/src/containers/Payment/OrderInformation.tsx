"use client";

import { memo, useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  setPaymentShippingMethod,
  setIsUpdatingShipping as setIsUpdatingShippingSlice,
} from "@/store/paymentSlice";
import ItemInformation from "./ItemInformation";
import { map } from "lodash";
import { formatToCurrencyVND } from "@/utils/commonHelper";
import {
  confirmCheckoutAPI,
  getShippingMethods,
  type ShippingItem,
  type UserNoteItem,
  type CheckoutConfirmPayload,
} from "@/services/shipping";

type ShippingMethodType = {
  id: "express" | "economical";
  name: string;
  price: number;
  estimatedTime: string;
};

type Props = {
  className?: string;
};

function OrderInformation() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const addressSelected = useAppSelector(
    (state) => state.address.addressSelected
  );
  const provinceId = addressSelected?.provinceId || 0;
  const addressId = addressSelected?.id || 0;
  const selectedCouponCode = useAppSelector(
    (state) => state.payment.selectedCouponCode || undefined
  );
  const [selectedShipping, setSelectedShipping] = useState<
    Record<number, ShippingMethodType>
  >({});
  const selectedShippingFromRedux = useAppSelector(
    (state) => state.payment.selectedShippingMethods
  );

  const [userNotes, setUserNotes] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [availableShippings, setAvailableShippings] = useState<
    Record<number, Array<"EXPRESS" | "ECONOMICAL">>
  >({});
  const [shippingPrices, setShippingPrices] = useState<
    Record<number, { express: number; economical: number }>
  >({});
  const [shippingMethodsLoaded, setShippingMethodsLoaded] = useState<
    Record<number, boolean>
  >({});
  const [dropdownOpen, setDropdownOpen] = useState<Record<number, boolean>>({});
  const [isUpdatingShipping, setIsUpdatingShipping] = useState<boolean>(false);

  const fetchedCarts = useRef<Set<string>>(new Set());
  const isFetchingRef = useRef<boolean>(false);

  const previewCheckout = useAppSelector(
    (state) => state.payment.previewCheckout
  );
  const carts: any[] = useMemo(
    () => previewCheckout?.carts ?? [],
    [previewCheckout]
  );

  const apiShippingPrices: Record<number, number> = useMemo(() => {
    const newApiShippingPrices: Record<number, number> = {};
    carts.forEach((cart: any) => {
      if (cart.shippingPrice) {
        newApiShippingPrices[cart.id] = cart.shippingPrice;
      }
    });
    return newApiShippingPrices;
  }, [carts]);

  const cartProvinceKey = useMemo(() => {
    const cartIds = carts
      .map((c) => c.id)
      .sort()
      .join(",");
    return `${cartIds}-${provinceId}`;
  }, [carts, provinceId]);

  const getShippingPrice = useCallback(
    (
      cartId: number,
      method: "EXPRESS" | "ECONOMICAL",
      shippingPricesData?: Record<
        number,
        { express: number; economical: number }
      >
    ): number => {
      const currentShippingData =
        shippingPricesData?.[cartId] || shippingPrices[cartId];
      const apiPrice = apiShippingPrices[cartId] || 0;
      if (currentShippingData) {
        const estimatedPrice =
          method === "EXPRESS"
            ? currentShippingData.express
            : currentShippingData.economical;
        return estimatedPrice > 0 ? estimatedPrice : apiPrice;
      }
      return apiPrice;
    },
    [shippingPrices, apiShippingPrices]
  );

  const fetchShippingMethods = useCallback(async () => {
    if (!carts.length || !provinceId || isFetchingRef.current) {
      return;
    }

    if (fetchedCarts.current.has(cartProvinceKey)) {
      return;
    }

    isFetchingRef.current = true;
    setIsUpdatingShipping(true);
    dispatch(setIsUpdatingShippingSlice(true));
    fetchedCarts.current.add(cartProvinceKey);

    try {
      const newShippingPrices: Record<
        number,
        { express: number; economical: number }
      > = {};
      const newAvailableShippings: Record<
        number,
        Array<"EXPRESS" | "ECONOMICAL">
      > = {};
      const newSelectedShipping: Record<number, ShippingMethodType> = {};

      const fetchPromises = carts.map(async (cart) => {
        try {
          const response: any = await getShippingMethods(cart.id, provinceId);

          const prices = {
            express: response?.expressPrice || 0,
            economical: response?.economicalPrice || 0,
          };

          newShippingPrices[cart.id] = prices;

          const availableMethods: Array<"EXPRESS" | "ECONOMICAL"> = [];
          if (response?.express || prices.express > 0)
            availableMethods.push("EXPRESS");
          if (response?.economical || prices.economical > 0)
            availableMethods.push("ECONOMICAL");

          newAvailableShippings[cart.id] = availableMethods;

          let preferredMethod: "EXPRESS" | "ECONOMICAL" | null = null;

          const isAddressChange =
            Object.keys(selectedShippingFromRedux).length === 0;

          const reduxSelected = selectedShippingFromRedux?.[cart.id];

          if (isAddressChange) {
            // Khi đổi địa chỉ, luôn reset về ECONOMICAL
            preferredMethod = availableMethods.includes("ECONOMICAL")
              ? "ECONOMICAL"
              : availableMethods.includes("EXPRESS")
              ? "EXPRESS"
              : null;
          } else {
            if (reduxSelected) {
              preferredMethod =
                reduxSelected.id === "express" ? "EXPRESS" : "ECONOMICAL";
            } else {
              const cartShippingMethod = sessionStorage.getItem(
                `cart_shipping_${cart.id}`
              );

              if (cartShippingMethod) {
                preferredMethod =
                  cartShippingMethod === "express" ? "EXPRESS" : "ECONOMICAL";
              } else {
                // Fallback về default logic
                preferredMethod =
                  provinceId === 50
                    ? availableMethods.includes("ECONOMICAL")
                      ? "ECONOMICAL"
                      : availableMethods.includes("EXPRESS")
                      ? "EXPRESS"
                      : null
                    : availableMethods.includes("ECONOMICAL")
                    ? "ECONOMICAL"
                    : null;
              }
            }
          }

          // Tạo shipping method object
          if (preferredMethod && availableMethods.includes(preferredMethod)) {
            const methodId =
              preferredMethod === "EXPRESS" ? "express" : "economical";
            const methodName =
              preferredMethod === "EXPRESS"
                ? "⚡ Giao hàng hoả tốc"
                : "🚚 Giao hàng tiết kiệm";
            const estimatedTime =
              preferredMethod === "EXPRESS" ? "1-2 ngày" : "3-5 ngày";

            newSelectedShipping[cart.id] = {
              id: methodId,
              name: methodName,
              price: getShippingPrice(cart.id, preferredMethod, {
                [cart.id]: prices,
              }),
              estimatedTime: estimatedTime,
            };

            // Khi đổi địa chỉ hoặc sử dụng sessionStorage, đánh dấu cần cập nhật Redux
            if (
              isAddressChange ||
              (!reduxSelected &&
                sessionStorage.getItem(`cart_shipping_${cart.id}`))
            ) {
              const reason = isAddressChange ? "đổi địa chỉ" : "sessionStorage";
              // Lưu thông tin để dispatch sau
              dispatch(
                setPaymentShippingMethod({
                  cartId: cart.id,
                  method: {
                    id: methodId,
                    name: methodName,
                    price: getShippingPrice(cart.id, preferredMethod, {
                      [cart.id]: prices,
                    }),
                    estimatedTime: estimatedTime,
                  },
                })
              );
            }
          } else if (availableMethods.length > 0) {
            // Fallback to first available method
            const fallbackMethod = availableMethods[0];
            newSelectedShipping[cart.id] = {
              id: fallbackMethod === "EXPRESS" ? "express" : "economical",
              name:
                fallbackMethod === "EXPRESS"
                  ? "⚡ Giao hàng hoả tốc"
                  : "🚚 Giao hàng tiết kiệm",
              price: getShippingPrice(cart.id, fallbackMethod, {
                [cart.id]: prices,
              }),
              estimatedTime:
                fallbackMethod === "EXPRESS" ? "1-2 ngày" : "3-5 ngày",
            };
          }

          return { cartId: cart.id, success: true };
        } catch (error) {
          console.error(`Error fetching shipping for cart ${cart.id}:`, error);
          return { cartId: cart.id, success: false };
        }
      });

      await Promise.all(fetchPromises);

      setShippingPrices((prev) => ({ ...prev, ...newShippingPrices }));
      setAvailableShippings((prev) => ({ ...prev, ...newAvailableShippings }));
      setSelectedShipping((prev) => ({ ...prev, ...newSelectedShipping }));
      setShippingMethodsLoaded((prev) => {
        const newStatus = { ...prev };
        carts.forEach((cart) => (newStatus[cart.id] = true));
        return newStatus;
      });
    } catch (error) {
      console.error("Error fetching shipping methods:", error);
      setError("Không thể tải phương thức vận chuyển");
      fetchedCarts.current.delete(cartProvinceKey);
    } finally {
      isFetchingRef.current = false;
      setIsUpdatingShipping(false);
      dispatch(setIsUpdatingShippingSlice(false));
    }
  }, [
    carts,
    provinceId,
    cartProvinceKey,
    getShippingPrice,
    selectedShippingFromRedux,
    dispatch,
  ]);

  useEffect(() => {
    if (!carts.length || !provinceId) return;
    const newKey = `${carts
      .map((c) => c.id)
      .sort()
      .join(",")}-${provinceId}`;

    if (!fetchedCarts.current.has(newKey)) {
      // Clear cache nếu province thay đổi
      const currentKeys = Array.from(fetchedCarts.current);
      const hasProvinceChange = currentKeys.some((key) => {
        const [, oldProvinceId] = key.split("-");
        return oldProvinceId !== provinceId.toString();
      });

      if (hasProvinceChange) {
        fetchedCarts.current.clear();
        setShippingPrices({});
        setAvailableShippings({});
        setSelectedShipping({});
        setShippingMethodsLoaded({});
        setDropdownOpen({});
      }

      setTimeout(() => {
        fetchShippingMethods();
      }, 0);
    }
  }, [carts, provinceId]);

  useEffect(() => {
    if (!carts.length) return;

    if (Object.keys(selectedShippingFromRedux).length === 0) {
      // Chỉ reset shipping-related state, không reset toàn bộ
      setSelectedShipping({});
      setShippingPrices({});
      setAvailableShippings({});
      setShippingMethodsLoaded({});
      setDropdownOpen({});
      fetchedCarts.current.clear();
      return;
    }

    const mapped: Record<number, ShippingMethodType> = {};
    let hasChanges = false;

    carts.forEach((cart: any) => {
      const m = selectedShippingFromRedux?.[cart.id];
      if (m) {
        const currentSelected = selectedShipping[cart.id];
        const newSelected: ShippingMethodType = {
          id: (m.id === "express" ? "express" : "economical") as
            | "express"
            | "economical",
          name: m.name,
          price: typeof m.price === "number" ? m.price : 0,
          estimatedTime: m.estimatedTime,
        };

        // Chỉ update nếu có thay đổi thực sự
        if (
          !currentSelected ||
          currentSelected.id !== newSelected.id ||
          currentSelected.price !== newSelected.price
        ) {
          mapped[cart.id] = newSelected;
          hasChanges = true;
        }
      }
    });

    if (hasChanges && Object.keys(mapped).length) {
      setSelectedShipping((prev) => ({ ...prev, ...mapped }));
    }
  }, [selectedShippingFromRedux, carts]);

  useEffect(() => {
    return () => {
      fetchedCarts.current.clear();
      isFetchingRef.current = false;
    };
  }, [carts]);

  // Removed sessionStorage synchronization; rely solely on persisted Redux state

  const handleShippingChange = useCallback(
    async (cartId: number, method: "EXPRESS" | "ECONOMICAL") => {
      const currentPrices = shippingPrices[cartId] || {};
      const finalPrice =
        method === "EXPRESS"
          ? currentPrices.express > 0
            ? currentPrices.express
            : apiShippingPrices[cartId] || 0
          : currentPrices.economical > 0
          ? currentPrices.economical
          : apiShippingPrices[cartId] || 0;

      const newShipping: ShippingMethodType = {
        id: method === "EXPRESS" ? "express" : "economical",
        name:
          method === "EXPRESS"
            ? "⚡ Giao hàng hoả tốc"
            : " 🚚 Giao hàng tiết kiệm",
        price: finalPrice,
        estimatedTime: method === "EXPRESS" ? "1-2 ngày" : "3-5 ngày",
      };
      // Dispatch to Redux immediately
      dispatch(setPaymentShippingMethod({ cartId, method: newShipping }));

      setSelectedShipping((prevSelected) => {
        const newShippings = {
          ...prevSelected,
          [cartId]: newShipping,
        };
        return newShippings;
      });

      setDropdownOpen((prev) => ({
        ...prev,
        [cartId]: false,
      }));
    },
    [shippingPrices, apiShippingPrices, dispatch]
  );

  const toggleDropdown = (cartId: number) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [cartId]: !prev[cartId],
    }));
  };

  const handleNoteChangeLocal = useCallback((cartId: number, note: string) => {
    setUserNotes((prev) => ({
      ...prev,
      [cartId]: note,
    }));
  }, []);

  const handleConfirmCheckout = useCallback(async () => {
    if (!carts.length) {
      toast.error("Giỏ hàng trống");
      return;
    }
    if (!addressId) {
      toast.error("Vui lòng chọn địa chỉ giao hàng");
      return;
    }
  
    const missingShipping = carts.filter((cart) => !selectedShipping[cart.id]?.id);
    if (missingShipping.length > 0) {
      toast.error("Vui lòng chọn phương thức vận chuyển cho tất cả giỏ hàng");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const payload: CheckoutConfirmPayload = {
        addressId,
        couponId: null,
        couponHathyoCode: selectedCouponCode || null,
        userNote: carts.map(cart => ({
          cartId: cart.id,
          userNote: userNotes[cart.id]?.trim() || "" 
        })),
        shippings: carts.map(cart => {
          const shippingMethod = selectedShipping[cart.id]?.id; 
          return {
            cartId: cart.id,
            shipping: (shippingMethod?.toUpperCase() as "EXPRESS" | "ECONOMICAL") || "ECONOMICAL"
          };
        })
      };

      const response = await confirmCheckoutAPI(payload);
  
      toast.success("Đặt hàng thành công");
      console.log("Confirm response:", response);
  
      router.push(`/payment-success?orderId=${response?.data?.orderId || response?.orderId || response?.id}`);
      
      // Nên reset Redux sau khi confirm thành công
      // dispatch(resetPaymentState());
  
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to confirm checkout");
    } finally {
      setLoading(false);
    }
  }, [carts, selectedShipping, userNotes, addressId, selectedCouponCode, provinceId, router, dispatch]);
  

  const displayData = previewCheckout;
  const isCheckoutLoading = useAppSelector(
    (state) => state.payment.isCheckoutLoading
  );

  if (loading && !displayData) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-4 text-center text-red-500">
        {error}
        <button
          onClick={() => {
            fetchedCarts.current.clear();
            fetchShippingMethods();
          }}
          className="block mx-auto mt-2 px-4 py-2 bg-primary text-white rounded-md text-sm"
        >
          Thử lại
        </button>
      </div>
    );
  }

  const renderShippingMethod = (cartId: number) => {
    if (!shippingMethodsLoaded[cartId] || isUpdatingShipping) {
      return (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-sm text-gray-600">
              {isUpdatingShipping
                ? "Đang cập nhật phương thức vận chuyển..."
                : "Đang kiểm tra phương thức vận chuyển..."}
            </span>
          </div>
        </div>
      );
    }

    if (
      !availableShippings[cartId] ||
      availableShippings[cartId].length === 0
    ) {
      return (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-red-600 text-sm">
            ❌ Không có phương thức vận chuyển khả dụng
          </div>
        </div>
      );
    }

    const availableShippingMethods: ShippingMethodType[] = [];
    const currentPrices = shippingPrices[cartId] || {
      express: 0,
      economical: 0,
    };

    if (availableShippings[cartId]?.includes("ECONOMICAL")) {
      const economicalPrice =
        currentPrices.economical > 0
          ? currentPrices.economical
          : apiShippingPrices[cartId] || 0;
      availableShippingMethods.push({
        id: "economical",
        name: "🚚 Giao hàng tiết kiệm",
        price: economicalPrice,
        estimatedTime: "3-5 ngày",
      });
    }

    if (availableShippings[cartId]?.includes("EXPRESS")) {
      const expressPrice =
        currentPrices.express && currentPrices.express > 0
          ? currentPrices.express
          : apiShippingPrices[cartId] || 0;
      availableShippingMethods.push({
        id: "express",
        name: "⚡ Giao hàng hoả tốc",
        price: expressPrice,
        estimatedTime: "1-2 ngày",
      });
    }

    const selectedMethod = selectedShipping[cartId];

    return (
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h3 className="font-semibold text-lg text-gray-800">
            Phương thức vận chuyển
          </h3>
        </div>

        {/* Dropdown Button */}
        <button
          type="button"
          onClick={() => toggleDropdown(cartId)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {selectedMethod ? (
                <div className="flex items-center justify-between">
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
                  <div className="text-sm text-blue-400">Xem tất cả</div>
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

        {/* Dropdown Menu */}
        {dropdownOpen[cartId] && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {availableShippingMethods.map((method) => {
              const isSelected = selectedMethod?.id === method.id;
              return (
                <div
                  key={method.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                    isSelected ? "bg-primary/10" : ""
                  }`}
                  onClick={() => {
                    handleShippingChange(
                      cartId,
                      method.id.toUpperCase() as "EXPRESS" | "ECONOMICAL"
                    );
                    setDropdownOpen((prev) => ({
                      ...prev,
                      [cartId]: false,
                    }));
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          isSelected ? " text-primary" : "text-gray-900"
                        }`}
                      >
                        {method.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-3 mt-1">
                        <span className="flex-1">
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
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2 ml-4">
                      {isSelected && (
                        <svg
                          className="w-5 h-5 text-primary"
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

  const canConfirm =
    carts.length > 0 && carts.every((c) => !!selectedShipping[c.id]?.id);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 space-y-6">
      <div className="grid grid-cols-[3fr_1fr_1fr_1fr] pb-2 items-center border-b  border-gray-500 ">
        <h2 className="text-lg font-bold text-gray-700">Thông tin đơn hàng</h2>
        <h2 className="text-sm font-bold text-gray-700 text-right">Đơn giá</h2>
        <h2 className="text-sm font-bold text-gray-700 text-center">
          Số lượng
        </h2>
        <h2 className="text-right text-sm font-bold text-gray-700">
          Thành tiền
        </h2>
      </div>
      {displayData?.carts?.map((cart: any) => (
        <div key={cart.id} className="space-y-4 border-b border-gray-200 pb-6">
          {/* Product Items */}
          <div key={cart.id} className="flex items-center gap-2 mb-3">
            <img
              src={cart.merchant.logo}
              alt={cart.merchant.storeName}
              className="w-8 h-8 object-cover rounded-full"
            />
            <span className="text-sm font-semibold text-gray-800">
              {cart.merchant.storeName}
            </span>
          </div>
          <div className="space-y-3">
            {map(cart.cartItems, (item, index) => (
              <ItemInformation key={index} item={item} />
            ))}
          </div>

          {/* Note + Shipping Info */}
          <div className="grid grid-cols-2 xl:grid-cols-2 gap-6 mb-8">
            {/* Note Column */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-600">
                Lời nhắn của Shop
              </label>
              <textarea
                placeholder="Để lại lời nhắn"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-1 focus:ring-primary"
                value={userNotes[cart.id] || ""}
                onChange={(e) => handleNoteChangeLocal(cart.id, e.target.value)}
              />
            </div>

            {/* Shipping Column */}
            <div className="flex flex-col">{renderShippingMethod(cart.id)}</div>
          </div>

          {/* Summary */}
          <div className="flex justify-end items-center gap-12">
            {cart.discountProductsPrice > 0 && (
              <div className="flex items-center gap-2">
                <span className="block text-base text-gray-700">
                  Khuyến mãi:{" "}
                </span>
                <span className="block text-lg text-Moss/500">
                  -{formatToCurrencyVND(cart.discountProductsPrice)}
                </span>
              </div>
            )}
            <div className="flex item-center gap-2">
              <span className="block text-base text-gray-700">
                Phí vận chuyển:
              </span>
              <span className="block text-base text-gray-700">
                {formatToCurrencyVND(selectedShipping[cart.id]?.price || 0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="block text-xl text-gray-700">Tổng tiền:</span>
              <span className="block text-xl text-Moss/500">
                {formatToCurrencyVND(cart.totalPrice)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderInformation;
