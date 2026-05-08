import qs from "qs";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";
import { RequestConfig } from "@/types";
import { cookies } from "next/headers";

export const serverFetch = async (url: string, config?: RequestConfig) => {
  // const isDev = env.NODE_ENV === "development";
  // const isTest = env.NODE_ENV === "test";
  const { params, baseUrl, headers, method } = config || {};
  // const locale = cookies().get("lang")?.value || "vi";
  let query = qs.stringify(params, {
    encode: false,
  });
  try {
    const tokenCookie = cookies().get(ACCESS_TOKEN);
    const accessToken = tokenCookie?.value;
    const tokenInfo = accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {};
    const res = await fetch(
      `${baseUrl || process.env.API_URL}${url}${!!params ? `?${query}` : ""}`,
      {
        headers: {
          ...headers,
          "Content-Type": "application/json",
          ...tokenInfo,
        },
        method: method,
      }
    );
    if (res.status === 401) {
      (await cookies()).delete(ACCESS_TOKEN);
      (await cookies()).delete(REFRESH_TOKEN);
      localStorage.clear();
      throw new Error("Unauthorized access, logging out...");
    }

    return await res.json();
  } catch (error) {
    return error;
  }
};
