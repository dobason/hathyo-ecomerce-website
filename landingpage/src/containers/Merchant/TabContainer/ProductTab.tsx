"use client";

import React, { useState, useEffect, useMemo } from "react";
import ProductStore from "@/containers/Product/ProductStore";
import ProductList from "@/containers/Product/ProductList";
import ProductCategories from "@/containers/Product/ProductCategories";
import { getProducts } from "@/services/client/product";
import { ProductItem, Params, ListResponse } from "@/types";
import { useSearchParams } from "next/navigation";

type Props = {
  className?: string;
  id: string | number;
};

export default function ProductTab({ id, className }: Props) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const searchParams = useSearchParams();

  const filterParams: Params = useMemo(() => {
    const sortBy = searchParams.get("sortBy") || undefined;
    const rawSortDirection = searchParams.get("sortDirection");
    const sortDirection =
      rawSortDirection === "asc" || rawSortDirection === "desc"
        ? rawSortDirection
        : undefined;
    const query = searchParams.get("query") || undefined;

    return {
      sortBy,
      sortDirection,
      query,
    };
  }, [searchParams]);

  useEffect(() => {
    fetchProducts({ ...filterParams, page: 0, size: 20 });
  }, [id, filterParams]);

  const fetchProducts = async (params: Params, isMore?: boolean) => {
    setLoading(true);
    try {
      const body = {
        ...params,
        status: "APPROVED",
        merchantId: +id,
      };
      const sortBy = searchParams.get("sortBy") ?? "";
      switch (body.sortBy) {
        case "priceAsc":
        case "priceDesc":
          body.sortBy = "PRICE";
          body.sortDirection = sortBy === "priceAsc" ? "asc" : "desc";
          break;
        case "latest":
          body.sortBy = "CREATED";
          body.sortDirection = "desc";
          break;
        default:
          delete body.sortBy;
          delete body.sortDirection;
      }

      const response = (await getProducts({ params: body })) as ListResponse;

      if (isMore) {
        setProducts((prev) => [...prev, ...response.products]);
      } else {
        setProducts(response.products);
      }
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchProducts({ ...filterParams, page: currentPage + 1, size: 20 }, true);
  };

  return (
    <div className="flex xl:flex-row flex-col justify-center ">
      <div className="h-max xl:w-[300px] w-[calc(100%-48px)] my-8 mx-6">
        <ProductCategories />
      </div>
      <div className="xl:w-[calc(100%-280px)] w-full my-8 xl:mx-6">
        <ProductStore />
        <ProductList
          className="w-full"
          products={products}
          isLoading={loading}
          loadMore={handleLoadMore}
          hasMoreItems={currentPage + 1 < totalPages}
        />
      </div>
    </div>
  );
}
