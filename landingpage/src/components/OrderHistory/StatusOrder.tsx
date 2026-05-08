"use client";

import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import { ORDER_STATUS } from "@/constants/order_status";
import CurrentCheck from "../Icons/CurrentCheck";

type Props = {
  orderStatus: string;
  setOrderStatus: Dispatch<
    SetStateAction<"PENDING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED">
  >;
};

export default function StatusOrder({ orderStatus, setOrderStatus }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="flex xl:grid xl:grid-cols-4 gap-3 overflow-x-auto no-scrollbar">
        {ORDER_STATUS.map(({ key, value }) => {
          const isActive = key === orderStatus;

          return (
            <button
              key={key}
              onClick={() =>
                setOrderStatus(
                  key as "PENDING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED"
                )
              }
              className={classNames(
                "relative px-4 py-2 text-sm rounded-lg font-medium border whitespace-nowrap transition-all duration-200 w-max xl:w-full",
                {
                  "bg-Moss/50 text-Moss/500 border-Moss/500": isActive,
                  "bg-white text-gray-600 border-gray-200 hover:border-Moss/400":
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
