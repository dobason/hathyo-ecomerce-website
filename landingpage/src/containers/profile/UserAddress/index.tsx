"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchAddressItems } from "@/store/addressSlice";
import { AddressItemResponse } from "@/types/address";

import AddressCard from "./AddressCard";
import Button from "@/components/Button";
import Add from "@/components/Icons/Add";
import AddressModal from "../AddressModal";

export default function UserAddress() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [actionType, setActionType] = useState<string>("create");
  const [dataUpdate, setDataUpdate] = useState<
    AddressItemResponse | undefined
  >();

  const addresses = useAppSelector((state) => state.address.addresses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAddressItems());
  }, [dispatch]);

  const handleUpdate = (item: AddressItemResponse) => {
    setActionType("update");
    setDataUpdate(item);
    setVisibleModal(true);
  };

  const handleAdd = () => {
    setActionType("create");
    setDataUpdate(undefined);
    setVisibleModal(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md">
      <div className="p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Địa chỉ của tôi
          </h2>
          <Button size="small" type="primary" onClick={handleAdd}>
            <div className="flex items-center gap-2">
              <Add strokeColor="#ffffff" />
              <span>Thêm Địa chỉ mới</span>
            </div>
          </Button>
        </div>

        {/* Address List */}
        <div className="flex flex-col gap-4 xl:gap-6">
          {addresses?.map((item, idx) => (
            <AddressCard
              key={`address-${idx}-${item.id}`}
              item={item}
              handleUpdate={handleUpdate}
              actionType={actionType}
              setActionType={setActionType}
              visible={visibleModal}
              setVisible={setVisibleModal}
              dataUpdate={dataUpdate}
              setDataUpdate={setDataUpdate}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
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
