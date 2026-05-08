"use client";
import React from "react";
import Image from "next/image";
import Bag from "@/components/Icons/Bag";
import Button from "@/components/Button";
import UndoSquare from "@/components/Icons/UndoSquare";
import { useRouter, useSearchParams } from "next/navigation";
import OrderInformation from "@/containers/Payment/PaymentSuccess/OrderInformation";

function PaymentSuccess() {
  const router = useRouter();
  return (
    <div className="grid">
      <div className="my-5 justify-center items-center">
        <div className="flex justify-center">
          <Image
            src="/congratulation.png"
            alt="logo"
            width={200}
            height={200}
          />
        </div>
        <div className="py-5 flex flex-col gap-2 items-center">
          <div className="text-3xl text-gray-600">Đã đặt hàng thành công</div>
          <div className="text-xl text-gray-600 font-normal">
            Cảm ơn đã tin tưởng chúng tôi!
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center items-center">
        <OrderInformation />
      </div> */}
      <div className="my-5 flex justify-center items-center gap-4">
        <Button type="warning" onClick={() => router.push(`/`)}>
          <div className="flex justify-center items-center gap-2">
            <UndoSquare />
            <span>Quay lại trang chủ</span>
          </div>
        </Button>
        <Button
          type="primary"
          onClick={() => router.push(`/profile?tab=Order-History`)}
        >
          <div className="flex justify-center items-center gap-2">
            <Bag />
            <span>Theo dõi đơn hàng</span>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
