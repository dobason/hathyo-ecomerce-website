"use client";

import Image from "next/image";
import { formatToCurrencyVND } from "@/utils/commonHelper";
import { OrderItem } from "@/types/orders";
import Edit from "@/components/Icons/Edit";
import Rating from "@/components/Rating";

type Props = {
  item: OrderItem;
  onRating: (item: OrderItem) => void;
  orderStatus: string;
};

export default function Item({ item, onRating, orderStatus }: Props) {
  const renderRating = () => {
    if (orderStatus !== "DELIVERED" && orderStatus !== "RECEIVED") return null;

    if (item.rated) {
      return (
        <>
          <div className="flex text-yellow-400">
            <Rating
              className="justify-center xl:justify-start"
              size="small"
              value={5}
            />
          </div>
          <span className="text-xs text-orange-600 font-medium ml-2">
            Đã đánh giá
          </span>
        </>
      );
    }

    return (
      <button
        onClick={() => onRating(item)}
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 ml-2"
      >
        <Edit className="w-4 h-4" />
        <span>Viết đánh giá</span>
      </button>
    );
  };
  console.log("Product image URL:", item.productVariantImage);

  return (
    <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 py-4 border-b last:border-none">
      {/* Left: Image & Info */}
      <div className="flex flex-1 items-start gap-4 w-full min-w-0">
        <a
          href={`/product/${item.productId}`}
          target="_blank"
          className="flex items-start gap-4"
        >
          {item.productVariantImage ? (
            <Image
              src={item.productVariantImage}
              alt="product"
              width={64}
              height={64}
              className="object-cover rounded"
            />
          ) : null}
        </a>

        <div className="flex flex-col gap-1 min-w-0">
          <a href={`/product/${item.productId}`} target="_blank">
            <p className="text-sm font-semibold text-gray-700 line-clamp-2">
              {item.productVariantTitle}
            </p>
          </a>

          {item.returned && (
            <p className="text-xs italic text-red-600">Đã yêu cầu hoàn trả</p>
          )}

          {renderRating()}
        </div>
      </div>

      {/* Right: Pricing Info */}
      <div className="flex flex-col xl:flex-row gap-2 xl:gap-4 justify-end items-end text-sm text-gray-600 w-full xl:w-7/12">
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
