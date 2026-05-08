import { IconProps } from "@/types/icon";
import React from "react";

export default function InfoCircle(props: IconProps) {
  const { className = "", strokeColor = "#0A6D3D" } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M12 17v-6"
      ></path>
      <circle
        cx="1"
        cy="1"
        r="1"
        fill={strokeColor}
        transform="matrix(1 0 0 -1 11 9)"
      ></circle>
      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"
      ></path>
    </svg>
  );
}
