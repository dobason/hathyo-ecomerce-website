import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import ArrowUp from "@/components/Icons/ArrowUp";
import ArrowDown from "@/components/Icons/ArrowDown";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type Category = {
  id: number;
  name: string;
  icon?: string;
  childCategories?: Category[];
};

interface Props {
  category: Category;
}

const Collapse: React.FC<Props> = ({ category }) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const shopCategoryIdParam = searchParams.get("shopCategoryId") ?? "";

  // Correctly retrieve parameter
  const isActive = shopCategoryIdParam === String(category.id); // Example condition

  const isCategoryActive = useCallback(
    (cat: Category): boolean => {
      if (String(cat.id) === shopCategoryIdParam) {
        return true;
      }
      if (cat.childCategories) {
        return cat.childCategories.some(isCategoryActive);
      }
      return false;
    },
    [shopCategoryIdParam]
  );
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (
      isActive &&
      category.childCategories &&
      category.childCategories.length > 0
    ) {
      setVisible(true);
    }
  }, [isActive, category.childCategories]);

  // Set visibility based on active category state
  useEffect(() => {
    setVisible(isCategoryActive(category));
  }, [category, isCategoryActive]);

  const handleCategoryClick = () => {
    if (category.childCategories && category.childCategories.length > 0) {
      setVisible(!visible);
      router.push(
        pathname +
          "?" +
          createQueryString("shopCategoryId", String(category.id))
      );
    } else {
      router.push(
        pathname +
          "?" +
          createQueryString("shopCategoryId", String(category.id))
      );
    }
  };

  return (
    <div>
      <div
        className={`flex flex-row cursor-pointer items-center p-3 ${
          isActive ? "bg-Moss/50" : ""
        }`}
        onClick={handleCategoryClick}
      >
        {category.icon && (
          <Image
            src={category.icon}
            alt={category.name}
            width={32}
            height={32}
            className="mr-3"
          />
        )}
        <div className="flex-grow">
          <div className="text-md text-Grayiron/700 font-semibold">
            {category.name}
          </div>
        </div>
        {category.childCategories && category.childCategories.length > 0 && (
          <div>{visible ? <ArrowUp /> : <ArrowDown />}</div>
        )}
      </div>
      {visible &&
        category.childCategories &&
        category.childCategories.length > 0 && (
          <div className="pl-5">
            {category.childCategories.map((child) => (
              <Collapse key={child.id} category={child} />
            ))}
          </div>
        )}
    </div>
  );
};

export default Collapse;
