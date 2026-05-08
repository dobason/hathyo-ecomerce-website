/* eslint-disable no-unused-vars */
"use client";
import { memo } from "react";
import ItemInformation from "./ItemInformation";
import { useAppSelector } from "@/store";
import ImageFallback from "@/components/ImageFallback";

type Props = {
  className?: string;
};

function ItemUnAvailable({ className = "" }: Props) {
  const carts = useAppSelector((state) => state.cart.carts);

  return (
    <div className={"bg-white rounded-2xl p-6 my-3 text-white " + className}>
      <div className="heading-3 text-Moss/700 mb-6">
        Danh sách sản phẩm hết hàng
      </div>
      <div className="border border-white border-b-Moss/200 py-2">
        {carts?.carts?.map((item, index) => (
          <div className="py-3 flex flex-col gap-2 divide-y" key={item.id}>
            <div className="flex justify-start items-center gap-3 text-base xl:pl-10 px-4">
              <div className="flex flex-row justify-start items-center">
                <div className="text-md p-2 flex items-center gap-2">
                  <ImageFallback
                    src={item.merchant?.logo}
                    alt="cart item"
                    width={64}
                    height={64}
                    errorImg="/product-fallback-image.png"
                    className="rounded-full h-6 w-6 border"
                  />
                  <div className="text-Moss/500 font-semibold">
                    {item.merchant.storeName}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <ItemInformation items={item.cartItemResponses} />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center text-base text-[#F04438] py-5">
        Xóa tất cả khỏi giỏ hàng
      </div>
    </div>
  );
}

export default memo(ItemUnAvailable);
