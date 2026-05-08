"use client";

import { Dispatch, SetStateAction } from "react";
import { ICartItem } from "@/types/cart-item";

type Props = {
  initQuantity: number;
  setProductInfor?: Dispatch<SetStateAction<ICartItem>>;
  onChangeQuantity?: (newQuantity: number) => void;
};

const QuantityControl = ({
  initQuantity,
  setProductInfor,
  onChangeQuantity,
}: Props) => {
  const handleChange = (newQty: number) => {
    if (setProductInfor) {
      setProductInfor((prev) => ({
        ...prev,
        quantity: Math.max(newQty, 0),
      }));
    }
    if (typeof onChangeQuantity === "function") {
      onChangeQuantity(Math.max(newQty, 0));
    }
  };

  const onMinus = () => {
    if (initQuantity > 1) {
      handleChange(initQuantity - 1);
    }
  };

  const onPlus = () => {
    handleChange(initQuantity + 1);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-[112px]">
      <button
        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:text-gray-300"
        onClick={onMinus}
        disabled={initQuantity <= 1}
        type="button"
      >
        −
      </button>
      <div className="flex-1 text-center text-sm text-gray-800 px-2">
        {initQuantity}
      </div>
      <button
        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
        onClick={onPlus}
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
