import { IconProps } from "@/types/icon";
import React from "react";

export default function Bag(props: IconProps) {
  const { className = "", strokeColor = "white" } = props;
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="12.5003"
        cy="7.49996"
        rx="0.833333"
        ry="0.833333"
        fill={strokeColor}
      />
      <circle cx="7.50033" cy="7.49996" r="0.833333" fill={strokeColor} />
      <path
        d="M7.5 4.99996V4.16663C7.5 2.78591 8.61929 1.66663 10 1.66663C11.3807 1.66663 12.5 2.78591 12.5 4.16663V4.99996"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.8532 10.4381C16.3655 7.8371 16.1216 6.53661 15.1959 5.7683C14.2701 5 12.947 5 10.3007 5H9.69971C7.0534 5 5.73025 5 4.8045 5.7683C3.87875 6.53661 3.63491 7.8371 3.14723 10.4381C2.46146 14.0955 2.11857 15.9242 3.11826 17.1288C4.11794 18.3333 5.97853 18.3333 9.6997 18.3333H10.3007C14.0219 18.3333 15.8825 18.3333 16.8821 17.1288C17.4621 16.4299 17.5902 15.521 17.4616 14.1667"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
