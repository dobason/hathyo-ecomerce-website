import { IconProps } from "@/types/icon";
import React from "react";

export default function User(props: IconProps) {
  const { className = "", fillColor = "#3CB22B" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="256"
      fill="none"
      viewBox="0 0 256 256"
    >
      <path
        fill="#D1D1D6"
        d="M208 32H48a32.035 32.035 0 0 0-32 32v128a32.035 32.035 0 0 0 32 32h160a32.034 32.034 0 0 0 32-32V64a32.035 32.035 0 0 0-32-32m-40 32a24.001 24.001 0 0 1 16.971 40.971 24.005 24.005 0 0 1-26.155 5.202A24 24 0 0 1 144 88a24.025 24.025 0 0 1 24-24M48 208a16 16 0 0 1-16-16v-33.815l47.42-42.15a24.03 24.03 0 0 1 32.9.95l32.475 32.405L86.185 208zm176-16c0 4.243-1.686 8.313-4.686 11.314A16 16 0 0 1 208 208h-99.185l60.71-60.71a23.86 23.86 0 0 1 30.82-.08L224 166.92z"
      ></path>
    </svg>
  );
}
