"use client";

import React, { useEffect, useRef } from "react";
import { map, slice } from "lodash";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Product from "../Product";
import { ProductDetail } from "@/types";
import { ICartItem } from "@/types/cart-item";
import classNames from "classnames";
import Empty from "@/components/Empty";
import { addCartItem } from "@/store/cartSlice";
import { useAppDispatch } from "@/store";
import gsap from "gsap";

type Props = {
  title: string;
  className?: string;
  products: ProductDetail[];
};

const SuggestedProducts: React.FC<Props> = ({
  className = "",
  title,
  products,
}) => {
  const dispatch = useAppDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - clientWidth
            : scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  const addProductToCart = (item: ProductDetail) => {
    if (!!item.id && !!item.title && !!item.mainImageUrl && !!item.price) {
      const product: ICartItem = {
        productId: item.id,
        merchantId: item.merchantId,
        quantity: 1,
      };
      dispatch(addCartItem(product));
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [products]);

  return (
    <div
      ref={wrapperRef}
      className={classNames("bg-white p-6 rounded-xl flex flex-col gap-6", {
        [className]: !!className,
      })}
    >
      <div className="text-2xl font-bold text-Moss/700">{title}</div>
      {products && products.length > 0 ? (
        <div className="flex items-start overflow-x-auto gap-4 p-2">
          {map(products, (item, index) => (
            <div
              key={index}
              ref={(el) => void (itemsRef.current[index] = el)}
              className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              <Product {...item} onAddToCart={() => addProductToCart(item)} />
            </div>
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default SuggestedProducts;
