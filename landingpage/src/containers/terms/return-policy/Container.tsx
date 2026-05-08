/* eslint-disable prettier/prettier */
import React from "react";
import Button from "@/components/Button";
import Call from "@/components/Icons/Call";
import Mail from "@/components/Icons/Mail";
import Image from "next/image";
import { map } from "lodash";
import Link from "next/link";

const CONTENT = [
  {
    // header: "CHÍNH SÁCH ĐỔI TRẢ HÀNG",
    contents: (
      <div className="prose prose-sm max-w-none">
        <h1 className="text-center text-4xl font-normal">
          Chính sách đổi trả hàng
        </h1>

        <p className="indent-7 text-justify">
          Chính sách đổi trả sản phẩm của Hathyo quy định các lý do chấp nhận,
          yêu cầu cho sản phẩm được trả hàng và thời gian xử lý trả hàng cho
          khách hàng. Khách hàng có thể yêu cầu hoàn trả một hoặc nhiều sản phẩm
          trong gói hàng mình đã mua, nếu các hàng hoá này phù hợp với một trong
          các lý do sau.
        </p>

        <h2 className="font-bold">Lý do chấp nhận trả hàng:</h2>
        <ul className="list-disc list-inside">
          <li>
            Người mua đã thanh toán nhưng không nhận được hàng như dự kiến.
          </li>
          <li>Người mua nhận được gói hàng rỗng.</li>
          <li>
            Sản phẩm bị giao sai số lượng, kích cỡ, màu sắc, mẫu mã,... so với
            đơn đặt hàng.
          </li>
          <li>Hàng nhận được bị trầy xước, móp méo, hư hỏng.</li>
          <li>Hàng nhận được đã hết hạn sử dụng.</li>
          <li>Hàng nhận được bong tróc tem nhãn hoặc đã qua sử dụng.</li>
          <li>Hàng nhận được nghi là hàng nhái, giả</li>
          <li>Lý do khác: người mua cung cấp lý do cho việc trả hàng.</li>
        </ul>

        <h2 className="font-bold mt-4">Điều kiện trả sản phẩm:</h2>
        <ul className="list-disc list-inside">
          <li>Sản phẩm còn nguyên tem mác, bao bì.</li>
          <li>
            Sản phẩm không bị dơ bẩn, không qua giặt là, không có mùi lạ, không
            có dấu hiệu đã qua sử dụng.
          </li>
          <li>Sản phẩm còn đầy đủ phụ kiện.</li>
        </ul>

        <h2 className="font-bold mt-4">
          Quy định về thời gian thông báo và gửi sản phẩm đổi hàng:
        </h2>
        <ul className="list-disc list-inside">
          <li>
            Đối với trường hợp thiếu sản phẩm, quà tặng hoặc lỗi do nhà sản
            xuất, khách hàng vui lòng thông báo cho Bộ phận CSKH trong vòng 07
            (bảy) ngày kể từ khi nhận sản phẩm.
          </li>
          <li>
            Đối với các lỗi do quá trình vận chuyển: Tại thời điểm nhận hàng khi
            phát hiện thùng đựng hàng hoặc bao bì bọc hàng có dấu hiệu bất
            thường (rách, bẩn… ảnh hưởng tới sản phẩm bên trong), khách hàng vui
            lòng thông báo ngay cho nhân viên vận chuyển và bộ phận CSKH của
            công ty.
          </li>
          <li>
            Nếu vượt quá thời gian quy định trên, Hathyo sẽ không nhận đổi sản
            phẩm với bất kỳ lý do nào.
          </li>
          <li>
            Thời gian kiểm tra và đánh giá yêu cầu trả hàng: Hathyo sẽ kiểm tra
            và đánh giá sản phẩm và thông báo kết quả, phương án giải quyết
            trong vòng 48 giờ làm việc. Người mua cần cung cấp hình ảnh, video
            về sản phẩm lỗi.
          </li>
          <li>
            Thời gian gửi chuyển trả sản phẩm: Trong vòng 7 ngày kể từ khi nhận
            sản phẩm (tính theo ngày hoặc dấu bưu điện).
          </li>
          <li>
            Chi phí vận chuyển đổi hàng do lỗi nhà sản xuất sẽ do người bán chi
            trả.
          </li>
        </ul>

        <h2 className="font-bold mt-4">
          Các bước thực hiện trả hàng hoàn tiền:
        </h2>

        <p className="text-red-600 font-bold">Bước 1:</p>
        <p>
          Để xem tình trạng đơn hàng, tại bảng điều khiển dưới cùng của website,
          người mua chọn biểu tượng hình đại diện cá nhân.
        </p>
        <div className="flex justify-center my-4">
          <Image
            width={220}
            height={220}
            quality={100}
            src="/helps/chinh-sach-doi-tra/image1.png"
            alt="Hướng dẫn bước 1"
            className="w-full max-w-md"
          />
        </div>

        <p className="text-red-600 font-bold">Bước 2:</p>
        <p>
          Đối với các đơn hàng đã giao thành công, người mua chọn “Yêu cầu trả
          hàng”.
        </p>
        <div className="flex justify-center my-4">
          <Image
            width={220}
            height={220}
            quality={100}
            src="/helps/chinh-sach-doi-tra/image3.png"
            alt="Hướng dẫn bước 2"
            className="w-full max-w-2xl"
          />
        </div>

        <p className="text-red-600 font-bold">Bước 3:</p>
        <p>
          Điền thông tin yêu cầu trả hàng: lý do, địa chỉ, số điện thoại, số tài
          khoản nhận tiền &gt;&gt; Chấp nhận để gửi yêu cầu.
        </p>
        <div className="flex justify-center my-4">
          <Image
            width={220}
            height={220}
            quality={100}
            src="/helps/chinh-sach-doi-tra/image2.png"
            alt="Hướng dẫn bước 3"
            className="w-full max-w-2xl"
          />
        </div>
      </div>
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
              CHÍNH SÁCH ĐỔI TRẢ HÀNG
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full">
              <div className="text-md text-Grayiron/600 mt-3 text-justify">
                Chính sách đổi trả sản phẩm của Hathyo quy định các lý do chấp
                nhận, yêu cầu cho sản phẩm được trả hàng và thời gian xử lý trả
                hàng cho khách hàng. Khách hàng có thể yêu cầu hoàn trả một hoặc
                nhiều sản phẩm trong gói hàng mình đã mua, nếu các hàng hoá này
                phù hợp với một trong các lý do sau.
              </div>
            </div>
          </div>
          {map(CONTENT, (parent: any) => (
            <div className="flex">
              <div className="w-full">
                {/* <div className="text-xl !text-Moss/600 font-semibold summary-text">
                  {parent.header}
                </div> */}
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
