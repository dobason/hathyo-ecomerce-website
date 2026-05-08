import { IconProps } from "@/types/icon";
import React from "react";

export default function Cart(props: IconProps) {
  const { className = "", strokeColor = "#0A6D3D" } = props;
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.25 15.5C6.94036 15.5 7.5 16.0596 7.5 16.75C7.5 17.4404 6.94036 18 6.25 18C5.55964 18 5 17.4404 5 16.75C5 16.0596 5.55964 15.5 6.25 15.5Z"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <path
        d="M13.75 15.5001C14.4404 15.5001 15 16.0597 15 16.7501C15 17.4404 14.4404 18.0001 13.75 18.0001C13.0596 18.0001 12.5 17.4404 12.5 16.7501C12.5 16.0597 13.0596 15.5001 13.75 15.5001Z"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <path
        d="M9.1665 8H6.6665"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1.6665 3L1.88726 3.07359C2.9873 3.44026 3.53731 3.6236 3.85191 4.06008C4.1665 4.49656 4.1665 5.07633 4.1665 6.23586V8.41667C4.1665 10.7737 4.1665 11.9522 4.89874 12.6844C5.63097 13.4167 6.80948 13.4167 9.1665 13.4167H10.8332M15.8332 13.4167H14.1665"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4.1665 5.5H6.6665M4.58317 11.3333H13.3513C14.1509 11.3333 14.5506 11.3333 14.8637 11.1269C15.1768 10.9204 15.3343 10.553 15.6492 9.81813L16.0064 8.9848C16.6809 7.41078 17.0182 6.62377 16.6477 6.06189C16.2772 5.5 15.421 5.5 13.7085 5.5H9.99984"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
