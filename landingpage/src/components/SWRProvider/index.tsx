"use client";
import { SWRConfig } from "swr";
export const SWRProvider = ({ children }: { children: any }) => {
  return <SWRConfig>{children}</SWRConfig>;
};
