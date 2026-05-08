"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

import StatusOrder from "./StatusOrder";
import OrderInformation from "../OrderInformation";

import { getListOrdersService } from "@/services/client/orders";
import { Order, OrdersResponse } from "@/types/orders";

type OrderStatus = "PENDING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";

const OrderHistory = () => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("PENDING");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = (await getListOrdersService({
        params: { page: 0, size: 100, status: orderStatus },
      })) as OrdersResponse;
      setOrders(res.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  }, [orderStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="container mx-auto px-4">
      {/* Tabs for status */}
      <StatusOrder orderStatus={orderStatus} setOrderStatus={setOrderStatus} />

      <div className="flex flex-col gap-4 mt-4">
        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Đang tải đơn hàng...
          </div>
        ) : orders.length > 0 ? (
          orders.map((order, idx) => (
            <OrderInformation
              key={`order-${idx}-${order.id}`}
              orderStatus={order.status}
              header={order.orderCode}
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
};

const EmptyState = () => (
  <div className="bg-white rounded-2xl p-10 text-center shadow-md">
    <Image
      src="/empty.svg"
      alt="No orders"
      height={128}
      width={128}
      className="mx-auto mb-6"
    />
    <p className="text-gray-600 text-lg font-semibold">Không có đơn hàng</p>
    <p className="text-gray-400 text-sm mt-2">
      Bạn chưa có đơn hàng nào với trạng thái này
    </p>
  </div>
);

export default OrderHistory;
