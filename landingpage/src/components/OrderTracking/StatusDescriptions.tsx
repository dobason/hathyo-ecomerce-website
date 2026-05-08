"use client";
import { Dispatch, memo, SetStateAction } from "react";
import Image from "next/image";
import HorizontalTimeline from "./HorizontalTimeline";

type Props = {
  orderStatus: string;
  setOrderStatus: Dispatch<
    SetStateAction<"order" | "confirm" | "packaging" | "shipping">
  >;
};

function StatusDescription({ orderStatus, setOrderStatus }: Props) {
  const getContent = () => {
    return (
      <Image
        src={
          orderStatus === "order"
            ? "/order_order.png"
            : orderStatus === "confirm"
            ? "/order_confirm.png"
            : orderStatus === "packaging"
            ? "/order_packaging.png"
            : "/order_shipping.png"
        }
        alt="status order"
        width={400}
        height={400}
      />
    );
  };

  const getMessage = () => {
    switch (orderStatus) {
      case "order":
        return "Đơn hàng đang chờ được xác nhận";
      case "confirm":
        return "Đơn hàng đang đã được xác nhận và trong quá trình đóng gói";
      case "packaging":
        return "Đơn hàng đang đã được đóng gói";
      case "shipping":
        return "Đơn hàng đang trên đường giao đến bạn";
      default:
        return "";
    }
  };

  return (
    <div className="grid">
      <div className="my-5 justify-center items-center">
        <div className="flex justify-center">{getContent()}</div>
        <div className="flex justify-center">
          <HorizontalTimeline
            orderStatus={orderStatus}
            setOrderStatus={setOrderStatus}
          />
        </div>
        <div className="mt-4 flex justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="text-gray-600 heading-3">{getMessage()}</div>
            <div className="text-gray-600 text-xl font-normal">
              Cảm ơn đã tin tưởng chúng tôi!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(StatusDescription);
