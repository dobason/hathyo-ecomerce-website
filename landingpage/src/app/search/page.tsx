"use client";

import { SEARCH_TAB, SEARCH_TAB_TITLE } from "@/constants/search";
import { get, map } from "lodash";
import classNames from "classnames";
import PostsTab from "@/containers/Search/PostsTab";
import ProductsTab from "@/containers/Search/ProductsTab";
import { useRouter, useSearchParams } from "next/navigation";
import MapTab from "@/containers/Search/MapTab";
import SearchInput from "@/components/SearchInput";
import qs from "qs";
// import { Metadata } from "next";

export default function Page() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get("tab") || SEARCH_TAB.POST;
  const keyword = searchParams.get("keyword") || "";

  const router = useRouter();

  const TabContent = () => {
    switch (tabQuery) {
      case SEARCH_TAB.POST:
        return <PostsTab />;
      case SEARCH_TAB.PRODUCT:
        return <ProductsTab />;
      case SEARCH_TAB.MAP:
        return <MapTab />;

      default:
        return <PostsTab />;
    }
  };

  return (
    <main>
      <div className="container m-auto py-4 xl:py-8">
        <div className="flex flex-col xl:gap-8 gap-4 justify-center">
          <div className="p-4 bg-white rounded-xl">
            <div className="text-lg text-Moss/700 mb-4">Kết quả tìm kiếm:</div>
            <SearchInput defaultValue={keyword} />
          </div>
          <div className="flex flex-col xl:gap-6 gap-4">
            <div className="flex flex-row">
              {map(SEARCH_TAB, (item) => (
                <div
                  key={item}
                  onClick={() =>
                    router.push(
                      `/search?${qs.stringify({ keyword, tab: item })}`
                    )
                  }
                  className={classNames(
                    "cursor-pointer py-4 px-5 text-base text-Grayiron/400",
                    {
                      "text-Moss/500 border-b-Moss/500 border-b-[4px] font-semibold":
                        tabQuery === item,
                    }
                  )}
                >
                  {get(SEARCH_TAB_TITLE, item, "") || ""}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl">
              <TabContent />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
