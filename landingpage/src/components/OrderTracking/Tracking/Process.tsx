/* eslint-disable @next/next/no-img-element */
"use client";
import Tracking from "@/components/Icons/Tracking";
import classNames from "classnames";
import { map } from "lodash";

interface Props {
  orderStatus: string;
}

interface ProcessElement {
  status: string;
  dateTime: string;
  address: string;
}

const test_data = [
  {
    status: "process",
    dateTime: "",
    address:
      "Địa chỉ nhận hàng - 01 Nguyễn Văn Linh, Nam Dương, Hải Châu, Đà Nẵng ",
  },
  {
    status: "done",
    dateTime: "06/03/2024 - 10:00:00",
    address:
      "Bưu cục DNG Hải Châu Hub - K114/7, Hải Hồ, Thanh Bình, Hải Châu, Đà Nẵng",
  },
  {
    status: "done",
    dateTime: "02/03/2024 - 15:00:00",
    address:
      "Kho phân loại hàng hóa Da Nang SOC - Hòa Thuận Tây, Hải Châu, Đà Nẵng",
  },
  {
    status: "done",
    dateTime: "29/02/2024 - 12:00:00",
    address: "Kho phân loại hàng hóa HN SOC - Phúc Lợi, Long Biên, Hà Nội ",
  },
];

function Process({ orderStatus }: Props) {
  const ProcessElement = ({ status, dateTime, address }: ProcessElement) => {
    return (
      <div
        className={classNames(
          "p-2 flex flex-row gap-4 border-4 border-white ",
          {
            "border-r-Moss/400": status === "process",
            "border-r-Moss/50": status === "done",
          }
        )}
      >
        <div className="w-[20px]">
          {status === "done" ? (
            <Tracking fillColor="#0A6D3D" strokeColor="#FAFDF7" />
          ) : (
            <Tracking strokeColor="#0A6D3D" />
          )}
        </div>
        <div className="w-[calc(100%-20px)] flex flex-col">
          <div className="flex flex-row justify-start gap-4">
            <div className="text-base text-gray-600 font-semibold">
              {status === "done" ? "Đã Giao" : "Đang Giao"}
            </div>
            <div className="text-base text-gray-600 font-normal">
              {dateTime}
            </div>
          </div>
          <div className="text-base text-gray-400 font-normal">{address}</div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="bg-white rounded-xl my-5 px-4 text-white shadow-Shadow/md">
        <div className="py-4 border border-white border-b-gray-200">
          <div className="flex flex-row justify-start">
            <div className="text-lg text-gray-600 font-bold">Tiến trình</div>
          </div>
        </div>
        <div className="py-4">
          <div className="flex flex-col">
            {orderStatus === "packaging" ? (
              <ProcessElement
                status="process"
                dateTime=""
                address="Đơn hàng đang được chuyển giao cho đơn vị vận chuyển"
              />
            ) : (
              map(test_data, (item: ProcessElement) => (
                <ProcessElement
                  status={item.status}
                  dateTime={item.dateTime}
                  address={item.address}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Process;
