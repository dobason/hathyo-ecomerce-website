import { IconProps } from "@/types/icon";
import React from "react";

export default function ArrowRight(props: IconProps) {
  const { className = "", strokeColor = "#0A6D3D" } = props;
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 5L15 12L9 19"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
