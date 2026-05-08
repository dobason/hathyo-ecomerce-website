"use client";
import React, { ReactNode } from "react";
import Marquee from "react-fast-marquee";

type Props = {
  children: ReactNode;
};

function MarqueeClient({ children }: Props) {
  return <Marquee speed={80}>{children}</Marquee>;
}

export default MarqueeClient;
