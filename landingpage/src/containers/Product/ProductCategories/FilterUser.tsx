"use client";
import { memo } from "react";
import SearchInput from "@/components/SearchInput";
import Checkbox from "@/components/Checkbox";

const items = [
  { id: 1, label: "Trẻ em" },
  { id: 2, label: "Người lớn" },
  { id: 3, label: "Người cao tuổi" },
  { id: 4, label: "Người trưởng thành" },
];

function FilterUser() {
  return (
    <div className="">
      <SearchInput placeholder="Tìm kiếm theo tên" />
      <Checkbox items={items} className="border-b-2" />
    </div>
  );
}

export default memo(FilterUser);
