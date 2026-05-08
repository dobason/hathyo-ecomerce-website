"use client";

import Image from "next/image";
import { formatToCurrencyVND } from "@/utils/commonHelper";
import { OrderItem } from "@/types/order-return";

type Props = {
  item: OrderItem;
};

export default function Item({ item }: Props) {
  return (
    <div className="py-4 px-2 flex flex-col xl:flex-row xl:items-center border-b last:border-0 gap-4">
      {/* Left: Image & Title */}
      <div className="flex flex-1 items-start gap-4 w-full min-w-0">
        <Image
          src={item.productVariantImage ?? "/logo_icon.svg"}
          alt="product"
          width={64}
          height={64}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-sm font-semibold text-gray-700 line-clamp-2">
            {item.productVariantTitle}
          </p>
          {item.returned && (
            <p className="text-xs italic text-red-600">Đã yêu cầu hoàn trả</p>
          )}
        </div>
      </div>

      {/* Right: Pricing Info */}
      <div className="flex flex-col xl:flex-row justify-between items-end xl:items-center text-sm text-gray-600 w-full xl:w-7/12 gap-2 xl:gap-4">
        <div className="xl:w-1/3 text-right w-full">
          {formatToCurrencyVND(item.productPrice)}
        </div>
        <div className="xl:w-1/3 text-center w-full">SL: {item.quantity}</div>
        <div className="xl:w-1/3 text-right w-full text-Moss/500 font-semibold">
          {formatToCurrencyVND(item.totalPrice)}
        </div>
      </div>
    </div>
  );
}
