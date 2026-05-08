import React from "react";

interface Props {
  className?: string;
  fillColor?: string;
  textInput?: string;
  isRight?: boolean;
}

export default function SegmentRoadMap(props: Props) {
  const {
    className = "",
    fillColor = "#3F621A",
    textInput = "",
    isRight = "True",
  } = props;
  return (
    <svg
      className={className}
      width="65"
      height="68"
      viewBox="0 0 65 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_4_24)">
        <ellipse
          cx={isRight ? "20.8846" : "24.8846"}
          cy="30.0248"
          rx="18.8846"
          ry="18.5369"
          fill={fillColor}
        />
        {isRight ? (
          <path
            d="M25.7315 53C38.5821 50.8435 47.2186 38.8696 45.0216 26.2556C43.3396 16.5979 35.7947 9.365 26.5831 7.473"
            stroke={fillColor}
            strokeWidth="2"
          />
        ) : (
          <path
            stroke="#F5B848"
            strokeWidth="2"
            d="M21.038 53C8.187 50.843-.45 38.87 1.748 26.255c1.682-9.657 9.226-16.89 18.438-18.782"
          ></path>
        )}
      </g>
      <defs>
        <filter
          id="filter0_d_4_24"
          x="0"
          y="-1"
          width="67"
          height="68.9852"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="8" dy="4" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4_24"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4_24"
            result="shape"
          />
        </filter>
      </defs>
      <foreignObject x="10" y="20" width="20" height="20">
        <text
          cx={isRight ? "20.8846" : "24.8846"}
          y="30.0248"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {textInput}
        </text>
      </foreignObject>
    </svg>
  );
}
