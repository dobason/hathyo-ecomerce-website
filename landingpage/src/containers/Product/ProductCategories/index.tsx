"use client";
import classNames from "classnames";
import Collapse from "./Collapse";
import CollapseCate from "./CollapseCate";
import Sort from "@/components/Icons/Sort";
import CategoryIcon from "@/components/Icons/CategoryIcon";
import FilterUser from "./FilterUser";
import FilterPrice from "./FilterPrice";
import FilterTaste from "./FilterTaste";
import { map } from "lodash";
import { Category } from "@/types";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
  categories?: Category[];
};

export default function ProductCategories({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigateAll = () => {
    router.push(pathname);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-white flex flex-col gap-2 py-4">
        <div
          className="p-2 flex items-center gap-1 cursor-pointer"
          onClick={handleNavigateAll}
        >
          <CategoryIcon />
          <div className="text-base text-Grayiron/700 font-bold">
            Tất Cả Sản Phẩm
          </div>
        </div>
        {map(categories, (item: Category, idx: number) => (
          <CollapseCate category={item} key={`${item.id}-${idx}`} />
        ))}
      </div>
      {/* <div className="rounded-xl bg-white flex flex-col gap-2 py-4">
        <div className="p-2 flex items-center gap-1">
          <Sort />
          <div className="text-base text-Grayiron/700 font-bold">
            Bộ lọc nâng cao
          </div>
        </div>
        <Collapse
          heading="Đối tượng sử dụng"
          className={classNames(
            "border-b-Moss/100 border-b-[0.5px] hover:bg-Moss/50 hover:border-l-Moss/400 hover:border-l-[4px] justify-center"
          )}
          childComponent={<FilterUser />}
        />
        <Collapse
          heading="Giá bán"
          className={classNames(
            "border-b-Moss/100 border-b-[0.5px] hover:bg-Moss/50 hover:border-l-Moss/400 hover:border-l-[4px] justify-center"
          )}
          childComponent={<FilterPrice />}
        />
        <Collapse
          heading="Mùi vị/ Mùi hương"
          className={classNames(
            "border-b-Moss/100 border-b-[0.5px] hover:bg-Moss/50 hover:border-l-Moss/400 hover:border-l-[4px] justify-center"
          )}
          childComponent={<FilterTaste />}
        />
        <Collapse
          heading="Nước sản xuất"
          className={classNames(
            "border-b-Moss/100 border-b-[0.5px] hover:bg-Moss/50 hover:border-l-Moss/400 hover:border-l-[4px] justify-center"
          )}
        />
        <Collapse
          heading="Thương hiệu"
          className={classNames(
            "border-b-Moss/100 border-b-[0.5px] hover:bg-Moss/50 hover:border-l-Moss/400 hover:border-l-[4px] justify-center"
          )}
        />
        <Collapse
          heading="Chỉ định"
          className={classNames(
            "border-b-Moss/100 border-b-[0.5px] hover:bg-Moss/50 hover:border-l-Moss/400 hover:border-l-[4px] justify-center"
          )}
        />
      </div> */}
    </div>
  );
}
