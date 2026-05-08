/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import CartConfirm from "./CartConfirm";
import ItemAvailable from "./ItemAvailable";
import SuggestedProducts from "@/components/SuggestedProducts";
import { ProductDetail } from "@/types";
import { getProductSimilarCart } from "@/services/client/product";

export default function Container() {
  const [products, setProducts] = useState<ProductDetail[]>([]);

  useEffect(() => {
    onInitProductSimilar();
  }, []);

  const onInitProductSimilar = async () => {
    try {
      const res = await getProductSimilarCart({
        params: { page: 0, size: 12, sortBy: "CREATED" },
      });
      if (!!res?.products) {
        setProducts(res.products);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <main>
      <div className="container m-auto flex flex-col gap-4 py-6 xl:gap-6 xl:py-8">
        <ItemAvailable className="shadow-Shadow/md" />
        <CartConfirm className="shadow-Shadow/md" />
        <SuggestedProducts title="Các sản phẩm liên quan" products={products} />
      </div>
    </main>
  );
}
