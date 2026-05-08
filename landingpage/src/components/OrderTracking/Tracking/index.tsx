"use client";
import { memo } from "react";
import Button from "@/components/Button";
import User from "./User";
import Process from "./Process";

type Props = {
  orderStatus: string;
};

function Tracking({ orderStatus }: Props) {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex justify-start gap-8">
          <div className="flex text-base font-bold gap-2">
            <div className="text-gray-500">Đặt ngày:</div>
            <div className="text-blue-500">25/02/2024</div>
          </div>
          {orderStatus === "shipping" && (
            <div className="flex text-base font-bold gap-2">
              <div className="text-gray-500">Ngày nhận dự kiến:</div>
              <div className="text-blue-500">07/03/2024</div>
            </div>
          )}
        </div>
        {orderStatus === "shipping" ? (
          <div className="flex justify-end gap-4">
            <Button type="warning">Trả hàng</Button>
            <Button type="primary">Đã nhận hàng</Button>
          </div>
        ) : (
          <div className="flex justify-end gap-4">
            <Button type="warning">Hủy đơn</Button>
          </div>
        )}
      </div>
      <div className="flex xl:flex-row flex-col justify-center gap-4">
        {["order", "confirm"].includes(orderStatus) ? (
          <div className="w-full">
            <User orderStatus={orderStatus} />
          </div>
        ) : (
          <>
            <div className="xl:w-[500px] w-[calc(100%-48px)] min-h-48">
              <User orderStatus={orderStatus} />
            </div>
            <div className="xl:w-[calc(100%-480px] w-full">
              <Process orderStatus={orderStatus} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default memo(Tracking);
