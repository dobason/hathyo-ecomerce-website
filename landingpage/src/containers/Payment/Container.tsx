"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import UserInformation from "./UserInformation";
import OrderInformation from "./OrderInformation";
import PaymentMethod from "./PaymentMethod";
import PaymentSuccess from "./PaymentSuccess";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchAddressItems } from "@/store/addressSlice";
import {
  resetAllShippingToEconomical,
  setPreviewCheckout,
  setIsCheckoutLoading,
  setIsAddressChanging,
  setIsUpdatingCoupon,
  setSelectedCouponCode,
  setIsUpdatingShipping,
  clearSelectedShippingMethods,
  setSelectedCouponId,
} from "@/store/paymentSlice";
import { getCheckoutInfo } from "@/services/client/checkout";
import { getCoupons } from "@/services/client/coupon";
import { ShoppingCart } from "@/types/checkout";
import { FiInfo } from "react-icons/fi";
import { TicketPercent } from "lucide-react";
import { number } from "yup";


type ShippingMethodType = {
  id: "express" | "economical";
  name: string;
  price: number;
  estimatedTime: string;
};

interface Coupon {
  id: number;
  code: string;
  title: string;
  description: string;
  discountType: "PERCENT" | "PRICE";
  discountValue: number;
  discountPercent: number;
  minimumPriceApply: number;
  maxDiscountPrice: number;
}

type ShippingItem = {
  cartId: number;
  shipping: "EXPRESS" | "ECONOMICAL";
}

type CheckoutInfo = {
  selectedShipping?: any;
  selectedCouponId?: number | null;
  selectedCouponCode?: string | null;
  addressId?: number | null;
}

