/* eslint-disable prettier/prettier */
import React from "react";
import Button from "@/components/Button";
import Call from "@/components/Icons/Call";
import Mail from "@/components/Icons/Mail";
import { map } from "lodash";
import Link from "next/link";

const CONTENT = [
  // 1
  {
    header: "1. Phương thức vận chuyển của Hathyo",
    contents: (
      <ul className="list-disc ml-5">
        <li className="text-justify pb-3">
          Gồm 2 phương thức vận chuyển chính: Hỏa Tốc, Tiêu chuẩn
        </li>
        <li className="text-justify pb-3">
          Đối tượng áp dụng: Tất cả Người Bán
        </li>
      </ul>
    ),
  },
  // 2
  {
    header: "2. Thông tin về phương thức vận chuyển",
    contents: (
      <ul className="list-disc ml-5">
        <li className="text-justify py-3">
          Phương thức vận chuyển chia theo đơn vị vận chuyển
        </li>
        <table className="table-auto border-collapse border border-gray-300 w-full xl:w-3/4 mb-3">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Hỏa tốc</th>
              <th className="border border-gray-300 px-4 py-2">Tiêu chuẩn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                <div className="my-3">
                  <ul className="list-disc ml-3">
                    <li className="text-justify pb-3">Ahamove</li>
                    <li className="text-justify pb-3">Giao hàng tiết kiệm (áp dụng nội thành HCM và HN)</li>
                  </ul>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
              <div className="my-3">
                  <ul className="list-disc ml-3">
                    <li className="text-justify pb-3">Giao hàng nhanh (GHN)</li>
                    <li className="text-justify pb-3">Giao hàng tiết kiệm (GHTK)</li>
                    <li className="text-justify pb-3">Ninja Van</li>
                    <li className="text-justify pb-3">Viettel Post</li>
                    <li className="text-justify pb-3">Best Express</li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <li className="text-justify py-3">
          Quy định về khối lượng và kích thước đóng gói hàng
        </li>
        <table className="table-auto border-collapse border border-gray-300 w-full xl:w-3/4 mb-3">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Phương thức vận chuyển</th>
              <th className="border border-gray-300 px-4 py-2">Giới hạn tối đa 1 cạnh (cm)</th>
              <th className="border border-gray-300 px-4 py-2">Giới hạn cân nặng (kg)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                <p className="my-3 ml-3">Hỏa tốc</p>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <p className="my-3 ml-3">50</p>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <p className="my-3 ml-3">30</p>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                <p className="my-3 ml-3">Tiêu chuẩn</p>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <p className="my-3 ml-3">150</p>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <p className="my-3 ml-3">30</p>
              </td>
            </tr>
          </tbody>
        </table>
      </ul>
    ),
  },
  // 3
  {
    header: "3. Người bán có thể tự lựa chọn đơn vị vận chuyển",
    contents: (
      <ul className="list-disc ml-5">
        <li className="text-justify pb-3">
          Hathyo hiện đang hợp tác với nhiều đơn vị vận chuyển (ĐVVC) để cung cấp trải nghiệm giao hàng tốt nhất cho cả Người mua và Người bán. Người bán có thể chủ động lựa chọn ĐVVC phù hợp dựa trên các yếu tố như phạm vi hoạt động, giới hạn về cân nặng và kích thước, cũng như chất lượng dịch vụ.
        </li>
        <li className="text-justify pb-3">
          Các chỉ số như Tỷ lệ lấy hàng đúng hạn, Tỷ lệ giao hàng đúng hạn, Tỷ lệ giao hàng không thành công, và Tỷ lệ hàng hóa bị thất lạc hoặc hư hại của ĐVVC luôn được cập nhật để tối ưu hóa dịch vụ.
        </li>
      </ul>
    ),
  },
  // 4
  {
    header: "4. Lưu ý dành cho Người Bán",
    contents: (
      <ul className="list-disc ml-5">
        <li className="text-justify pb-3">
          Người bán cần nắm rõ Thời hạn xử lý đơn và theo dõi thời gian làm việc của các đơn vị vận chuyển để xử lý đơn hàng kịp thời. Ngoài ra, người bán có thể chủ động ra các bưu cục của ĐVVC để gửi hàng. Tham khảo Danh sách các điểm gửi hàng gần bạn.
        </li>
        <li className="text-justify pb-3">
        Chuẩn bị Biên bản giao nhận để dễ dàng đối chiếu/đồng kiểm đơn hàng đã giao khi cần thiết.
        </li>
        <li className="text-justify pb-3">
        Tham khảo Hướng dẫn cách đóng gói hàng hóa theo đúng tiêu chuẩn
        </li>
      </ul>
      
    ),
  },
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
