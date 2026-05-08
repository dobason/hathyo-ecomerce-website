/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";

import { memo } from "react";
import ImageFallback from "@/components/ImageFallback";
import QuantityControl from "@/components/QuantifyControl";
import CloseCircle from "@/components/Icons/CloseCircle";
import { useAppDispatch } from "@/store";
import {
  removeCartItem,
  updateCartItem,
  updateIsChooseByItem,
} from "@/store/cartSlice";
import { formatToCurrencyVND } from "@/utils/commonHelper";
import { UserCartItemResponse } from "@/types/cart-item";

type Props = {
  items: UserCartItemResponse[];
};

function ItemInformation({ items }: Props) {
  const dispatch = useAppDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeCartItem({ id }));
  };

  const handleQuantityChange = (
    item: UserCartItemResponse,
    newQuantity: number
  ) => {
    dispatch(
      updateCartItem({
        cartItemId: item.id,
        quantity: newQuantity,
        mainAttributeId: item.variants?.[0]?.attributeId,
        mainAttributeValueId: item.variants?.[0]?.variantId,
        secondAttributeId: item.variants?.[1]?.attributeId,
        secondAttributeValueId: item.variants?.[1]?.variantId,
      })
    );
  };

  const handleChoose = (id: number, choose: boolean) => {
    dispatch(updateIsChooseByItem({ id, choose }));
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col xl:flex-row gap-4 py-4 border-b"
        >
          {/* Left - Product Info */}
          <div className="w-full pl-4 xl:pl-6 xl:w-1/2 flex items-start gap-3">
            <input
              type="checkbox"
              checked={item.choose}
              onChange={() => handleChoose(item.id, !item.choose)}
              className="mt-2 h-5 w-5 appearance-none rounded border border-gray-300 checked:bg-Moss/500 checked:border-Moss/500 focus:ring-2 focus:ring-Moss/200 cursor-pointer"
            />

            <ImageFallback
              src={item.product?.imageUrl}
              alt="product"
              width={80}
              height={80}
              errorImg="/product-fallback-image.png"
              className="w-10 h-10 xl:w-20 xl:h-20 rounded border object-cover"
            />

            <div className="flex-1 text-sm xl:text-base text-Grayiron/600 space-y-2">
              {/* Product Title */}
              <div className="line-clamp-2 font-medium">
                {item.product?.title}
              </div>

              {/* Variants */}
              {item.variants?.length > 0 && (
                <div className="text-xs flex flex-wrap gap-2">
                  {item.variants.filter(Boolean).map((v, i) => (
                    <span key={i}>
                      {v?.attributeName ?? "Không rõ"} -{" "}
                      {v?.variantName ?? "Không rõ"}
                    </span>
                  ))}
                </div>
              )}

              {/* Mobile Price + Quantity */}
              <div className="xl:hidden flex flex-col gap-1">
                <div className="text-sm">
                  <span className="line-through text-Grayiron/400 mr-1">
                    {formatToCurrencyVND(item.product?.anchoPrice)}
                  </span>
                  <span className="text-Moss/500">
                    {formatToCurrencyVND(item.product?.price)}
                  </span>
                </div>
                <QuantityControl
                  initQuantity={item.quantity}
                  onChangeQuantity={(val) => handleQuantityChange(item, val)}
                />
              </div>
            </div>

            {/* Remove button (Mobile only) */}
            <div
              className="xl:hidden cursor-pointer text-gray-500"
              onClick={() => handleRemove(item.id)}
            >
              <CloseCircle />
            </div>
          </div>

          {/* Right - Desktop only controls */}
          <div className="hidden xl:flex w-1/2 justify-between items-center text-base text-gray-700 gap-x-4">
            <div className="w-1/4 flex justify-center items-center">
              {formatToCurrencyVND(item.product?.price)}
            </div>
            <div className="w-1/4 flex justify-center items-center">
              <QuantityControl
                initQuantity={item.quantity}
                onChangeQuantity={(val) => handleQuantityChange(item, val)}
              />
            </div>
            <div className="w-1/4 flex justify-center items-center text-Moss/500 font-semibold">
              {formatToCurrencyVND(item.quantity * item.product?.price)}
            </div>
            <div
              className="w-1/4 flex justify-center items-center cursor-pointer"
              onClick={() => handleRemove(item.id)}
            >
              <CloseCircle />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default memo(ItemInformation);
