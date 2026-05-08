"use client";

import React from "react";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { useAuth } from "@/context/authContext";
import { getCookie } from "cookies-next";
import { ACCESS_TOKEN } from "@/constants/auth";

type Props = {
  children?: React.ReactNode;
  suffix?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  target?: string;
  className?: string;
  rounded?: boolean;
  type?:
    | "primary"
    | "warning"
    | "primary-dark"
    | "secondary"
    | "selected"
    | "default"
    | "primary-outlined"
    | "danger";
  size?: "small";
  htmlType?: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  requiredLogin?: boolean;
};

function Button({
  className,
  children,
  type = "default",
  suffix,
  href,
  target,
  rounded,
  size,
  onClick,
  icon,
  disabled,
  htmlType,
  loading,
  requiredLogin,
}: Props) {
  const accessToken = getCookie(ACCESS_TOKEN);
  const { toggleLoginPopup } = useAuth();
  const shouldLogin = isEmpty(accessToken) && requiredLogin;

  const buttonClass = classNames(
    "flex flex-row text-base items-center",
    {
      "py-2 text-md": size === "small",
      "py-[10px]": size !== "small" && type !== "primary-outlined",
      "py-[6px]": size !== "small" && type === "primary-outlined",
      "shadow-Shadow/xs bg-white text-Grayiron/500 border-Grayiron/100 hover:bg-Moss/50 border":
        !type || type === "default",
      "shadow-Shadow/xs bg-Moss/400 text-white border-2 border-Moss/400 hover:bg-Moss/600 hover:border-Moss/600":
        type === "primary",
      "shadow-Shadow/xs bg-Moss/500 text-white border-Moss/200 hover:bg-Moss/400 hover:border-Moss/400":
        type === "primary-dark",
      "shadow-Shadow/xs bg-Warning/400 text-white hover:bg-Warning/500 hover:border-Warning/500":
        type === "warning",
      "shadow-Shadow/xs bg-Moss/50 border-Moss/50 text-Moss/400 hover:bg-Moss/100 hover:border-Moss/100":
        type === "secondary",
      "shadow-Shadow/xs bg-Moss/50 border-2 border-Moss/400 text-Moss/400":
        type === "selected",
      "shadow-Shadow/xs bg-white border-2 border-red-400 text-red-400 hover:bg-red-25 h-full":
        type === "danger",
      "shadow-Shadow/xs bg-white border-2 border-Moss/400 text-Moss/400 hover:bg-Moss/25 h-full":
        type === "primary-outlined", // Updated type with hover effect
      "rounded-full": rounded,
      "rounded-lg": !rounded,
      "opacity-50 cursor-not-allowed": disabled || loading,
    },
    className // Ensures that custom classes passed via props are also included
  );

  const contentClass = classNames("text-center w-full", {
    "px-4 xl:px-6 body-sm-semibold": !icon && size === "small",
    "px-6 xl:px-12 body-semibold": !icon && size !== "small",
    "x:pr-6 pr-2 body-semibold": icon,
  });

  return (
    <a className={className} href={href} target={target}>
      <button
        type={htmlType}
        disabled={disabled || loading}
        onClick={(e) => {
          if (!!shouldLogin) {
            toggleLoginPopup();
            return;
          }
          if (typeof onClick === "function") {
            onClick(e);
          }
        }}
        className={buttonClass}
      >
        {icon && <div className="px-[10px]">{icon}</div>}
        {loading && (
          <div className="px-[10px]">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          </div>
        )}
        {!!children && (
          <div className={contentClass}>
            {children}
            {suffix}
          </div>
        )}
      </button>
    </a>
  );
}

export default Button;
