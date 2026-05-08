"use client";
import React from "react";
import Button from "@/components/Button";
import CheckList from "@/components/Icons/CheckList";
import Call from "@/components/Icons/Call";
import Location from "@/components/Icons/Location";

function OrderInformation() {
  return (
    <div className="w-2/3 flex flex-wrap justify-center items-center bg-white rounded-2xl my-3 p-4 shadow-Shadow/md">
      <div className="w-full pb-5 flex flex-row justify-between items-center border border-white border-b-gray-300">
        <div className="text-lg text-gray-600 font-bold">
          Thông tin đơn hàng
        </div>
        <Button type="warning" size="small">
          Chờ xác nhận
        </Button>
      </div>
      <div className="w-full py-5">
        <div className="flex flex-row flex-nowrap gap-2">
          <CheckList />
          <div className="text-base text-gray-600 font-medium">
            Mã đơn hàng:
          </div>
          <div className="text-base text-gray-400 font-normal">
            14-1614297498VK
          </div>
          <div className="text-base text-gray-400 font-normal">
            Đặt vào 25/02/2024 9:00:00
          </div>
        </div>
      </div>
      <div className="w-full py-5">
        <div className="flex flex-row flex-nowrap gap-2">
          <Call />
          <div className="text-base text-gray-600 font-medium">
            Số điện thoại:
          </div>
          <div className="text-base text-gray-400 font-normal">
            (+84) 765891281
          </div>
        </div>
      </div>
      <div className="w-full py-5">
        <div className="flex flex-row flex-nowrap gap-2">
          <Location />
          <div className="text-base text-gray-600 font-medium">Địa chỉ:</div>
          <div className="text-base text-gray-400 font-normal">
            01 Nguyễn Văn Linh, Nam Dương, Hải Châu, Đà Nẵng
          </div>
        </div>
      </div>
      <div className="w-full py-5">
        <div className="flex flex-row flex-nowrap gap-2">
          <Location />
          <div className="text-base text-gray-600 font-medium">
            Phương thức thanh toán:
          </div>
          <div className="text-base text-gray-400 font-normal">
            ATM Ngân hàng Ngoại thương - Vietcombank **** 3191
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderInformation;
