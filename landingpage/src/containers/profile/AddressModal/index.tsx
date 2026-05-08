"use client";
// import Button from "@/components/Button";
import { memo, useState } from "react";
import Modal from "@/components/Modal";
import Close from "@/components/Icons/Close";
import AddressForm from "./AddressForm";
import { AddressItemResponse } from "@/types/address";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionType: string;
  dataUpdate: AddressItemResponse | undefined;
  setActionType: React.Dispatch<React.SetStateAction<string>>;
  setDataUpdate: React.Dispatch<
    React.SetStateAction<AddressItemResponse | undefined>
  >;
};

function AddressModal({
  visible,
  setVisible,
  actionType,
  setActionType,
  dataUpdate,
  setDataUpdate,
}: Props) {
  const onClose = () => {
    setVisible(false);
  };

  const getHeader = () => {
    switch (actionType) {
      case "create":
        return (
          <div className="mb-3 text-lg text-Grayiron/600">Địa chỉ mới</div>
        );
      case "update":
        return (
          <div className="mb-3 text-lg text-Grayiron/600">Cập nhật địa chỉ</div>
        );
      default:
        return null;
    }
  };

  const getContent = () => {
    return (
      <AddressForm
        actionType={actionType}
        dataUpdate={dataUpdate}
        setActionType={setActionType}
        setDataUpdate={setDataUpdate}
        setVisible={setVisible}
      />
    );
  };

  return (
    <>
      <Modal
        onClose={() => onClose()}
        header={getHeader()}
        visible={visible}
        // title={getStepTitle}
        footer={null}
      >
        <div
          onClick={() => onClose()}
          className="absolute xl:top-4 xl:right-4 top-1 right-1 cursor-pointer"
        >
          <Close />
        </div>
        {getContent()}
      </Modal>
    </>
  );
}

export default memo(AddressModal);
