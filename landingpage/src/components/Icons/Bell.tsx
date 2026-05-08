import { IconProps } from "@/types/icon";
import React from "react";

export default function Bell(props: IconProps) {
  const { className = "", strokeColor = "#0A6D3D" } = props;
  return (
    <svg
      className={className}
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.6243 8.59065V8.00349C15.6243 4.77954 13.1062 2.16602 10 2.16602C6.8938 2.16602 4.37573 4.77954 4.37573 8.00349V8.59065C4.37573 9.29531 4.17476 9.9842 3.79817 10.5705L2.8753 12.0073C2.03235 13.3196 2.67587 15.1034 4.14197 15.5184C7.97728 16.6041 12.0227 16.6041 15.858 15.5184C17.3241 15.1034 17.9676 13.3196 17.1247 12.0073L16.2018 10.5705C15.8252 9.9842 15.6243 9.29531 15.6243 8.59065Z"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <path
        opacity="0.5"
        d="M6.25 16.334C6.79586 17.7905 8.26871 18.834 10 18.834C11.7313 18.834 13.2041 17.7905 13.75 16.334"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        opacity="0.5"
        d="M10 5.5V8.83333"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
