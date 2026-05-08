import classNames from "classnames";
import { range } from "lodash";
import React from "react";

type Props = {
  setValue?: any;
  value?: number;
  className?: string;
  size?: "xs" | "small" | "large" | "default";
};

function Rating({ setValue, value = 5, className, size }: Props) {
  return (
    <div
      className={classNames("flex items-center", className, {
        "gap-3": size === "large",
        "gap-2": !size || size === "default",
        "gap-1": size === "small",
      })}
    >
      {range(0, 5).map((item, idx) => (
        <svg
          onClick={() => setValue && setValue(item)}
          key={item}
          className={classNames("cursor-pointer", {
            "w-8 h-8": size === "large",
            "w-4 h-4": size === "small",
            "w-3 h-3": size === "xs",
            "w-6 h-6": !size || size === "default",
            "text-Warning/500": value >= item,
            "text-gray-300": value <= item,
            "ml-0": item === 1,
          })}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
    </div>
  );
}

export default Rating;
