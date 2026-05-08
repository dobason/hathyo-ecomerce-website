"use client";
import { memo } from "react";
import Checkbox from "@/components/Checkbox";

const items = [
  { id: 1, label: "Vị Vani" },
  { id: 2, label: "Vị Cam" },
  { id: 3, label: "Vị Dâu" },
  { id: 4, label: "Hương Chanh" },
];

function FilterUser() {
  return (
    <div className="">
      <Checkbox items={items} className="border-b-2 rounded-md" />
    </div>
  );
}

export default memo(FilterUser);
