"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ProductList from "@/containers/Product/ProductList";
import ProductCategoriesMobile from "@/containers/Product/ProductCategories/Mobile";
import ProductCategories from "@/containers/Product/ProductCategories";
import ProductStore from "@/containers/Product/ProductStore";
import ProductStoreMobile from "@/containers/Product/ProductStore/Mobile";
import SuggestedProducts from "@/components/SuggestedProducts";
import RelatedPosts from "@/containers/Post/PostCardContent/RelatedPosts";
import { getProducts } from "@/services/client/product";
import { getHomeData } from "@/services/client/home";
import { getShopCategories } from "@/services/client/product/category";
import { ProductItem, Params, ListResponse, CategoriesResponse } from "@/types";
import { useSearchParams } from "next/navigation";
import { Post } from "@/types/post";
import { useAppSelector } from "@/store";

export default function Page() {
  const [posts, setPost] = useState<Post[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoriesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [visible, setVisible] = useState(false);

  const recentlyViewed = useAppSelector((state) => state.cart.recentlyViewed);
  const searchParams = useSearchParams();
  const shopCategoryId = searchParams.get("shopCategoryId") ?? "";
  const query = searchParams.get("query") ?? "";
  const sortBy = searchParams.get("sortBy") ?? "";

  // Refs for GSAP
  const wrapperRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const suggestedRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        [
          categoriesRef.current,
          storeRef.current,
          listRef.current,
          suggestedRef.current,
          postsRef.current,
        ],
        {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const fetchProducts = async (filter: Params, isMore?: boolean) => {
    setLoading(true);
    try {
      const body = {
        ...filter,
        status: "APPROVED",
      };

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

  const fetchPost = async (filter: Params) => {
    setLoading(true);
    try {
      const response = (await getHomeData({ params: filter })) as Post[];
      setPost(response);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchProducts(
      { page: currentPage + 1, size: 20, shopCategoryId, sortBy },
      true
    );
  };

  const fetchProductCategories = async () => {
    setLoading(true);
    try {
      const response = await getShopCategories();
      setCategories(response as CategoriesResponse);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost({ page: 0, size: 20 });
    fetchProductCategories();
  }, []);

  useEffect(() => {
    fetchProducts({ page: 0, size: 20, shopCategoryId, sortBy, query });
  }, [shopCategoryId, sortBy, query]);

  return (
    <main ref={wrapperRef}>
      <ProductCategoriesMobile
        categories={categories?.categories}
        visible={visible}
        setVisible={setVisible}
      />
      <div className="container m-auto pb-4 xl:py-8">
        <div className="flex md:flex-row flex-col justify-center xl:justify-between gap-4 xl:gap-8">
          <div
            ref={categoriesRef}
            className="hidden md:block h-max w-4/12 md:w-2/12"
          >
            <ProductCategories categories={categories?.categories} />
          </div>

          <div className="8/12 md:w-10/12 w-full mb-12 flex flex-col xl:gap-12 rounded">
            <div ref={storeRef} className="hidden md:block">
              <ProductStore />
            </div>
            <div className="md:hidden">
              <ProductStoreMobile visible={visible} setVisible={setVisible} />
            </div>

            <div ref={listRef}>
              <ProductList
                className="w-full"
                products={products}
                isLoading={loading}
                loadMore={handleLoadMore}
                hasMoreItems={currentPage + 1 < totalPages}
              />
            </div>
          </div>
        </div>
        {recentlyViewed && recentlyViewed.length > 0 && (
          <div ref={suggestedRef}>
            <SuggestedProducts
              title="Sản phẩm vừa xem"
              products={recentlyViewed}
            />
          </div>
        )}

        {posts && posts.length > 0 && (
          <div ref={postsRef}>
            <RelatedPosts title="Bài viết đề xuất" data={posts} />
          </div>
        )}
      </div>
    </main>
  );
}
