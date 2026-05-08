"use client";

import Link from "next/link";
import { memo, useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Tag from "../Tag";
import { User as UserType } from "@/types/user";
import { useAppSelector } from "@/store";
import ImageFallback from "@/components/ImageFallback";
import classNames from "classnames";

type Props = {
  userInfo?: UserType;
  onLogout: () => void;
  className?: string;
};

function UserDropdown({ className, onLogout }: Props) {
  const [visible, setVisible] = useState(false);
  const containerRef = useOutsideClick(() => setVisible(false));
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const formatFullName = (firstName?: string, lastName?: string) => {
    return [firstName, lastName].filter(Boolean).join(" ");
  };

  return (
    <div
      className={classNames("hidden xl:block", {
        [className ?? ""]: !!className,
      })}
    >
      <div className="dropdown inline-block">
        <div
          onClick={() => setVisible(true)}
          className="flex items-center justify-center"
        >
          <ImageFallback
            src={userInfo?.avatar}
            alt="cart item"
            width={40}
            height={40}
            errorImg="/product-fallback-image.png"
            className="rounded-full w-full h-full object-cover aspect-square border cursor-pointer"
          />
        </div>
        <ul
          ref={containerRef}
          className={`cursor-pointer dropdown-menu absolute w-[238px] right-2 top-[82px] pb-2 shadow-Shadow/xl rounded-xl ${
            visible ? "block" : "hidden"
          } bg-white`}
        >
          <li className="w-full flex justify-center py-3 flex-col items-center">
            <ImageFallback
              src={userInfo?.avatar}
              alt="cart item"
              width={60}
              height={60}
              errorImg="/product-fallback-image.png"
              className="rounded-full w-[60px] h-[60px] border"
            />
            <div className="text-Grayiron/600 text-md my-1">
              {formatFullName(userInfo?.firstname, userInfo?.lastname)}
            </div>
            <Tag type="warning">Khách hàng</Tag>
          </li>
          <hr className="mx-3 mb-3 mt-2 border-dashed" />
          <li className="w-full flex justify-start py-3 px-3 hover:text-Moss/600 text-Grayiron/600 hover:bg-Moss/50">
            <Link
              onClick={() => setVisible(false)}
              href={`/profile?tab=User-Infor`}
            >
              <span className="text-md ">Thông tin tài khoản</span>
            </Link>
          </li>
          <li className="w-full flex justify-start py-3 px-3 hover:text-Moss/600 text-Grayiron/600 hover:bg-Moss/50">
            <Link
              onClick={() => setVisible(false)}
              href={`/profile?tab=Order-History`}
            >
              <span className="text-md">Lịch sử đơn hàng</span>
            </Link>
          </li>
          <li
            onClick={onLogout}
            className="w-full flex justify-start py-3 px-3 hover:bg-Moss/50 text-red-500"
          >
            Đăng xuất
          </li>
        </ul>
      </div>
    </div>
  );
}
export default memo(UserDropdown);
