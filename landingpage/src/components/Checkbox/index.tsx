"use client";
import React, { useState, useEffect } from "react";
import ArrowDownDouble from "../Icons/ArrowDownDouble";
interface Item {
  id: number;
  label: string;
}

const Checkbox = ({
  items,
  className = "",
}: {
  items: Item[];
  className?: string;
}) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
  );

  const allChecked = Object.values(checkedItems).every(Boolean);
  const isIndeterminate =
    Object.values(checkedItems).some(Boolean) && !allChecked;

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAllChange = () => {
    const newCheckedStatus = !allChecked;
    const updatedCheckedItems = items.reduce(
      (acc, item) => ({ ...acc, [item.id]: newCheckedStatus }),
      {}
    );
    setCheckedItems(updatedCheckedItems);
  };

  useEffect(() => {
    if (isIndeterminate) {
      (
        document.getElementById("select-all") as HTMLInputElement
      ).indeterminate = true;
    } else {
      (
        document.getElementById("select-all") as HTMLInputElement
      ).indeterminate = false;
    }
  }, [isIndeterminate]);

  const CheckBoxItem = ({
    id,
    label,
    className = "h-5 w-5 text-Moss/400 rounded-md",
    checked,
    onChange,
  }: {
    id: string;
    label: string;
    className?: string;
    checked: boolean;
    onChange: () => void;
  }) => {
    return (
      <label className="inline-flex items-center">
        <input
          id={id}
          type="checkbox"
          className={className}
          checked={checked}
          onChange={onChange}
        />
        <span className="ml-2 text-sm">{label}</span>
      </label>
    );
  };

  return (
    <div className={"p-4 " + className}>
      <ul className="list-none">
        <CheckBoxItem
          id="select-all"
          label="Tất cả"
          checked={allChecked}
          onChange={handleSelectAllChange}
        />
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            <CheckBoxItem
              id={item.id.toString()}
              label={item.label}
              checked={checkedItems[item.id]}
              onChange={() => handleCheckboxChange(item.id)}
            />
          </li>
        ))}
      </ul>
      <div className="flex gap-4">
        <ArrowDownDouble strokeColor="#669F2A" />
        <div className="text-base text-Moss/500 cursor-pointer">Xem thêm</div>
      </div>
    </div>
  );
};

export default Checkbox;
