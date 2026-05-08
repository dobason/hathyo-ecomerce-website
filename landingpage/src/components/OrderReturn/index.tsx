"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import StatusOrder from "./StatusOrder";
import OrderInformation from "../OrderReturnInformation";

import { getListOrderReturnService } from "@/services/client/orders-return";
import { Order, OrdersResponse } from "@/types/order-return";

type OrderReturnStatus =
  | "PENDING"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"
  | "REJECTED"
  | "ACCEPTED"
  | "IN_REFUND"
  | "REFUNED";

export default function OrderReturn() {
  const [orderStatus, setOrderStatus] = useState<OrderReturnStatus>("PENDING");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = (await getListOrderReturnService({
        params: { page: 0, size: 100, status: orderStatus },
      })) as OrdersResponse;
      setOrders(res.orderReturns || []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách đơn hoàn:", err);
    } finally {
      setLoading(false);
    }
  }, [orderStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="container mx-auto px-4 flex flex-col gap-4">
      <StatusOrder orderStatus={orderStatus} setOrderStatus={setOrderStatus} />

      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Đang tải dữ liệu...
          </div>
        ) : orders.length > 0 ? (
          orders.map((order, idx) => (
            <OrderInformation
              key={`order-return-${idx}-${order.id}`}
              orderStatus={order.status}
              header={order.commentReturn}
              orderList={order.orderItems}
              item={order}
              refreshData={fetchOrders}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

const EmptyState = () => (
  <div className="bg-white rounded-2xl p-10 text-center shadow-md flex flex-col items-center justify-center gap-6">
    <Image
      src="/empty.svg"
      alt="Không có đơn hàng"
      width={128}
      height={128}
      className="mx-auto"
    />
    <div className="text-gray-600 text-lg font-semibold">Không có đơn hàng</div>
    <div className="text-gray-400 text-sm">
      Bạn chưa có đơn hoàn với trạng thái này
    </div>
  </div>
);
