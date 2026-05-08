import { RequestConfig } from "@/types";

import qs from "qs";
import { getCookie, deleteCookie } from "cookies-next";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";

export const clientFetch = (url: string, config?: RequestConfig) => {
  // const isDev = env.NODE_ENV === "development";
  // const isTest = env.NODE_ENV === "test";
  const { params, body, headers, method, baseUrl } = config || {};

  // const locale = cookies().get("lang")?.value || "vi";
  let query = `?${qs.stringify(params, {
    encode: false,
  })}`;
  const accessToken = getCookie(ACCESS_TOKEN);

  const tokenInfo = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};
  try {
    return fetch(
      `${baseUrl || process.env.API_URL}${url}${params ? query : ""}`,
      {
        body: JSON.stringify(body),
        method,
        headers: {
          ...headers,
          Accept: "*/*",
          "Content-Type": "application/json",
          ...tokenInfo,
        },
      }
    )
      .then((res) => {
        if (res.status === 401) {
          deleteCookie(ACCESS_TOKEN);
          deleteCookie(REFRESH_TOKEN);
          localStorage.clear();
          throw new Error("Unauthorized access, logging out...");
        }
        return res.json();
      })
      .catch((e) => e);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const clientFetchFormData = (url: string, config?: RequestConfig) => {
  // const isDev = env.NODE_ENV === "development";
  // const isTest = env.NODE_ENV === "test";
  const { params, body, headers, method, baseUrl } = config || {};

  // const locale = cookies().get("lang")?.value || "vi";
  let query = `?${qs.stringify(params, {
    encode: false,
  })}`;
  const accessToken = getCookie(ACCESS_TOKEN);

  const tokenInfo = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};
  try {
    return fetch(
      `${baseUrl || process.env.API_URL}${url}${params ? query : ""}`,
      {
        body: body,
        method,
        headers: {
          ...tokenInfo,
          ...headers,
        },
      }
    )
      .then((res) => {
        if (res.status === 401) {
          // deleteCookie(ACCESS_TOKEN);
          // deleteCookie(REFRESH_TOKEN);
          // localStorage.clear();
          throw new Error("Unauthorized access, logging out...");
        }
        return res.json();
      })
      .catch((e) => e);
  } catch (error) {
    return Promise.reject(error);
  }
};
