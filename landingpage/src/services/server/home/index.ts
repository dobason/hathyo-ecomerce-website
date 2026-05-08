import { RequestConfig } from "@/types";
import { serverFetch } from "@/services/serverServices";
// import { cookies } from "next/headers";
// import { ACCESS_TOKEN } from "@/constants/auth";

export const getQuotes = (config?: RequestConfig) => {
  return serverFetch("/quotes", config);
};

export const getProducts = (config?: RequestConfig) => {
  return serverFetch("/products/homepage", config);
};

export const getUser = (config?: RequestConfig) => {
  // const tokenCookie = cookies().get(ACCESS_TOKEN);
  // if (tokenCookie?.value) {
  //   return serverFetch("/users/profile", config);
  // }
  return {};
};
