import { cookies } from "next/headers";

export const getCurrentLocale = (): string => {
  const currentLocale = cookies().get("lang")?.value || "vi";
  return currentLocale;
};
