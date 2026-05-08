import { IconProps } from "@/types/icon";
import React from "react";

export default function FeMale(props: IconProps) {
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
        d="M12 15C13.5913 15 15.1174 14.3679 16.2426 13.2426C17.3679 12.1174 18 10.5913 18 9C18 7.4087 17.3679 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.88258 3.63214 7.75736 4.75736C6.63214 5.88258 6 7.4087 6 9C6 10.5913 6.63214 12.1174 7.75736 13.2426C8.88258 14.3679 10.4087 15 12 15ZM12 15V21M10 19H14"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
