import { IconProps } from "@/types/icon";
import React from "react";

export default function User(props: IconProps) {
  const { className = "", fillColor = "#3CB22B" } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="256"
      viewBox="0 0 256 256"
    >
      <g
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="0"
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      >
        <circle cx="45" cy="45" r="45" fill={fillColor}></circle>
        <path
          fill="#FFF"
          d="M45 54.287c-8.9 0-16.14-7.24-16.14-16.14S36.1 22.007 45 22.007c8.899 0 16.14 7.241 16.14 16.14S53.899 54.287 45 54.287zM72.957 71.22c-3.177-5.75-8.143-10.477-14.049-13.341-2.008-.974-4.352-.959-6.436.041a17.113 17.113 0 01-7.473 1.696c-2.616 0-5.13-.571-7.473-1.696-2.081-.999-4.426-1.015-6.435-.041-5.906 2.864-10.872 7.59-14.05 13.341C23.877 78.957 33.865 83.843 45 83.843c11.135 0 21.123-4.886 27.957-12.623z"
        ></path>
      </g>
    </svg>
  );
}
