import { IconProps } from "@/types/icon";
import React from "react";

export default function CurrentCheck(props: IconProps) {
  const { className = "", fillColor = "#0A6D3D" } = props;
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32.5 29.5L3 0H32.5V29.5Z" fill={fillColor} />
      <path d="M21 10L23 12L27 8" stroke="white" strokeLinecap="round" />
    </svg>
  );
}
