"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const actions = [
  { label: "Mã giảm giá", href: "/coupon", icon: "coupon" },
  { label: "Cửa hàng", href: "/shop", icon: "shop" },
  { label: "Giỏ hàng", href: "/cart", icon: "cart" },
  { label: "Tin tức", href: "/news", icon: "news" },
];

const CallToActionSection = () => {
  return (
    <section className="my-4 py-4 px-4 bg-white shadow-inner rounded-xl">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="bg-Moss/50 p-2 rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                <Image
                  src={`/images/items/${action.icon}.png`}
                  alt={action.label}
                  width={42}
                  height={42}
                  className="object-contain"
                />
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-700 text-center group-hover:text-primary-600 transition-colors">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
