"use client";

import React, { useState, useEffect, Fragment, useMemo } from "react";
import Button from "../Button";
import Cart from "../Icons/Cart";
import CardList from "./CartList";
import CartItem from "./CartItem";
import Empty from "@/components/Empty";
import { useAppSelector, useAppDispatch } from "@/store";
import { fetchCartItems } from "@/store/cartSlice";
import { getCookie } from "cookies-next";
import { ACCESS_TOKEN } from "@/constants/auth";

export default function CardSideBar() {
  const accessToken = getCookie(ACCESS_TOKEN);
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.cart.carts);
  const displayCount = useAppSelector(
    (state) => state.cart.totalProductsInCart
  );

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (accessToken) dispatch(fetchCartItems());
  }, [accessToken]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  const onToggle = () => setVisible((prev) => !prev);

  return (
    <Fragment>
      {/* Cart Icon Button */}
      <Button
        className="hidden xl:flex relative"
        type="secondary"
        requiredLogin
        icon={
          <Fragment>
            <Cart className="w-5 h-5" />
            {!!displayCount && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 min-w-[20px] text-center leading-tight">
                {displayCount}
              </span>
            )}
          </Fragment>
        }
        onClick={onToggle}
      />

      {/* Cart Sidebar */}
      <CardList carts={carts} visible={visible} onClose={onToggle}>
        {carts?.carts?.length > 0 ? (
          <div className="flex flex-col h-full">
            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="flex flex-col gap-4 pb-4">
                {carts.carts.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </div>
            </div>

            {/* Fixed button */}
            <div className="p-4 bg-white border-t border-gray-100">
              <Button href="/cart" type="primary" className="w-full">
                Mua hàng
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <Empty />
          </div>
        )}
      </CardList>
    </Fragment>
  );
}
