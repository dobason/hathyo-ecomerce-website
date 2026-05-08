"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Button from "@/components/Button";
import classNames from "classnames";
import SearchIcon from "@/components/Icons/SearchIcon";

const ProductStore: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const sortBy = searchParams.get("sortBy") || "relevance";
  const sortDirection = searchParams.get("sortDirection") || "asc";
  const [searchValue, setSearchValue] = useState(
    searchParams.get("query") || ""
  );

  // ✅ Lưu timeout để clear khi user gõ tiếp
  let timeoutId: ReturnType<typeof setTimeout>;

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset page
    params.set("page", "0");
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    // Xoá timeout cũ trước khi tạo mới
    clearTimeout(timeoutId);

    // ⏳ Delay trước khi update URL
    timeoutId = setTimeout(() => {
      updateQueryParam("query", searchValue);
    }, 500);

    // Dọn dẹp
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSortClick = (key: string, value: string) => {
    updateQueryParam(key, value);
  };

  return (
    <div className="w-full flex flex-col xl:flex-row xl:justify-between justify-start items-start xl:items-center py-4 gap-4 xl:px-2 px-6 text-base flex-wrap bg-gray-100 rounded-md">
      {/* Search input */}
      <div className="flex items-center gap-2 w-full xl:w-auto">
        <div className="relative w-full xl:w-80">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full text-md px-10 py-2 rounded-lg border border-gray-200 focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
            value={searchValue}
            onChange={handleInputChange}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sort / Filter */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="hidden lg:block xl:w-auto w-full">Sắp xếp theo</span>
        <Button
          size="small"
          type={sortBy === "relevance" ? "primary" : "default"}
          onClick={() => handleSortClick("sortBy", "relevance")}
        >
          Liên quan
        </Button>
        <Button
          size="small"
          type={sortBy === "latest" ? "primary" : "default"}
          onClick={() => handleSortClick("sortBy", "latest")}
        >
          Mới nhất
        </Button>
        <Button
          size="small"
          type={sortBy === "bestSelling" ? "primary" : "default"}
          onClick={() => handleSortClick("sortBy", "bestSelling")}
        >
          Bán chạy
        </Button>
        <div className="relative">
          <select
            name="price"
            className={classNames(
              "text-md bg-Grayiron/50 text-gray-500 placeholder-Grayiron/200 block w-full rounded-lg border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50",
              {
                "!border-Moss/500 !text-Moss/500":
                  sortBy.startsWith("price") && !!sortBy,
              }
            )}
            value={
              sortBy.startsWith("price") && !!sortBy
                ? sortBy === "priceAsc"
                  ? "priceAsc"
                  : "priceDesc"
                : ""
            }
            onChange={(e) => handleSortClick("sortBy", e.target.value)}
          >
            <option value="">Giá</option>
            <option value="priceAsc">Giá: Thấp đến cao</option>
            <option value="priceDesc">Giá: Cao đến thấp</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductStore;
