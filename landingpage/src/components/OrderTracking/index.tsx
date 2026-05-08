"use client";
import { useState } from "react";
import StatusDescriptions from "./StatusDescriptions";
import cartItem from "@/utils/cartItem.json";
import Tracking from "./Tracking";
import OrderInformation from "../OrderInformation";
import { Order, OrderItem } from "@/types/orders";

const orderItems: OrderItem[] = [
  {
    id: 2,
    orderId: 2,
    productId: 59,
    productTitle:
      "DÂY TẬP GYM, TẬP MÔNG MINI BAND GOOD FIT GF913MB - HỒNG (3-6LB)",
    productVariantTitle:
      "DÂY TẬP GYM, TẬP MÔNG MINI BAND GOOD FIT GF913MB - HỒNG (3-6LB)",
    productVariantImage:
      "https://d134sx875xrex2.cloudfront.net/LUu7UcLxim_hong1.png",
    skuCode: "59rJVvglEt",
    productPrice: 9000,
    discountProductPrice: 6000,
    totalPrice: 9000,
    quantity: 1,
    createdAt: "2025-02-04T14:07:26.235513Z",
    deliveredAt: "2025-02-04T14:07:26.235522Z",
    chooseReturn: false,
    returned: false,
    rated: false,
  },
  {
    id: 1,
    orderId: 1,
    productId: 27,
    productTitle: "THẢM TẬP YOGA ĐỊNH TUYẾN FED FED-YG-01 - ĐEN",
    productVariantTitle: "THẢM TẬP YOGA ĐỊNH TUYẾN FED FED-YG-01 - ĐEN",
    productVariantImage:
      "https://d134sx875xrex2.cloudfront.net/SDuR4HqlRy_tham-tap-yoga-fed-8.jpg",
    skuCode: "27RRc4KmKa",
    productPrice: 690000,
    discountProductPrice: 0,
    totalPrice: 1380000,
    quantity: 2,
    createdAt: "2025-02-04T13:37:08.878921Z",
    deliveredAt: "2025-02-04T13:37:08.878939Z",
    chooseReturn: false,
    returned: false,
    rated: false,
  },
];

function OrderTracking() {
  const [orderStatus, setOrderStatus] = useState<
    "order" | "confirm" | "packaging" | "shipping"
  >("packaging");

  return (
    <div className="container m-auto">
      <StatusDescriptions
        orderStatus={orderStatus}
        setOrderStatus={setOrderStatus}
      />
      <Tracking orderStatus={orderStatus} />
      <OrderInformation
        header="Thông tin đơn hàng"
        orderList={orderItems}
        orderStatus={orderStatus}
        refreshData={() => {}}
      />
    </div>
  );
}
export default OrderTracking;
