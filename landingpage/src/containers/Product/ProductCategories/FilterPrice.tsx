"use client";
import { memo } from "react";
import Button from "@/components/Button";
import { map } from "lodash";

const items = [
  { id: 1, label: "Dưới 100.000đ" },
  { id: 2, label: "100.000đ đến 300.000đ" },
  { id: 3, label: "100.000đ đến 300.000đ" },
  { id: 4, label: "Trên 500.000đ" },
];

function FilterPrice() {
  return (
    <div className="">
      {map(items, (item: any) => (
        <Button className="w-full py-5 my-2 text-Moss/600 bg-Moss/50 body-xs-medium">
          {item.label}
        </Button>
      ))}
    </div>
  );
}

export default memo(FilterPrice);
