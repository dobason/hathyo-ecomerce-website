import { IconProps } from "@/types/icon";
import React from "react";

export default function Upload(props: IconProps) {
  const { className = "", strokeColor = "white" } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M10.5 12.5L10.5 1.66667M10.5 1.66667L13 4.58333M10.5 1.66667L8 4.58333"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.1665 18.3338H13.8332C16.1902 18.3338 17.3687 18.3338 18.1009 17.6016C18.8332 16.8694 18.8332 15.6909 18.8332 13.3338V12.5005C18.8332 10.1435 18.8332 8.96497 18.1009 8.23274C17.4606 7.59242 16.479 7.51204 14.6665 7.50195M6.33317 7.50195C4.52065 7.51204 3.53906 7.59242 2.89874 8.23274C2.1665 8.96497 2.1665 10.1435 2.1665 12.5005L2.1665 13.3338C2.1665 15.6909 2.1665 16.8694 2.89874 17.6016C3.14857 17.8514 3.45035 18.016 3.83317 18.1245"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
