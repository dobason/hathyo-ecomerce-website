"use client";

import React, { useState, Fragment } from "react";
import Button from "@/components/Button";
import AddressModal from "../AddressModal";
import { AddressItemResponse } from "@/types/address";
import { useAppDispatch } from "@/store";
import { updateAddressItem, removeAddressItem } from "@/store/addressSlice";

type Props = {
  item: AddressItemResponse;
  handleUpdate: (item: AddressItemResponse) => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionType: string;
  dataUpdate: AddressItemResponse | undefined;
  setActionType: React.Dispatch<React.SetStateAction<string>>;
  setDataUpdate: React.Dispatch<
    React.SetStateAction<AddressItemResponse | undefined>
  >;
};

export default function AddressCard({
  item,
  handleUpdate,
  actionType,
  setActionType,
  dataUpdate,
  setDataUpdate,
}: Props) {
  const [visibleModal, setVisibleModal] = useState(false);
  const dispatch = useAppDispatch();

  const formatAddress = (
    address: string,
    ward: string,
    district: string,
    province: string
  ) => [address, ward, district, province].filter(Boolean).join(", ");

  const handleUpdateDefault = () => {
    dispatch(updateAddressItem({ ...item, isDefault: true }));
  };

  const handleRemove = () => {
    dispatch(removeAddressItem({ id: item.id }));
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex justify-between items-start gap-4">
        {/* Left: Info */}
        <div className="flex flex-col gap-2 text-sm text-gray-700 w-full">
          {/* Name + Phone */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">{item.receiverName}</span>
            <span className="text-gray-500">{item.receiverPhoneNumber}</span>
          </div>

          {/* Address */}
          <div className="text-gray-500">
            {formatAddress(
              item.customerStreetAddress,
              item.customerWard,
              item.customerDistrict,
              item.customerProvince
            )}
          </div>

          {/* Default flag or set default */}
          {item.isDefault ? (
            <span className="text-xs font-semibold border border-Moss/500 text-Moss/500 px-2 py-1 rounded w-fit">
              Mặc định
            </span>
          ) : (
            <button
              onClick={handleUpdateDefault}
              className="text-xs font-medium text-orange-600 hover:text-orange-500"
            >
              Đặt làm địa chỉ mặc định
            </button>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col items-end gap-2 min-w-[80px]">
          <button
            className="text-sm text-Moss/500 hover:underline"
            onClick={() => handleUpdate(item)}
          >
            Cập nhật
          </button>
          {!item.isDefault && (
            <button
              className="text-sm text-red-500 hover:underline"
              onClick={handleRemove}
            >
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* Modal (sử dụng chung từ cha nhưng vẫn giữ state mở/đóng riêng nếu cần) */}
      <AddressModal
        actionType={actionType}
        setActionType={setActionType}
        visible={visibleModal}
        setVisible={setVisibleModal}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </div>
  );
}