export default function Container() {
  const addressSelected = useAppSelector(
    (state) => state.address.addressSelected
  );
  const cartsState = useAppSelector((state) => state.cart.carts);
  const selectedShippingMethods = useAppSelector(
    (state) => state.payment.selectedShippingMethods
  );

  const dispatch = useAppDispatch();
  const isPaymentSuccess = useAppSelector(
    (state) => state.payment.isPaymentSuccess
  );
  const previewCheckout = useAppSelector(
    (state) => state.payment.previewCheckout as ShoppingCart | undefined
  );
  const selectedCouponId = useAppSelector(
    (state) => state.payment.selectedCouponId || null
  );
  const selectedCouponCode = useAppSelector(
    (state) => state.payment.selectedCouponCode || null
  );
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [hoveredCouponId, setHoveredCouponId] = useState<number | null>(null);
  const isUpdatingShipping = useAppSelector(
    (state) => state.payment.isUpdatingShipping
  );
  const isUpdatingCoupon = useAppSelector(
    (state) => state.payment.isUpdatingCoupon
  );
  const isCheckoutLoading = useAppSelector(
    (state) => state.payment.isCheckoutLoading
  );
  const isAddressChanging = useAppSelector(
    (state) => state.payment.isAddressChanging
  );
  const [isAddressJustChanged, setIsAddressJustChanged] = useState(false);

  const isLoading = isUpdatingCoupon || isUpdatingShipping || isAddressChanging;
  const hasFetchedCheckout = useRef(false);
  const lastCheckoutParams = useRef<string>("");
  const previousAddressId = useRef<number | null>(null);
  const isInitialLoad = useRef(true);
  const isFetchingCheckout = useRef(false);
  const isAddressChangingRef = useRef(false);

  useEffect(() => {
    dispatch(fetchAddressItems());
  }, [dispatch]);

  // Default missing shippings to economical on entering payment
  useEffect(() => {
    const cartIds: number[] = cartsState?.carts?.map((c: any) => c.id) || [];
    if (!cartIds.length) return;
    const missing = cartIds.filter((id) => !selectedShippingMethods[id]);
    if (missing.length) {
      dispatch(resetAllShippingToEconomical(missing));
    }
  }, [cartsState?.carts, selectedShippingMethods, dispatch]);

  const handleCheckOutInfo = useCallback(async () => {
    if (!addressSelected?.id) return;

    if (isFetchingCheckout.current) {
      return;
    }

    // Tránh gọi API khi đang đổi địa chỉ hoặc chờ shipping update
    if (
      isAddressJustChanged ||
      isUpdatingShipping ||
      isAddressChangingRef.current
    ) {
      return;
    }

    const currentParams = JSON.stringify({
      addressId: addressSelected.id,
      couponId: selectedCouponId,
      couponCode: selectedCouponCode,
      shippingMethods: selectedShippingMethods,
    });

    const lastParams = lastCheckoutParams.current
      ? JSON.parse(lastCheckoutParams.current)
      : null;
    const isAddressChanged =
      lastParams && lastParams.addressId !== addressSelected.id;

    if (isAddressChanged) {
      lastCheckoutParams.current = "";
    }

    if (lastCheckoutParams.current === currentParams) {
      return;
    }

    try {
      // Always mark loading when starting preview fetch so button disables
      dispatch(setIsCheckoutLoading(true));
      // keep local calculation for isLoading; slice flag is separately set for button disabling
      // setIsCheckoutLoading(true); // no longer needed for UI since we read from slice
      isFetchingCheckout.current = true;

      // Ensure all carts have a shipping method before preview
      const allCartIds: number[] = (cartsState?.carts || []).map(
        (c: any) => c.id
      );
      const shippings = Object.entries(selectedShippingMethods)
        .filter(([cartId, method]) => method && method.id) // Lọc bỏ các method undefined hoặc không có id
        .map(([cartId, method]) => ({
          cartId: parseInt(cartId),
          shipping: method.id.toUpperCase() as "EXPRESS" | "ECONOMICAL",
        }));

      // Require full coverage of cartIds to avoid early preview with stale data
      if (shippings.length === 0 || shippings.length < allCartIds.length) {
        return;
      }

      const res = await getCheckoutInfo({
        body: {
          addressId: addressSelected.id,
          couponId: selectedCouponId,
          couponHathyoCode: selectedCouponCode,
          shippings,
        },
      });
      dispatch(setPreviewCheckout(res));
      lastCheckoutParams.current = currentParams;
    } catch (e) {
      console.error("Error when fetching checkout info", e);
    } finally {
      // local loading not needed; slice covers button disabling
      dispatch(setIsCheckoutLoading(false));
      dispatch(setIsUpdatingCoupon(false));
      isFetchingCheckout.current = false;
    }
  }, [
    addressSelected?.id,
    selectedCouponId,
    selectedCouponCode,
    selectedShippingMethods,
    dispatch,
    previewCheckout,
    isAddressJustChanged,
    isUpdatingShipping,
  ]);

  useEffect(() => {
    if (!addressSelected?.id) return;

    // First assignment: set ref and skip resetting shipping
    if (previousAddressId.current === null) {
      previousAddressId.current = addressSelected.id;
      return;
    }

    // Actual address change after initial load
    if (previousAddressId.current !== addressSelected.id) {
      previousAddressId.current = addressSelected.id;
      lastCheckoutParams.current = "";
      setIsAddressJustChanged(true);
      isAddressChangingRef.current = true;

      // reflect address changing via slice for button disabling
      dispatch(setIsAddressChanging(true));

      // mark shipping updating so preview waits until after shipping checks
      dispatch(setIsUpdatingShipping(true));
      // Clear previous selections and reset to ECONOMICAL synchronously
      dispatch(clearSelectedShippingMethods());
      const ids: number[] = (cartsState?.carts || []).map((c: any) => c.id);
      if (ids.length) {
        dispatch(resetAllShippingToEconomical(ids));
      }
    }
  }, [addressSelected?.id, dispatch, previewCheckout?.carts]);

  // Clear address-changing flags when shipping updates complete
  useEffect(() => {
    if (!isUpdatingShipping && isAddressChangingRef.current) {
      dispatch(setIsAddressChanging(false));
      setIsAddressJustChanged(false);
      isAddressChangingRef.current = false;
    }
  }, [isUpdatingShipping, dispatch]);

  // Gộp tất cả logic gọi API checkout info vào một useEffect duy nhất
  useEffect(() => {
    if (!addressSelected?.id) {
      return;
    }

    // Chỉ gọi API khi có shipping methods hoặc đang trong quá trình load
    if (
      Object.keys(selectedShippingMethods).length === 0 &&
      !isInitialLoad.current
    ) {
      return;
    }

    // Tránh gọi API khi đang thay đổi address hoặc đang chờ shipping update
    if (
      isAddressJustChanged ||
      isUpdatingShipping ||
      isAddressChangingRef.current
    ) {
      return;
    }

    // Tránh gọi API khi đang fetch
    if (isFetchingCheckout.current) {
      return;
    }

    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      handleCheckOutInfo();
      return;
    }

    // rely on selectedShippingMethods changes and flags instead of a separate shippingMethodChanged state

    if (
      !isAddressJustChanged &&
      !isUpdatingShipping &&
      !isAddressChangingRef.current
    ) {
      handleCheckOutInfo();
    }
  }, [
    addressSelected?.id,
    selectedCouponId,
    selectedCouponCode,
    selectedShippingMethods,
    isAddressJustChanged,
    isUpdatingShipping,
  ]);

  useEffect(() => {
    if (isUpdatingShipping && Object.keys(selectedShippingMethods).length > 0) {
      dispatch(setIsUpdatingShipping(false));
      handleCheckOutInfo();
    }
  }, [selectedShippingMethods, isUpdatingShipping, handleCheckOutInfo]);

  useEffect(() => {
    if (
      isAddressChangingRef.current &&
      Object.keys(selectedShippingMethods).length > 0
    ) {
      return;
    }
  }, [selectedShippingMethods]);

  useEffect(() => {
    return () => {
      hasFetchedCheckout.current = false;
      lastCheckoutParams.current = "";
      previousAddressId.current = null;
      isInitialLoad.current = true;
      isFetchingCheckout.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        dispatch(setIsUpdatingCoupon(true));
        const res = await getCoupons({
          params: { page: 0, size: 100, type: "HATHYO" },
        });
        const coupons = res?.coupons || [];
        const mapped = coupons.map((item: any) => ({
          id: item.id,
          code: item.code,
          title: item.title,
          description: item.description,
          discountType: item.discountType,
          discountValue: item.discountValue,
          discountPercent: item.discountPercent,
          minimumPriceApply: item.minimumPriceApply,
          maxDiscountPrice: item.maxDiscountPrice,
        }));
        setAvailableCoupons(mapped);
      } catch (e) {
        console.error("Lỗi khi tải coupon:", e);
      } finally {
        dispatch(setIsUpdatingCoupon(false));
      }
    };
    fetchCoupons();
  }, []);

  // user notes handled within OrderInformation; no local state needed here

  const handleSelectCoupon = (coupon: Coupon) => {
    const isSelected = selectedCouponId === coupon.id;
    dispatch(setIsUpdatingCoupon(true));
    const nextCode = isSelected ? null : coupon.code;
    const nextId = isSelected ? null : coupon.id;

    dispatch(setSelectedCouponCode(nextCode));
    dispatch(setSelectedCouponId(nextId));
  };

  return (
    <main>
      {isPaymentSuccess ? (
        <PaymentSuccess />
      ) : isLoading && !previewCheckout ? (
        <div className="flex justify-center items-center py-20">
          <Image
            src="/images/loading/spin.svg"
            alt="Đang tải..."
            width={40}
            height={40}
            className="animate-spin"
          />
        </div>
      ) : (
        <div className="container mx-auto space-y-6 px-4 lg:px-0 xl:py-8 py-4">
          {(isAddressChanging || isUpdatingShipping || isCheckoutLoading) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="text-sm text-blue-700">
                  {isAddressChanging
                    ? "Đang cập nhật thông tin vận chuyển cho địa chỉ mới..."
                    : "Đang cập nhật phí vận chuyển..."}
                </span>
              </div>
            </div>
          )}

          <UserInformation className="shadow-Shadow/md" />
          {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
              <Image
                src="/images/loading/spin.svg"
                alt="Đang tải..."
                width={40}
                height={40}
                className="animate-spin"
              />
            </div>
          )}
          {/* Coupon Section */}
          {availableCoupons.length > 0 && (
            <section className="bg-white p-4 rounded-2xl shadow">
              <div className="flex item-center gap-2 text-base text-Grayiron/600 font-normal">
                <TicketPercent className="w-6 h-6 text-green-900" />
                <h3 className="font-bold mb-4 text-gray-700 text-lg">
                  Hathyo voucher
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {availableCoupons.map((coupon: Coupon) => {
                  const isSelected = selectedCouponId === coupon.id;
                  return (
                    <div
                      key={coupon.id}
                      onClick={() => handleSelectCoupon(coupon)}
                      className={`relative cursor-pointer transition text-sm shadow-sm hover:shadow-md rounded-lg border ${
                        isSelected
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex">
                        <div className="bg-orange-500 text-white text-xs font-bold flex flex-col items-center justify-center px-2 w-12 relative">
                          <div>GIẢM</div>
                          <div>
                            {coupon.discountType === "PERCENT"
                              ? `${coupon.discountPercent}%`
                              : `${coupon.discountValue.toLocaleString()}đ`}
                          </div>
                          <div className="absolute top-0 left-0 w-full h-2 rounded-b-full bg-white"></div>
                          <div className="absolute bottom-0 left-0 w-full h-2 rounded-t-full bg-white"></div>
                        </div>
                        <div className="flex-1 p-3">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold text-sm text-gray-800">
                              {coupon.title}
                            </div>
                            <div
                              onMouseEnter={() => setHoveredCouponId(coupon.id)}
                              onMouseLeave={() => setHoveredCouponId(null)}
                              className="text-gray-400 relative"
                            >
                              <FiInfo className="w-4 h-4" />
                              {hoveredCouponId === coupon.id && (
                                <div className="absolute z-10 top-full mt-2 left-1/2 -translate-x-1/2 bg-white border rounded shadow p-2 text-xs text-gray-700 min-w-48">
                                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t rotate-45 border-gray-200"></div>
                                  {coupon.description || "Không có mô tả"}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Áp dụng từ{" "}
                            {coupon.minimumPriceApply.toLocaleString()}đ, tối đa{" "}
                            {coupon.maxDiscountPrice.toLocaleString()}đ
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <OrderInformation />

          <PaymentMethod className="shadow-Shadow/md" />
        </div>
      )}
    </main>
  );
}
