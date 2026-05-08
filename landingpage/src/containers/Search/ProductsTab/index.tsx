"use client";

import product from "@/utils/product.json";

import { memo } from "react";
import ProductStore from "@/containers/Product/ProductStore";
import ProductList from "@/containers/Product/ProductList";

function ProductsTab() {
  // const products = Array(12).fill(product);

  return (
    <div className="xl:py-6 flex flex-col gap-6">
      <ProductStore />
      <ProductList className="w-full" products={Array(52).fill(product)} />
    </div>
  );
}

export default memo(ProductsTab);
