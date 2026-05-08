"use client";
import { MERCHANT_TAB } from "@/constants/merchant";
import { useState } from "react";
import ProductTab from "./ProductTab";
import { map } from "lodash";
import classNames from "classnames";
import MerchantInfoTab from "./MerchantInfoTab";
import PostTab from "./PostTab";
import { MerchantResponse } from "@/types";
// import { Metadata } from "next";

type Props = {
  className?: string;
  id: string | number;
  data: MerchantResponse;
};

export default function TabContainer({ id, className, data }: Props) {
  const [tab, setTab] = useState(MERCHANT_TAB.product);

  const TabContent = () => {
    switch (tab) {
      case MERCHANT_TAB.product:
        return <ProductTab id={id} />;
      case MERCHANT_TAB.post:
        return <PostTab />;
      case MERCHANT_TAB.merchant_info:
        return <MerchantInfoTab data={data} />;

      default:
        return null;
    }
  };
  return (
    <div className="py-6 flex flex-col gap-4">
      <div className="flex flex-row">
        {map(MERCHANT_TAB, (item, key) => (
          <div
            key={key}
            onClick={() => setTab(item)}
            className={classNames(
              "cursor-pointer xl:py-4 py-2 px-4 xl:px-5 body-semibold text-Grayiron/400",
              {
                "text-Moss/500 border-b-Moss/500 border-b-[4px]": tab === item,
              }
            )}
          >
            {item}
          </div>
        ))}
      </div>
      <TabContent />
    </div>
  );
}
