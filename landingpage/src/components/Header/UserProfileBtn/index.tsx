"use client";
import React, { useState } from "react";
import User from "@/components/Icons/User";
import Collaborators from "@/components/Icons/Collaborators";
import UserModal from "./UserModal";

function UserProfileBtn() {
  const [visible, setVisible] = useState(false);

  const onToggle = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div onMouseEnter={onToggle}>
        <User className="w-10 h-10" fillColor="#0A6D3D" />
      </div>
      <UserModal visible={visible} onClose={() => setVisible(false)}>
        <div className="flex flex-col justify-center items-center gap-2">
          <User className="w-10 h-10" fillColor="#0A6D3D" />
          <div className="text-sm font-semibold">Tài khoản 131615</div>
          <div className="bg-Warning/100 rounded-full px-4 py-2 text-Warning/500 text-xs">
            Khách hàng
          </div>
          {/* <div className="w-full p-4 border border-dashed border-white border-b-gray-300">
            <div className="w-full flex flex-row items-center justify-around rounded-lg px-4 py-2 bg-gradient-to-r from-Moss/600 to-Moss/400">
              <Collaborators />
              <div className="text-white body-sm-medium">
                Trở thành cộng tác viên
              </div>
            </div>
          </div> */}
          <div className="w-full py-2 px-4 flex flex-start text-sm font-normal text-Moss/600 hover:bg-Moss/50 cursor-pointer">
            Thông tin đơn hàng
          </div>
          <div className="w-full py-2 px-4 flex flex-start text-sm font-normal text-Moss/600 hover:bg-Moss/50 cursor-pointer">
            Lịch sử đơn hàng
          </div>
          <div className="w-full py-2 px-4 flex flex-start text-sm font-normal text-red-600 hover:bg-red-50 cursor-pointer">
            Đăng xuất
          </div>
        </div>
      </UserModal>
    </>
  );
}

export default UserProfileBtn;
