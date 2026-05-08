"use client";
import React from "react";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch } from "@/store";
import Product from "@/components/Product";
import { ProductItem } from "@/types";
import { addCartItem } from "@/store/cartSlice";
import { map, slice } from "lodash";
import { ICartItem } from "@/types/cart-item";

export default function ProductList({ products }: { products: ProductItem[] }) {
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  // Check scroll position to show/hide navigation buttons
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 10);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Handle scroll with responsive card width
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Responsive scroll distance based on screen size
      let scrollDistance;
      if (window.innerWidth >= 1280) { // xl screens
        scrollDistance = 300; // Scroll exactly one card
      } else if (window.innerWidth >= 1024) { // lg screens
        scrollDistance = clientWidth * 0.4; // Scroll about 1 card
      } else if (window.innerWidth >= 768) { // md screens (tablet)
        scrollDistance = clientWidth * 0.6; // Scroll about 1 card
      } else if (window.innerWidth >= 640) { // sm screens
        scrollDistance = clientWidth * 0.6; // Scroll about 1 card
      } else { // mobile screens
        scrollDistance = clientWidth * 0.9; // Scroll almost full width
      }

      scrollRef.current.scrollTo({
        left: direction === "left"
          ? scrollLeft - scrollDistance
          : scrollLeft + scrollDistance,
        behavior: "smooth",
      });
    }
  };

  const addProductToCart = async (item: ProductItem) => {
    if (!!item.id && !!item.title && !!item.mainImageUrl && !!item.price) {
      const product: ICartItem = {
        productId: item.id,
        merchantId: item.merchantId,
        quantity: 1,
      };
      dispatch(addCartItem(product));
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [products]);

  // Handle window resize to recheck scroll position
  useEffect(() => {
    const handleResize = () => {
      checkScrollPosition();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500">
        <p className="text-sm md:text-base">Không có sản phẩm nào để hiển thị</p>
      </div>
    );
  }

  return (
    <div className="relative group w-full">
      {/* Left navigation button - only show if there's content to scroll */}
      {showLeftButton && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 
                     shadow-lg hover:shadow-xl rounded-full p-1.5 md:p-2 lg:p-3 z-30 transition-all duration-200
                     opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95
                     border border-gray-200"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </button>
      )}

      {/* Product container with responsive grid - Fixed width issues */}
      <div
        ref={scrollRef}
        className="flex gap-2 md:gap-3 lg:gap-4 overflow-x-auto scroll-smooth hide-scrollbar 
                   px-1 md:px-2 lg:px-4 py-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {map(slice(products, 0, 12), (item, index) => (
          <div
            key={item.id || index}
            className="flex-shrink-0 
                       w-[calc(100vw-60px)] sm:w-[260px] md:w-[280px] lg:w-[260px] xl:w-[280px]
                       min-w-[calc(100vw-60px)] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[260px] xl:min-w-[280px]
                       transform transition-all duration-300 
                       hover:scale-[1.02] hover:shadow-lg active:scale-95
                       rounded-lg overflow-hidden bg-white"
          >
            <Product
              {...item}
              onAddToCart={() => addProductToCart(item)}
            />
          </div>
        ))}
      </div>

      {/* Right navigation button - only show if there's more content */}
      {showRightButton && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 
                     shadow-lg hover:shadow-xl rounded-full p-1.5 md:p-2 lg:p-3 z-30 transition-all duration-200
                     opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95
                     border border-gray-200"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </button>
      )}

      {/* Custom styles to hide scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
