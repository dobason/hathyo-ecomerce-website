import { IconProps } from "@/types/icon";
import React from "react";

export default function CloseCircle(props: IconProps) {
  const { className = "", strokeColor = "#F04438" } = props;
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="24" height="24" rx="12" stroke={strokeColor} />
      <path
        d="M9 17L16.9999 9.00007"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9999 16.9999L9 9"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
