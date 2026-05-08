"use client";
import Modal from "@/components/Modal";
import React from "react";
import CancelOrder from "./CancelOrder";
import Review from "./Review";
import Close from "@/components/Icons/Close";

type Props = {
  type?: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFilled?: React.Dispatch<React.SetStateAction<boolean>>;
};

function OrderModal({ type, visible, setVisible }: Props) {
  const getTitle = () => {
    switch (type) {
      case "CANCEL_ORDER":
        return "Hủy đơn";
      case "REVIEW":
        return "Đánh giá";

      default:
        return "";
    }
  };

  const getContent = () => {
    switch (type) {
      case "CANCEL_ORDER":
        return <CancelOrder />;
      case "REVIEW":
        return <Review />;

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

export default OrderModal;
