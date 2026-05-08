import { IconProps } from "@/types/icon";
import React from "react";

export default function SearchIcon(props: IconProps) {
  const { className = "", strokeColor = "#3F621A" } = props;
  return (
    <svg
      className={className}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.7">
        <circle
          cx="11.5"
          cy="12"
          r="9.5"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
        <path
          d="M20 20.5L22 22.5"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
