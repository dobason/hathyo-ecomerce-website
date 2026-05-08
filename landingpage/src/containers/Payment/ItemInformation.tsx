"use client";

import { memo } from "react";
import classNames from "classnames";
import ImageFallback from "@/components/ImageFallback";
import { CartItem } from "@/types/checkout";
import { formatToCurrencyVND } from "@/utils/commonHelper";

type Props = {
  item: CartItem;
};

function ItemInformation({ item }: Props) {
  return (
    <div className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center py-3 xl:flex-row xl:items-center border-b border-gray-100">
      {/* Product Info */}
      <div className="flex item-center gap-x-3">
        <ImageFallback
          src={item?.variant?.imageUrl}
          alt="cart item"
          width={64}
          height={64}
          className="rounded-lg w-12 h-12 object-cover flex-shrink-0"
        />
        <div className="flex items-center min-w-0">
          <div
            className={classNames(
              "text-sm text-gray-600",
              "truncate xl:line-clamp-2"
            )}
            title={item.variant?.title}
          >
            {item.variant?.title}
          </div>
        </div>
      </div>

      {/* Pricing Info */}
      <div className="text-right">{formatToCurrencyVND(item.productPrice)}</div>
      <div className="text-center">{item.quantity}</div>
      <div className="text-right block text-lg text-Moss/500">{formatToCurrencyVND(item.productPrice * item.quantity)}</div>
    </div>
  );
}

export default memo(ItemInformation);
