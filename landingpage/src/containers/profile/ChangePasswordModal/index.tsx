"use client";

import React, { useState } from "react";
import Modal from "@/components/Modal";
import ChangePassWord from "./ChangePassword";
import Close from "@/components/Icons/Close";
import Edit from "@/components/Icons/Edit";
import { useAppSelector } from "@/store";

function ChangePasswordModal() {
  const [visible, setVisible] = useState(false);
  const userInfo = useAppSelector((state) => state.user.userInfo);

  function hiddenPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.length < 5) {
      return phoneNumber;
    }

    const hiddenSection: string = phoneNumber.slice(0, -4).replace(/./g, "*");
    const visibleSection: string = phoneNumber.slice(-4);

    return hiddenSection + visibleSection;
  }

  return (
    <>
      <div className="mb-5">
        <div className="mb-3 flex justify-start text-md text-gray-500 font-normal">
          Số điện thoại
        </div>
        <div className="flex flex-row justify-start gap-4 cursor-pointer">
          <div className="text-md text-[#98A2B3] font-normal">
            {hiddenPhoneNumber(userInfo?.phone ?? "0987654321")}
          </div>
          <div
            className="ml-4 text-md text-Warning/400 font-normal flex flex-row"
            onClick={() => {
              setVisible(true);
            }}
          >
            Đổi mật khẩu
            <div className="ml-1">
              <Edit />
            </div>
          </div>
        </div>
      </div>
      <Modal
        onClose={() => setVisible(!visible)}
        visible={visible}
        title="Đổi mật khẩu"
        footer={null}
      >
        <div
          onClick={() => setVisible(!visible)}
          className=" absolute top-1 right-1 cursor-pointer"
        >
          <Close />
        </div>
        <ChangePassWord />
      </Modal>
    </>
  );
}

export default ChangePasswordModal;
