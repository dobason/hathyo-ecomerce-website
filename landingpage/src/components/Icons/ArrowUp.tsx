import { IconProps } from "@/types/icon";
import React from "react";

export default function ArrowUp(props: IconProps) {
  const { className = "", strokeColor = "#3F3F46" } = props;
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8332 12.5L9.99984 7.5L4.1665 12.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
