"use client";

import React, { useCallback } from "react";
import {
  FiUser,
  FiClipboard,
  FiGift,
  FiMapPin,
  FiInfo,
  FiLogOut,
} from "react-icons/fi";
import { useAppSelector } from "@/store";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import ImageFallback from "@/components/ImageFallback";
import { deleteCookie } from "cookies-next";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";

type TabKey =
  | "User-Infor"
  | "Order-History"
  | "User-Address"
  | "Order-Return"
  | "Saved-Coupons";

export default function LeftSide() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tabItem = searchParams.get("tab") ?? "User-Infor";

  const userInfo = useAppSelector((state) => state.user.userInfo);

  const formatFullName = (firstName?: string, lastName?: string) => {
    return [firstName, lastName].filter(Boolean).join(" ");
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleChangeTab = (tab: TabKey) => {
    router.push(pathname + "?" + createQueryString("tab", tab));
  };

  const onLogout = () => {
    deleteCookie(ACCESS_TOKEN);
    deleteCookie(REFRESH_TOKEN);
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      location.reload();
    }, 500);
  };

  return (
    <div className="hidden xl:block">
      <div className="xl:h-[85vh] rounded-lg bg-white shadow-md">
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="p-4">
              <div className="py-4 flex flex-row justify-start gap-4 border border-dashed border-white border-b-gray-300">
                <ImageFallback
                  src={userInfo?.avatar}
                  alt="avatar"
                  width={64}
                  height={64}
                  errorImg="/product-fallback-image.png"
                  className="rounded-full w-14 h-14 border"
                />
                <div className="flex flex-col items-start justify-start gap-2">
                  <div className="text-base font-semibold text-gray-600">
                    {formatFullName(userInfo?.firstname, userInfo?.lastname)}
                  </div>
                  <div className="bg-Warning/100 rounded-full px-4 py-2 text-Warning/500 text-xs">
                    Khách hàng
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin tài khoản */}
            <div
              className={classNames(
                "w-full py-2 px-4 flex flex-start cursor-pointer hover:bg-Moss/50 gap-2",
                { "bg-Moss/50": tabItem === "User-Infor" }
              )}
              onClick={() => handleChangeTab("User-Infor")}
            >
              <FiUser
                className="w-6 h-6"
                color={tabItem === "User-Infor" ? "#0A6D3D" : "#51525C"}
              />
              <div
                className={classNames("text-base font-medium", {
                  "text-Moss/600": tabItem === "User-Infor",
                })}
              >
                Thông tin tài khoản
              </div>
            </div>

            {/* Lịch sử đơn hàng */}
            <div
              className={classNames(
                "w-full py-2 px-4 flex flex-start cursor-pointer hover:bg-Moss/50 gap-2",
                { "bg-Moss/50": tabItem === "Order-History" }
              )}
              onClick={() => handleChangeTab("Order-History")}
            >
              <FiClipboard
                className="w-6 h-6"
                color={tabItem === "Order-History" ? "#0A6D3D" : "#51525C"}
              />
              <div
                className={classNames("text-base font-medium", {
                  "text-Moss/600": tabItem === "Order-History",
                })}
              >
                Lịch sử đơn hàng
              </div>
            </div>

            {/* Lịch sử hoàn trả */}
            <div
              className={classNames(
                "w-full py-2 px-4 flex flex-start cursor-pointer hover:bg-Moss/50 gap-2",
                { "bg-Moss/50": tabItem === "Order-Return" }
              )}
              onClick={() => handleChangeTab("Order-Return")}
            >
              <FiInfo
                className="w-6 h-6"
                color={tabItem === "Order-Return" ? "#0A6D3D" : "#51525C"}
              />
              <div
                className={classNames("text-base font-medium", {
                  "text-Moss/600": tabItem === "Order-Return",
                })}
              >
                Lịch sử hoàn trả
              </div>
            </div>

            {/* Địa chỉ */}
            <div
              className={classNames(
                "w-full py-2 px-4 flex flex-start cursor-pointer hover:bg-Moss/50 gap-2",
                { "bg-Moss/50": tabItem === "User-Address" }
              )}
              onClick={() => handleChangeTab("User-Address")}
            >
              <FiMapPin
                className="w-6 h-6"
                color={tabItem === "User-Address" ? "#0A6D3D" : "#51525C"}
              />
              <div
                className={classNames("text-base font-medium", {
                  "text-Moss/600": tabItem === "User-Address",
                })}
              >
                Địa chỉ
              </div>
            </div>

            {/* Coupon của bạn */}
            {/* <div
              className={classNames(
                "w-full py-2 px-4 flex flex-start cursor-pointer hover:bg-Moss/50 gap-2",
                { "bg-Moss/50": tabItem === "Saved-Coupons" }
              )}
              onClick={() => handleChangeTab("Saved-Coupons")}
            >
              <FiGift className="w-6 h-6" color={tabItem === "Saved-Coupons" ? "#0A6D3D" : "#51525C"} />
              <div className={classNames("text-base font-medium", { "text-Moss/600": tabItem === "Saved-Coupons" })}>
                Coupon của bạn
              </div>
            </div> */}
          </div>

          <div className="px-2 mt-3">
            <div
              className="w-full my-8 flex flex-row justify-center gap-2 cursor-pointer"
              onClick={onLogout}
            >
              <FiLogOut className="w-5 h-5 text-red-500" />
              <div className="text-base font-medium text-red-500">
                Đăng xuất
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
