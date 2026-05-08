"use client";

import React, { useEffect, useState, memo } from "react";
import { map } from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import Button from "../Button";
import Hamburger from "../Icons/Hamburger";
import Cart from "../Icons/Cart";
import UserCircle from "../Icons/UserCircle";
import AuthModal from "../Header/AuthModal";
import UserDropdown from "./UserDropdown";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useAuth } from "@/context/authContext";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchUserInfo } from "@/store/userSlice";
import { resetAddressState } from "@/store/addressSlice";
import { clearPaymentData } from "@/store/paymentSlice";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";

type Props = {
  className?: string;
  topics: { id: string; name: string }[];
};

const HeaderNav: React.FC<Props> = ({ className = "", topics }) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const containerRef = useOutsideClick(() => setVisibleMenu(false));

  const accessToken = getCookie(ACCESS_TOKEN);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toggleLoginPopup } = useAuth();

  useEffect(() => {
    if (accessToken) dispatch(fetchUserInfo());
  }, [accessToken]);

  const onLogin = () => {
    setVisibleMenu(false);
    setVisibleLogin(true);
    toggleLoginPopup();
  };

  const onLogout = () => {
    deleteCookie(ACCESS_TOKEN);
    deleteCookie(REFRESH_TOKEN);
    localStorage.clear();
    sessionStorage.clear();
    dispatch(resetAddressState()); // Reset address state to prevent errors
    dispatch(clearPaymentData()); // Reset payment data
    setVisibleMenu(false);
    setTimeout(() => location.reload(), 500);
  };

  const renderTopicLinks = () =>
    map(topics, (item, index) => (
      <li
        key={item.id}
        className={`w-full flex justify-center py-3 border-t ${
          index === 0 ? "border-t-0" : "border-t-Moss/100"
        }`}
      >
        <Link href={`/topic/${item.id}`} onClick={() => setVisibleMenu(false)}>
          {item.name}
        </Link>
      </li>
    ));

  const renderUserLinks = () => (
    <>
      <hr className="mx-2" />
      <li className="w-full flex justify-center my-3">
        <Link href="/profile" onClick={() => setVisibleMenu(false)}>
          <UserCircle className="inline-block" />
          <span className="text-md ml-2">{userInfo?.email}</span>
        </Link>
      </li>
      <hr className="mx-3 mb-3 mt-2 border-dashed" />
      {[
        { label: "Thông tin tài khoản", tab: "User-Infor" },
        { label: "Lịch sử đơn hàng", tab: "Order-History" },
        { label: "Lịch sử hoàn trả", tab: "Order-Return" },
      ].map((item) => (
        <li
          key={item.tab}
          className="cursor-pointer w-full flex justify-center py-3 border-t border-t-Moss/100"
        >
          <Link
            href={`/profile?tab=${item.tab}`}
            onClick={() => setVisibleMenu(false)}
          >
            {item.label}
          </Link>
        </li>
      ))}
      <li
        onClick={onLogout}
        className="w-full flex justify-center my-3 text-red-500 cursor-pointer"
      >
        Đăng xuất
      </li>
    </>
  );

  return (
    <div className={className}>
      {/* MOBILE MENU */}
      <div className="xl:hidden dropdown inline-block">
        <div className="flex flex-row">
          <Button
            href="/cart"
            type="secondary"
            className="mr-2"
            icon={<Cart />}
          />
          <Button
            onClick={() => setVisibleMenu(true)}
            type="secondary"
            icon={<Hamburger />}
          />
        </div>

        <ul
          ref={containerRef}
          className={`absolute w-[100vw] left-0 top-[82px] shadow-Shadow/xl bg-white ${
            visibleMenu ? "block" : "hidden"
          }`}
        >
          <li className="w-full flex justify-center py-3">
            <Button
              href="/product"
              onClick={() => setVisibleMenu(false)}
              className="w-[calc(100vw-48px)]"
              type="secondary"
              size="small"
            >
              Cửa hàng
            </Button>
          </li>
          <hr className="mx-2" />
          <li className="w-full flex justify-center py-3">
            <Button
              href="/coupon"
              onClick={() => setVisibleMenu(false)}
              className="w-[calc(100vw-48px)]"
              type="secondary"
              size="small"
            >
              Khuyến mãi
            </Button>
          </li>
          <hr className="mx-2" />
          {renderTopicLinks()}

          {!accessToken ? (
            <li className="w-full flex justify-center my-3">
              <Button
                className="w-[calc(100vw-48px)]"
                onClick={onLogin}
                size="small"
                type="primary"
              >
                Đăng nhập
              </Button>
            </li>
          ) : (
            renderUserLinks()
          )}
        </ul>
      </div>

      {/* DESKTOP LOGIN/USER */}
      {!accessToken ? (
        <Button
          className="hidden xl:block"
          onClick={onLogin}
          type="primary"
          size="small"
        >
          Đăng nhập
        </Button>
      ) : (
        <UserDropdown userInfo={userInfo} onLogout={onLogout} />
      )}

      <AuthModal visible={visibleLogin} setVisible={setVisibleLogin} />
    </div>
  );
};

export default memo(HeaderNav);
