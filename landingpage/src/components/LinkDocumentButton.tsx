"use client";
import React from "react";
import classNames from "classnames";
// import Link from "next/link";

type Props = {
  children?: any;
  suffix?: any;
  icon?: any;
  href?: string;
  className?: string;
  rounded?: boolean;
  htmlType?: "submit" | "reset" | "button" | undefined;
  type?: any;
  size?: any;
  onClick?: any;
  disabled?: boolean;
  loading?: boolean;
};

function LinkDocumentButton({
  className,
  children,
  type,
  suffix,
  href,
  rounded,
  size,
  onClick,
  icon,
  disabled,
  htmlType,
  loading,
}: Props) {
  // const [closeable, setCloseable] = useState(close);
  return (
    // <Link className={className} href={href}>

    // </Link>

    <a className={className} href={href}>
      <button
        type={htmlType}
        disabled={disabled || loading}
        onClick={onClick}
        className={classNames(
          "flex flex-row text-base",
          {
            "py-2 text-md": size === "small",
            "py-[10px]": size !== "small",
            "shadow-Shadow/xs bg-white text-Grayiron/500 border-Grayiron/100 hover:bg-Moss/50 border":
              !type || type === "default",
            "shadow-Shadow/xs bg-Moss/400 text-white border-Moss/400 hover:bg-Moss/600 hover:border-Moss/600":
              type === "primary",
            "shadow-Shadow/xs bg-Moss/500 text-white border-Moss/200 hover:bg-Moss/400 hover:border-Moss/400":
              type === "primary-dark",
            "shadow-Shadow/xs bg-Warning/400 text-white hover:bg-Warning/500 hover:border-Warning/500":
              type === "warning",
            "shadow-Shadow/xs bg-Moss/50 border-Moss/50 text-Moss/400 hover:bg-Moss/100 hover:border-Moss/100":
              type === "secondary",
            "shadow-Shadow/xs bg-Moss/50 border-2 border-Moss/400 text-Moss/400":
              type === "selected",
            "rounded-full": rounded,
            "rounded-lg": !rounded,
          },
          className
        )}
      >
        {!!icon && <div className="px-[10px]">{icon}</div>}
        {!!children && (
          <div
            className={classNames(" text-center w-full", {
              "px-[15px]": !icon && size === "small",
              "px-[23px]": !icon && size !== "small",
              "pr-6": icon,
            })}
          >
            {children}
            {suffix}
          </div>
        )}
      </button>
    </a>
  );
}

export default LinkDocumentButton;
