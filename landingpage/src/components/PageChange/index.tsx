// src/components/SpinnerComponent/SpinnerComponent.tsx
"use client";

import React from "react"; // Import React for component creation
import Image from "next/image";

const SpinnerComponent: React.FC = () => {
  return (
    <div className="fallback-spinner vh-100">
      <Image
        className="fallback-logo animated-logo"
        src={"/logo.svg"}
        alt="logo"
        width={72}
        height={72}
      />
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

export default SpinnerComponent;
