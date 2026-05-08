/* eslint-disable prettier/prettier */
import React from "react";
import Button from "@/components/Button";
import Call from "@/components/Icons/Call";
import Mail from "@/components/Icons/Mail";
import { map } from "lodash";
import Link from "next/link";

const CONTENT = [
  {
    header: "PHƯƠNG THỨC THANH TOÁN",
    contents: (
      <div className="m-3 space-y-4">
        <p className="text-justify indent-7">
          Hiện tại, Hathyo chỉ chấp nhận hình thức thanh toán khi nhận hàng (COD).
        </p>
        <p className="text-justify indent-7 font-semibold">Thanh toán khi nhận hàng (COD)</p>
        <ul className="list-decimal list-inside space-y-1 pl-5">
          <li>Người mua lựa chọn sản phẩm</li>
          <li>Người mua xác nhận đặt hàng trực tuyến</li>
          <li>Hathyo.com chuyển thông tin cho Người bán để chuẩn bị đơn hàng</li>
          <li>Đơn vị vận chuyển sẽ lấy hàng từ Người bán và giao đến Người mua</li>
          <li>Người mua nhận hàng</li>
          <li>Hathyo.com đối soát và chuyển lại tiền hàng cho Người bán</li>
        </ul>
        <p className="text-justify indent-7 font-semibold">Thanh toán giữa Người bán – Hathyo</p>
        <ul className="list-disc list-inside space-y-1 pl-5">
          <li>Đơn vị vận chuyển sẽ thu hộ và chuyển tiền lại cho sàn Hathyo</li>
          <li>Số tiền được giữ tại Hathyo trong khoảng thời gian cài đặt (10–14 ngày) để xử lý tranh chấp</li>
          <li>Sau thời gian đó, tiền được chuyển cho người bán sau khi trừ hoa hồng</li>
        </ul>
      </div>
    )
  }
];


function Container() {
  return (
    <main>
      <div className="container m-auto xl:py-8 py-4 xl:gap-8 gap-4 flex-col flex">
        <div className="flex flex-col justify-center items-center mx-auto gap-2 xl:max-w-6xl">
          <div className="flex justify-center text-center">
            <div className="heading-3 text-Moss/700">
              Quy trình mua hàng trên Hathyo
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full">
              <div className="text-md text-Grayiron/600 mt-3 text-justify">
                Khách hàng có thể đặt mua sản phẩm, dịch vụ trực tuyến ở website hoặc ứng dụng Hathyo theo như quy trình mua hàng cơ bản dưới đây.
              </div>
            </div>
          </div>
          {map(CONTENT, (parent: any) => (
            <div className="flex">
              <div className="w-full">
                <div className="text-xl !text-Moss/600 font-semibold summary-text">
                  {parent.header}
                </div>
                <div className="text-md text-Grayiron/600 mt-3">
                  {parent.contents}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col xl:gap-4 gap-2">
        <div className="flex justify-center">
          <div className="font-semibold text-center text-Moss/700">
            Bạn có muốn tìm thêm thông tin gì không?
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <Button>
            <Link href="tel:0084-827000248">
              <div className="flex justify-center items-center gap-2 body-semibold text-Moss/500">
                <Call className="w-5 h-5"></Call>
                <p className="body-sm-medium">0827000248</p>
              </div>
            </Link>
          </Button>
          <Button>
            <Link href="mailto:email@hathyo.com">
              <div className="flex justify-center items-center gap-2 body-semibold text-Moss/500">
                <Mail className="w-5 h-5"></Mail>
                <p className="body-sm-medium">Email Hathyo</p>
              </div>
            </Link>
          </Button>
        </div>

        </div>

      </div>
    </main>
  );
}

export default Container;
