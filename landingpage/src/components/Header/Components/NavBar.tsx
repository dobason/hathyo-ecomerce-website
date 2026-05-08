"use client";

import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

// Define the type for a single topic
interface Topic {
  id: string;
  name: string;
}

interface NavBarProps {
  topics: Topic[];
}

const NavItem = ({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) => (
  <Link href={href} passHref>
    <span
      className={classNames(
        "cursor-pointer px-2 py-2 transition-colors duration-200",
        "body-bold uppercase text-Grayiron/600 hover:text-Moss/500",
        {
          "text-Moss/500": active,
        }
      )}
    >
      {label}
    </span>
  </Link>
);

const NavBar: React.FC<NavBarProps> = ({ topics }) => {
  const pathname = usePathname();

  return (
    <nav className="hidden xl:flex flex-row gap-6 items-center text-md font-semibold whitespace-nowrap">
      <NavItem
        href="/product"
        label="Cửa hàng"
        active={pathname === "/product"}
      />
      <NavItem
        href="/coupon"
        label="Khuyến mãi"
        active={pathname === "/coupon"}
      />
      <div className="relative group">
        <NavItem
          href=""
          label="Bảng tin"
          active={pathname.startsWith("/blog") || pathname.startsWith("/topic")}
        />

        {/* Dropdown */}
        <div
          className="
      absolute left-0 mt-2 w-48 
      bg-white rounded-xl shadow-lg 
      opacity-0 scale-95 translate-y-1
      group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
      transition-all duration-300 ease-out
      z-50
    "
        >
          {topics?.map((topic) => (
            <a
              key={topic.id}
              href={`/topic/${topic.id}`}
              className="
          block px-4 py-2 text-gray-700 hover:bg-green-800 hover:text-white
          transition-colors duration-200 rounded-md
        "
            >
              {topic.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default memo(NavBar);
