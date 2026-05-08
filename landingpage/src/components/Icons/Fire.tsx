import { IconProps } from "@/types/icon";
import React from "react";

export default function Fire(props: IconProps) {
  const { className = "", strokeColor = "#FEFEFE" } = props;
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4.83377C10 5.83377 9.66667 7.1671 8.06667 7.70043C8.53333 6.5671 8.6 5.43377 8.26667 4.3671C7.8 2.9671 6.26667 1.90043 5.2 1.30043C4.93333 1.10043 4.46667 1.3671 4.53333 1.7671C4.53333 2.50043 4.33333 3.5671 3.2 4.70043C1.73333 6.1671 1 7.70043 1 9.1671C1 11.1004 2.33333 13.5004 5 13.5004C2.33333 10.8338 4.33333 8.50043 4.33333 8.50043C4.86667 12.4338 7.66667 13.5004 9 13.5004C10.1333 13.5004 12.3333 12.7004 12.3333 9.23377C12.3333 7.1671 11.4667 5.5671 10.7333 4.63377C10.5333 4.30043 10.0667 4.50043 10 4.83377Z"
        stroke={strokeColor}
      />
    </svg>
  );
}
