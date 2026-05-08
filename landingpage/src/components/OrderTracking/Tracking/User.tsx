/* eslint-disable @next/next/no-img-element */
"use client";
import Edit from "@/components/Icons/Edit";
import classNames from "classnames";

interface Props {
  orderStatus: string;
}

function User({ orderStatus }: Props) {
  return (
    <>
      <div className="bg-white rounded-xl my-5 px-4 text-white shadow-Shadow/md">
        <div className="py-4 border border-white border-b-gray-200">
          <div className="flex flex-row justify-between">
            <div className="text-lg text-gray-600 font-bold">
              Thông tin người nhận
            </div>
            {["order", "confirm"].includes(orderStatus) && (
              <div className="flex flex-row gap-2">
                <div className="text-base text-[#FDB022] font-medium cursor-pointer">
                  Chỉnh sửa
                </div>
                <Edit />
              </div>
            )}
          </div>
        </div>
        <div className="py-6">
          <div
            className={classNames("flex gap-4 ", {
              "flex-col": ["shipping", "packaging"].includes(orderStatus),
              "flex-row justify-between": ["order", "confirm"].includes(
                orderStatus
              ),
            })}
          >
            <div className="flex flex-col items-start">
              <div className="text-base text-gray-600 font-semibold">
                Họ và tên
              </div>
              <div className="text-base text-gray-400 font-normal">
                Nguyễn Đình
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-base text-gray-600 font-semibold">
                Số điện thoại
              </div>
              <div className="text-base text-gray-400 font-normal">
                (+84) 765891281
              </div>
            </div>
            <div className="pb-4 flex flex-col items-start">
              <div className="text-base text-gray-600 font-semibold">
                Địa chỉ nhận hàng
              </div>
              <div className="text-base text-gray-400 font-normal">
                01 Nguyễn Văn Linh, Nam Dương, Hải Châu, Đà Nẵng
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
