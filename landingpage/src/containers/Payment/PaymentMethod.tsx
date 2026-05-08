/* eslint-disable @next/next/no-img-element */
"use client";

import { toast } from "react-toastify";
import { memo, useState } from "react";
import Button from "@/components/Button";
import { handleCheckout } from "@/services/client/checkout";
import { formatToCurrencyVND } from "@/utils/commonHelper";
import { useAppSelector, useAppDispatch } from "@/store";
import Link from "next/link";
import { fetchCartItems } from "@/store/cartSlice";
import { Note } from "@/types/checkout";
import { setIsPaymentSuccess } from "@/store/paymentSlice";

type Props = {
  className?: string;
};

function PaymentMethod({ className = "" }: Props) {
  const dispatch = useAppDispatch();
  const addressSelected = useAppSelector(
    (state) => state.address.addressSelected
  );
  const previewCheckout = useAppSelector(
    (state) => state.payment.previewCheckout
  );
  const selectedCouponCode = useAppSelector(
    (state) => state.payment.selectedCouponCode || null
  );
  const selectedCouponId = useAppSelector(
    (state) => state.payment.selectedCouponId || null
  );
  const isCheckoutLoading = useAppSelector(
    (state) => state.payment.isCheckoutLoading
  );
  const isAddressChanging = useAppSelector(
    (state) => state.payment.isAddressChanging
  );
  const isUpdatingShipping = useAppSelector(
    (state) => state.payment.isUpdatingShipping
  );
  const isUpdatingCoupon = useAppSelector(
    (state) => state.payment.isUpdatingCoupon
  );
  const userNote = useAppSelector((state) => state.payment.userNotes as Note[]);
  const selectedShippingMethods = useAppSelector(
    (state) => state.payment.selectedShippingMethods || {}
  );

  const [paymentMethod, setPaymentMethod] = useState<null | "ATM" | "COD">(
    "COD"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setPaymentMethod(name as "ATM" | "COD");
  };

  const onSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      let shippings: any = {};
      shippings = [...Object.keys(selectedShippingMethods as any)].map(cartId => ({
        cartId: Number(cartId),
          shipping:
            selectedShippingMethods[Number(cartId)]?.id == "express"
              ? "EXPRESS"
              : "ECONOMICAL",
      }));
      const response = await handleCheckout({
        body: {
          addressId: addressSelected?.id,
          userNote,
          couponId: selectedCouponId,
          couponHathyoCode: selectedCouponCode || null,
          shippings: shippings
        },
      });
      if (response) {
        if (response?.code || response?.status == 500) {
          toast.error("Có lỗi xảy ra trong quá trình mua hàng");
        } else {
          dispatch(fetchCartItems());
          toast.success("Đặt hàng thành công");
          dispatch(setIsPaymentSuccess(true));
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra trong quá trình đặt hàng");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={"bg-white rounded-2xl my-3 p-6  text-white " + className}>
      <div className="flex xl:gap-24 xl:flex-row flex-col xl:justify-between border border-white border-b-gray-200">
        <div className="xl:w-7/12 p-3">
          <div className="flex xl:flex-row flex-col xl:justify-start xl:items-center gap-4 xl:gap-8 py-4">
            <div className="text-lg text-gray-600 font-bold">
              Phương thức thanh toán
            </div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className={
                  "w-5 h-5 text-Moss/600 accent-Moss/700 bg-gray-100 border-text-black-tertiary rounded-md focus:ring-Moss/500 focus:ring-2"
                }
                name="COD"
                checked={paymentMethod === "COD"}
                onChange={onChange}
              />
              <span className="ml-2 text-base text-gray-600">
                Thanh toán nhận hàng (COD)
              </span>
            </label>
          </div>
          <div className="flex justify-start py-4">
            <div className="text-md text-gray-400">
              Hathyo cam kết bảo mật thông tin thanh toán của bạn và chỉ chia
              thông tin thẻ tín dụng của bạn với các nhà cung cấp dịch vụ thanh
              toán của chúng tôi, những người đã đồng ý bảo vệ thông tin của
              bạn.
            </div>
          </div>
        </div>
        <div className="xl:w-5/12 flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <div className="text-base text-gray-600">Tổng tiền sản phẩm:</div>
            <div className="text-base text-gray-600">
              {formatToCurrencyVND(previewCheckout?.totalProductsPrice)}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-base text-gray-600">Phí vận chuyển:</div>
            <div className="text-base text-gray-600">
              {formatToCurrencyVND(previewCheckout?.shippingPrice)}
            </div>
          </div>
          {previewCheckout?.discountProductsPrice &&
            previewCheckout.discountProductsPrice > 0 && (
              <div className="flex flex-row justify-between">
                <span className="text-base text-gray-600">Khuyến mãi:</span>
                <span className="text-base text-gray-600 font-medium">
                  -{formatToCurrencyVND(previewCheckout.discountProductsPrice)}
                </span>
              </div>
            )}
          <div className="flex flex-row justify-between">
            <div className="text-base text-[#FDB022]">Tổng thanh toán:</div>
            <div className="text-base text-Moss/400">
              {formatToCurrencyVND(previewCheckout?.totalPrice)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex xl:flex-row flex-col gap-2 justify-between pt-6">
        <div className="flex xl:flex-row flex-col gap-2">
          <div className="text-base text-gray-400">
            Nhấn đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo
          </div>
          <Link href="/terms/terms-of-use">
            <div className="text-base text-[#528BFF]">
              Điều khoản của chúng tôi
            </div>
          </Link>
        </div>
        <Button
          className="w-full xl:w-fit"
          type="primary"
          onClick={onSubmit}
          disabled={
            isSubmitting ||
            isCheckoutLoading ||
            isAddressChanging ||
            isUpdatingShipping ||
            isUpdatingCoupon
          }
          loading={
            isSubmitting ||
            isCheckoutLoading ||
            isAddressChanging ||
            isUpdatingShipping ||
            isUpdatingCoupon
          }
        >
          Đặt hàng 
        </Button>
      </div>
    </div>
  );
}

export default memo(PaymentMethod);
