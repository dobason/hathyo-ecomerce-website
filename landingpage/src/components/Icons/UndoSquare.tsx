import { IconProps } from "@/types/icon";
import React from "react";

export default function UndoSquare(props: IconProps) {
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
        d="M5.91699 7.9168H12.199C13.3389 7.9168 13.9089 7.9168 14.3219 8.18386C14.5199 8.3119 14.6886 8.48051 14.8166 8.67855C15.0837 9.0916 15.0837 9.66154 15.0837 10.8014C15.0837 11.9413 15.0837 12.5112 14.8166 12.9243C14.6886 13.1223 14.5199 13.2909 14.3219 13.419C13.9089 13.686 13.3389 13.686 12.199 13.686H8.417M5.91699 7.9168L7.79199 6.18604M5.91699 7.9168L7.79199 9.64757"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.8337 9.99996C18.8337 13.9283 18.8337 15.8925 17.6133 17.1129C16.3929 18.3333 14.4287 18.3333 10.5003 18.3333C6.57195 18.3333 4.60777 18.3333 3.38738 17.1129C2.16699 15.8925 2.16699 13.9283 2.16699 9.99996C2.16699 6.07159 2.16699 4.1074 3.38738 2.88701C4.60777 1.66663 6.57195 1.66663 10.5003 1.66663C14.4287 1.66663 16.3929 1.66663 17.6133 2.88701C18.4247 3.69846 18.6966 4.83875 18.7877 6.66663"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
