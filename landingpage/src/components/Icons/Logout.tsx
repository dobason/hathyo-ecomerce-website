import { IconProps } from "@/types/icon";
import React from "react";

export default function Logout(props: IconProps) {
  const { className = "", strokeColor = "#F04438" } = props;
  return (
    <svg
      className={className}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 12L6.5 12M6.5 12L8.5 14M6.5 12L8.5 10"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5002 21.9827C10.9468 21.9359 10.0202 21.7626 9.37889 21.1213C8.61051 20.3529 8.51406 19.175 8.50195 17M16.5002 21.9983C18.6752 21.9862 19.8532 21.8897 20.6215 21.1213C21.5002 20.2426 21.5002 18.8284 21.5002 16V14V10V8C21.5002 5.17157 21.5002 3.75736 20.6215 2.87868C19.7429 2 18.3286 2 15.5002 2H14.5002C11.6718 2 10.2576 2 9.37889 2.87868C8.61051 3.64706 8.51406 4.82497 8.50195 7"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.5 9.5V14.5C3.5 16.857 3.5 18.0355 4.23223 18.7678C4.96447 19.5 6.14298 19.5 8.5 19.5M4.23223 5.23223C4.96447 4.5 6.14298 4.5 8.5 4.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
