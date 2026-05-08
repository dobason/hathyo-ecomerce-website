"use client";

import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import CurrentCheck from "../Icons/CurrentCheck";
import { ORDER_STATUS } from "@/constants/order_return_status";

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
  orderStatus: OrderReturnStatus;
  setOrderStatus: Dispatch<SetStateAction<OrderReturnStatus>>;
};

export default function StatusOrder({ orderStatus, setOrderStatus }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="flex flex-wrap gap-3 items-center">
        {ORDER_STATUS.map(({ key, value }) => {
          const isActive = orderStatus === key;

          return (
            <div
              key={key}
              onClick={() => setOrderStatus(key as OrderReturnStatus)}
              className={classNames(
                "relative px-3 py-2 rounded-lg text-sm font-medium border cursor-pointer transition-all duration-200",
                {
                  "bg-Moss/50 text-Moss/500 border-Moss/500": isActive,
                  "text-gray-500 hover:border-Moss/400 border border-gray-200 bg-white":
                    !isActive,
                }
              )}
            >
              {isActive && (
                <div className="absolute top-1 right-1">
                  <CurrentCheck className="w-4 h-4 text-Moss/600" />
                </div>
              )}
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
