import { IconProps } from "@/types/icon";
import React from "react";

export default function Male(props: IconProps) {
  const { className = "", strokeColor = "white" } = props;
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
        d="M10.125 21C14.06 21 17.25 17.81 17.25 13.875C17.25 9.93997 14.06 6.75 10.125 6.75C6.18997 6.75 3 9.93997 3 13.875C3 17.81 6.18997 21 10.125 21Z"
        stroke={strokeColor}
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21 7.5V3M21 3H16.5M21 3L15.1875 8.8125"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

{
  /* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.125 21C14.06 21 17.25 17.81 17.25 13.875C17.25 9.93997 14.06 6.75 10.125 6.75C6.18997 6.75 3 9.93997 3 13.875C3 17.81 6.18997 21 10.125 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
<path d="M21 7.5V3M21 3H16.5M21 3L15.1875 8.8125" stroke="white" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
</svg> */
}
