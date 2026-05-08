"use client";
/* eslint-disable @next/next/no-img-element */

import { Fragment } from "react";
import { map, slice } from "lodash";
import classNames from "classnames";
import { toast } from "react-toastify";

import Item from "./Item";
import DiscountFill from "../Icons/DiscountFill";
import Button from "@/components/Button";

import { Order, OrderItem } from "@/types/order-return";
import { ORDER_STATUS } from "@/constants/order_return_status";
import { recieveOrderService } from "@/services/client/orders-return";

// Define status type
type OrderReturnStatus =
  | "PENDING"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"
  | "REJECTED"
  | "ACCEPTED"
  | "IN_REFUND"
  | "REFUNED";

type Props = {
  header: string;
  orderList: OrderItem[];
  footer?: React.ReactNode;
  orderStatus: OrderReturnStatus;
  item?: Order;
  refreshData: () => void;
};

export default function OrderInformation({
  header,
  orderList,
  footer,
  orderStatus,
  item,
  refreshData,
}: Props) {
  const statusColor: Record<OrderReturnStatus, string> = {
    PENDING: "text-blue-500",
    IN_TRANSIT: "text-yellow-500",
    DELIVERED: "text-green-500",
    CANCELLED: "text-red-500",
    REJECTED: "text-red-500",
    ACCEPTED: "text-blue-500",
    IN_REFUND: "text-orange-500",
    REFUNED: "text-green-600",
  };

  const renderOrderStatus = (status: OrderReturnStatus) => {
    const statusObj = ORDER_STATUS.find((s) => s.key === status);
    return (
      <div className={classNames("text-sm font-semibold", statusColor[status])}>
        {statusObj?.value}
      </div>
    );
  };

  const formatAddress = (
    address?: string,
    ward?: string,
    district?: string,
    province?: string
  ) => [address, ward, district, province].filter(Boolean).join(", ");

  const handleRefunded = async () => {
    try {
      const res = await recieveOrderService({ id: item?.id });
      if (res?.code && res?.message) {
        toast.error(res.message || "Xác nhận thất bại");
        return;
      }
      toast.success("Xác nhận thành công");
      refreshData();
    } catch (err) {
      console.error("Error:", err);
      toast.error("Đã xảy ra lỗi khi xác nhận");
    }
  };

  const acceptRefundedStatuses: OrderReturnStatus[] = ["IN_REFUND"];

  return (
    <Fragment>
      <div className="bg-white rounded-2xl shadow-md my-5 text-gray-800">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-base font-semibold truncate">{header}</h3>
          {renderOrderStatus(orderStatus)}
        </div>

        {/* Order Items */}
        <div className="divide-y">
          {map(slice(orderList, 0, 2), (orderItem, idx) => (
            <Item key={idx} item={orderItem} />
          ))}
        </div>

        {orderList.length > 2 && (
          <div className="p-3 border-t text-center text-sm text-gray-400">
            Xem thêm ({orderList.length - 2} sản phẩm)
          </div>
        )}

        {/* Refund Address */}
        <div className="p-4 border-t flex flex-col gap-2 md:flex-row md:justify-between md:items-center text-sm">
          <div className="flex items-center gap-2 w-full md:w-1/3">
            <DiscountFill />
            <span className="text-gray-700 font-medium truncate">
              {item?.returnName}
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-1 md:gap-2 text-gray-500 w-full md:w-2/3 justify-end">
            <span>Địa chỉ nhận hoàn:</span>
            <span className="font-semibold text-right">
              {formatAddress(
                item?.streetAddress,
                item?.ward,
                item?.district,
                item?.province
              )}
            </span>
          </div>
        </div>

        {/* Action */}
        {acceptRefundedStatuses.includes(orderStatus) && (
          <div className="p-4 flex justify-end">
            <Button
              size="small"
              type="primary-outlined"
              onClick={handleRefunded}
            >
              Đã nhận tiền
            </Button>
          </div>
        )}

        {/* Optional Footer */}
        {footer}
      </div>
    </Fragment>
  );
}
