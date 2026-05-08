import { IconProps } from "@/types/icon";
import React from "react";

export default function Store(props: IconProps) {
  const { className = "", strokeColor = "#669F2A" } = props;
  return (
    <svg
      className={className}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 18.833H3"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 18.8333V13"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5 18.8333V13"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.5278 2.16699H7.47214C6.26932 2.16699 5.66791 2.16699 5.18461 2.41591C4.7013 2.66482 4.43234 3.11309 3.89443 4.00961L2.67634 6.57557C2.23103 7.51365 1.89322 8.73677 2.76022 9.30826C3.101 9.53289 3.53166 9.66699 3.99991 9.66699C5.10448 9.66699 5.99991 8.9208 5.99991 8.00033C5.99991 8.9208 6.89534 9.66699 7.99991 9.66699C9.10448 9.66699 9.99991 8.9208 9.99991 8.00033C9.99991 8.9208 10.8953 9.66699 11.9999 9.66699C13.1045 9.66699 13.9999 8.9208 13.9999 8.00033C13.9999 8.9208 14.8953 9.66699 15.9999 9.66699C17.1045 9.66699 17.9999 8.9208 17.9999 8.00033C17.9999 8.9208 18.8953 9.66699 19.9999 9.66699C20.4682 9.66699 20.8989 9.53289 21.2397 9.30825C22.1067 8.73676 21.7689 7.51365 21.3236 6.57557L20.1055 4.00961C19.5676 3.11309 19.2986 2.66482 18.8153 2.41591C18.332 2.16699 17.7306 2.16699 16.5278 2.16699Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
