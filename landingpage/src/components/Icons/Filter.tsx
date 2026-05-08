import { IconProps } from "@/types/icon";
import React from "react";

export default function Filter(props: IconProps) {
  const { className = "", strokeColor = "#70707B" } = props;
  return (
    <svg
      className={className}
      width="13"
      height="14"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M18.332 5.833H1.665M15.832 10H4.165M13.332 14.167H6.665"
      ></path>
    </svg>
  );
}
