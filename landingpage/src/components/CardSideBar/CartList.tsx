"use client";

import React from "react";
import Cart from "../Icons/Cart";
import { CartDataType } from "@/types/cart-item";
import { useOutsideClick } from "@/hooks/useOutsideClick"; // assuming you've extracted the hook
import { useAppSelector } from "@/store";

type Props = {
  carts: CartDataType;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function CardList({ carts, visible, onClose, children }: Props) {
  const containerRef = useOutsideClick<HTMLDivElement>(onClose);
  const displayCount = useAppSelector(
    (state) => state.cart.totalProductsInCart
  );

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 text-gray-600">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" />

      {/* Slide panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute top-0 right-0 w-[320px] h-screen bg-white shadow-xl flex flex-col"
      >
        <div
          ref={containerRef}
          className="flex flex-col flex-1 px-4 py-6 overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Cart strokeColor="#000000" className="w-6 h-6" />
              <h2 className="text-lg font-bold">Giỏ hàng</h2>
            </div>
            <span className="text-sm text-gray-500">
              {displayCount} sản phẩm
            </span>
          </div>

          {/* Content scrollable */}
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
