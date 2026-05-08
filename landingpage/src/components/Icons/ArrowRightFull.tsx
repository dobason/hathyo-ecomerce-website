import { IconProps } from "@/types/icon";
import React from "react";

export default function ArrowRight(props: IconProps) {
  const { className = "", strokeColor = "#0A6D3D" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      className={className}
    >
      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.333 10h13.334m0 0-5-5m5 5-5 5"
      />
    </svg>
  );
}
