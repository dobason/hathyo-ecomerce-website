"use client";

import React, { memo, useState, Fragment } from "react";
import classNames from "classnames";
import Edit from "@/components/Icons/Edit";
import Location from "@/components/Icons/Location";
import Call from "@/components/Icons/Call";
import PaymentModal from "./PaymentModal";
import { useAppSelector } from "@/store";
import { User } from "lucide-react";

type Props = {
  className?: string;
};

function UserInformation({ className = "" }: Props) {
  const addressSelected = useAppSelector(
    (state) => state.address.addressSelected
  );

  const [visibleModal, setVisibleModal] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [typeModal, setTypeModal] = useState("USER_ADDRESS");

  const toggleModal = () => {
    setVisibleModal((prev) => !prev);
    setTypeModal("USER_ADDRESS");
  };
  const toggleModalAdd = () => {
    setTypeModal("USER_INFORMATION");
    setVisibleModal(true);
  };

  const formatAddress = (
    street?: string,
    ward?: string,
    district?: string,
    province?: string
  ) => [street, ward, district, province].filter(Boolean).join(", ");

  const addressInfo = addressSelected
    ? formatAddress(
        addressSelected.customerStreetAddress,
        addressSelected.customerWard,
        addressSelected.customerDistrict,
        addressSelected.customerProvince
      )
    : "";

  return (
    <Fragment>
      <div
        className={classNames(
          "rounded-2xl overflow-hidden shadow-md",
          isFilled ? "bg-Moss/50" : "bg-white",
          className
        )}
      >
        <div className="line-decor"></div>

        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <h2 className="text-lg text-gray-700 font-bold">
              Thông tin người nhận
            </h2>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleModal}
            >
              <span className="text-base text-[#FDB022] font-medium">
                Chỉnh sửa
              </span>
              <Edit />
            </div>
          </div>

          {/* Content */}
          {!addressSelected ? (
            <div className="text-center py-6 space-y-3">
              <div className="text-base text-Grayiron/600 font-normal">
                Người dùng chưa cập nhật địa chỉ nhận hàng
              </div>
              <div
                className="inline-flex items-center gap-2 text-[#FDB022] text-base font-medium cursor-pointer"
                onClick={toggleModalAdd}
              >
                <span>Thêm ngay</span>
                <Edit />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 xl:flex-row xl:justify-between xl:items-center py-4">
              {/* Receiver + Phone */}
              <div className="xl:w-1/2 flex flex-col xl:flex-row gap-6 xl:items-center">
                <div className="flex item-center gap-2 text-base text-Grayiron/600 font-normal">
                  <User className="w-5 h-5 text-green-900"/>
                  {addressSelected.receiverName || "Tên người nhận"}
                </div>
                <div className="flex items-center gap-2 text-base text-Grayiron/600 font-normal">
                  <Call className="w-5 h-5" />
                  <span>
                    {addressSelected.receiverPhoneNumber || "Số điện thoại"}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="xl:w-1/2 flex items-start xl:justify-end gap-2 text-base text-Grayiron/600 font-normal">
                <Location />
                <span>{addressInfo || "Địa chỉ nhận hàng"}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {visibleModal && (
        <PaymentModal
          type={typeModal}
          setType={setTypeModal}
          visible={visibleModal}
          setVisible={setVisibleModal}
          setIsFilled={setIsFilled}
        />
      )}
    </Fragment>
  );
}

export default memo(UserInformation);
