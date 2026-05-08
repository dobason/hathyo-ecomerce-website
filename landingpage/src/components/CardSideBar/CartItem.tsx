"use client";

import React, { memo } from "react";
import ImageFallback from "@/components/ImageFallback";
import { CartType, UserCartItemResponse } from "@/types/cart-item";
import { formatToCurrencyVND } from "@/utils/commonHelper";

type Props = {
  item: CartType;
};

const Item: React.FC<Props> = ({ item }) => {
  return (
    <div className="flex flex-col divide-y divide-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
      {/* Merchant Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b">
        <ImageFallback
          src={item.merchant?.logo}
          alt="merchant-logo"
          width={24}
          height={24}
          errorImg="/product-fallback-image.png"
          className="w-6 h-6 rounded-full border object-cover"
        />
        <span className="text-sm font-semibold text-gray-800 truncate">
          {item.merchant.storeName}
        </span>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-3 p-4">
        {item.cartItemResponses?.map(
          (cartItem: UserCartItemResponse, idx: number) => (
            <div
              key={`${cartItem.id}-${idx}`}
              className="flex gap-4 items-center"
            >
              {/* Product Image */}
              <ImageFallback
                src={cartItem.product?.imageUrl}
                alt="product"
                width={60}
                height={60}
                errorImg="/product-fallback-image.png"
                className="w-16 h-16 rounded-md bg-gray-100 object-cover shrink-0"
              />

              {/* Product Info */}
              <div className="flex flex-col flex-1 min-w-0 gap-1">
                <div className="text-sm font-medium text-gray-900 line-clamp-2">
                  {cartItem.product?.title}
                </div>
                <div className="text-xs text-gray-500">
                  SL: {cartItem.quantity}
                </div>
              </div>

              {/* Price */}
              <div className="text-sm font-bold text-Moss/600 whitespace-nowrap">
                {formatToCurrencyVND(cartItem.product.price)}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default memo(Item);
