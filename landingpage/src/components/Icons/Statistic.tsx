import { IconProps } from "@/types/icon";
import React from "react";

export default function Statistic(props: IconProps) {
  const { className = "", strokeColor = "white" } = props;
  return (
    <svg
      className={className}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.8334 5.83398L12.6837 11.9462C11.8523 12.7725 11.4366 13.1857 10.921 13.1856C10.4054 13.1856 9.98979 12.7723 9.15858 11.9458L8.95913 11.7475C8.1272 10.9202 7.71123 10.5066 7.19526 10.5068C6.6793 10.507 6.26363 10.9209 5.43231 11.7488L2.16675 15.0007M18.8334 5.83398V10.4555M18.8334 5.83398H14.1816"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
