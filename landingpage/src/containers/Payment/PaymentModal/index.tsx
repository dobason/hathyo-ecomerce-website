"use client";
import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import Close from "@/components/Icons/Close";

import Promotion from "./Promotion";
import UserInformation from "./UserInformation";
import UserAddress from "./UserAddress";
import { AddressItemResponse } from "@/types/address";

type Props = {
  type?: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setIsFilled?: React.Dispatch<React.SetStateAction<boolean>>;
};

function PaymentModal({
  type,
  visible,
  setVisible,
  setType,
  setIsFilled,
}: Props) {
  const [actionType, setActionType] = useState("create");
  const [dataUpdate, setDataUpdate] = useState<
    AddressItemResponse | undefined
  >();

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Reset scroll when modal is closed
    }
    return () => {
      document.body.style.overflow = ""; // Reset on unmount or when modal closes
    };
  }, [visible]);

  const getTitle = () => {
    switch (type) {
      case "USER_INFORMATION":
        return "Thông tin người nhận";
      case "USER_ADDRESS":
        return "Địa chỉ của tôi";
      case "PROMOTION":
        return "Khuyến mãi";
      default:
        return "";
    }
  };

  const getContent = () => {
    switch (type) {
      case "USER_INFORMATION":
        return (
          <UserInformation
            actionType={actionType}
            dataUpdate={dataUpdate}
            setActionType={setActionType}
            setDataUpdate={setDataUpdate}
            setIsFilled={setIsFilled}
            setVisible={setVisible}
            setType={setType}
          />
        );
      case "PROMOTION":
        return <Promotion />;
      case "USER_ADDRESS":
        return (
          <UserAddress
            actionType={actionType}
            dataUpdate={dataUpdate}
            setActionType={setActionType}
            setDataUpdate={setDataUpdate}
            setVisible={setVisible}
            setType={setType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      onClose={() => setVisible(!visible)}
      header={""}
      visible={visible}
      title={getTitle()}
      footer={null}
    >
      <div
        onClick={() => setVisible(!visible)}
        className=" absolute top-4 right-4 cursor-pointer"
      >
        <Close />
      </div>
      {getContent()}
    </Modal>
  );
}

export default PaymentModal;
