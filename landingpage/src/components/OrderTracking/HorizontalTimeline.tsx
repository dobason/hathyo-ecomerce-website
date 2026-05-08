// HorizontalTimeline.tsx
import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import { ORDER_TRACKING } from "@/constants/order_tracking";

interface Props {
  orderStatus: string;
  setOrderStatus: Dispatch<
    SetStateAction<"order" | "confirm" | "packaging" | "shipping">
  >;
}

function HorizontalTimeline({ orderStatus, setOrderStatus }: Props) {
  const currentIndex =
    ORDER_TRACKING.findIndex((item) => item.key === orderStatus) + 1;

  console.log(currentIndex);

  return (
    <div className="flex justify-center items-center my-8">
      <div className="flex justify-between w-full max-w-3xl px-4">
        {ORDER_TRACKING.map((step, index) => (
          <div
            key={step.key}
            className={classNames("flex flex-col cursor-pointer", {
              "items-center": ![0, 3].includes(index),
              "items-start": index === 0,
              "items-end": index === 3,
            })}
            onClick={() => {
              if (
                ["order", "confirm", "packaging", "shipping"].includes(step.key)
              ) {
                setOrderStatus(
                  step.key as "order" | "confirm" | "packaging" | "shipping"
                );
              } else {
                console.error(`Invalid step key: ${step.key}`);
                setOrderStatus("order");
              }
            }}
          >
            <div className={"flex items-center"}>
              {index > 0 && (
                <div
                  className={classNames("w-24 h-1 border-dashed", {
                    "border-t-2 border-Warning/400": index < currentIndex,
                    "border-t-2 border-gray-300": index >= currentIndex,
                  })}
                ></div>
              )}
              <div
                className={classNames(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  {
                    "bg-Moss/400 text-white": index < currentIndex,
                    "bg-gray-300 text-gray-500": index >= currentIndex,
                  }
                )}
              ></div>
              {index < ORDER_TRACKING.length - 1 && (
                <div
                  className={classNames("w-24 h-1 border-dashed", {
                    "border-t-2 border-Warning/400": index < currentIndex - 1,
                    "border-t-2 border-gray-300": index >= currentIndex - 1,
                  })}
                ></div>
              )}
            </div>
            <div
              className={classNames("mt-2 text-center", {
                "text-Moss/500": index < currentIndex,
              })}
            >
              {step.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HorizontalTimeline;
