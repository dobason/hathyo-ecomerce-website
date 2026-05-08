import { IconProps } from "@/types/icon";
import React from "react";

export default function Close(props: IconProps) {
  const {
    className = "",
    strokeColor = "#3F3F46",
    fillColor = "#D1D1D6",
  } = props;
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 24L23.9999 8.00013L8 24Z" fill={fillColor} />
      <path
        d="M8 24L23.9999 8.00013"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.9999 23.9999L8 8"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
