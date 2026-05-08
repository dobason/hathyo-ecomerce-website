import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import FilterIcon from "@/components/Icons/Filter";
import classNames from "classnames";
import { debounce } from "lodash";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function ProductStoreMobile({ setVisible }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const sortBy = searchParams.get("sortBy") || "relevance";
  const sortDirection = searchParams.get("sortDirection") || "asc";
  const [searchValue, setSearchValue] = useState(
    searchParams.get("query") || ""
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSortClick = (sortBy: string, value: string) => {
    router.push(pathname + "?" + createQueryString(sortBy, value));
    setVisible(false);
  };

  const handleSearchChange = debounce((value: string) => {
    router.push(`${pathname}?${createQueryString("query", value)}`);
  }, 500);

  useEffect(() => {
    handleSearchChange(searchValue);

    return () => {
      handleSearchChange.cancel();
    };
  }, [searchValue]);

  return (
    <div className="flex flex-col gap-2 py-4 mb-2">
      <input
        type="text"
        placeholder="Tìm kiếm..."
        className="body-xs-medium w-full px-2 py-2 rounded-md border border-gray-200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <div className="text-Grayiron-600 font-normal body-xs-medium">
          Sắp xếp theo
        </div>
        <button
          className="flex items-center justify-end gap-1"
          onClick={() => setVisible(true)}
          type="button"
          data-drawer-target="drawer-bottom-example"
          data-drawer-show="drawer-bottom-example"
          data-drawer-placement="bottom"
          aria-controls="drawer-bottom-example"
        >
          <FilterIcon />
          <p className="text-Moss/700 font-normal body-xs-medium">Lọc</p>
        </button>
      </div>
      <div className="flex grid grid-cols-2 items-center justify-between gap-1">
        <button
          className={classNames(
            "shadow-Shadow/xs bg-white text-Grayiron/500 border-Grayiron/100 hover:bg-Moss/50 border flex flex-row text-xs px-2 py-2 rounded-md",
            {
              "!bg-Moss/400 !border-Moss/400 !text-white":
                sortBy === "relevance",
            }
          )}
          onClick={() => handleSortClick("sortBy", "relevance")}
        >
          Liên quan
        </button>
        <button
          className={classNames(
            "shadow-Shadow/xs bg-white text-Grayiron/500 border-Grayiron/100 hover:bg-Moss/50 border flex flex-row text-xs px-2 py-2 rounded-md",
            {
              "!bg-Moss/400 !border-Moss/400 !text-white": sortBy === "latest",
            }
          )}
          onClick={() => handleSortClick("sortBy", "latest")}
        >
          Mới nhất
        </button>
        <button
          className={classNames(
            "shadow-Shadow/xs bg-white text-Grayiron/500 border-Grayiron/100 hover:bg-Moss/50 border flex flex-row text-xs px-2 py-2 rounded-md",
            {
              "!bg-Moss/400 !border-Moss/400 !text-white":
                sortBy === "bestSelling",
            }
          )}
          onClick={() => handleSortClick("sortBy", "bestSelling")}
        >
          Bán chạy
        </button>
        <div className="relative">
          <select
            name="price"
            className={classNames(
              "body-xs-medium w-full bg-Grayiron/50 text-gray-500 placeholder-Grayiron/200 rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50",
              {
                "!border-Moss/500 !text-Moss/500":
                  sortBy.startsWith("price") && !!sortDirection,
              }
            )}
            value={
              sortBy.startsWith("price") && !!sortDirection
                ? sortDirection === "asc"
                  ? "priceAsc"
                  : "priceDesc"
                : ""
            }
            onChange={(e) => handleSortClick("sortBy", e.target.value)}
          >
            <option value="">Giá</option>
            <option value="priceDesc">Thấp đến cao</option>
            <option value="priceAsc">Cao đến thấp</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProductStoreMobile;
