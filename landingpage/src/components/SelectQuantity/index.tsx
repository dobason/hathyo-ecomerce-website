"use client";

import React from "react";
import Button from "../Button";

type Props = {
  // products: ProductItem[];
  value?: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

function SelectQuantity({ quantity, setQuantity }: Props) {
  const onMinus = () => (quantity > 1 ? setQuantity(quantity - 1) : null);
  const onPlus = () => setQuantity(quantity + 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value >= 0 ? value : 0);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="body-sm-semibold text-Grayiron/700 xl:block hidden">
        Chọn số lượng
      </div>
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          onClick={onMinus}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-sm px-3 py-1 h-8 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          value={quantity}
          onChange={handleChange}
          className="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-Moss/500 focus:border-Moss/500 block w-full py-1"
          placeholder="999"
          required
        />
        <button
          type="button"
          onClick={onPlus}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-sm px-3 py-1 h-8 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
      {/* <div className="flex flex-row rounded-sm border-Grayiron/200 border">
        <button onClick={onMinus} className="p-2">
          -
        </button>
        <div className="text-lg w-12 text-center flex items-center justify-center">
          {quantity}
        </div>
        <button onClick={onPlus} className="p-2">
          +
        </button>
      </div> */}
    </div>
  );
}

export default SelectQuantity;
