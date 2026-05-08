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
    header: "1. Đăng ký và đăng nhập tài khoản Hathyo",
    contents: (
      <ol className="list-decimal ml-5">
        <li className="text-justify pb-3 ml-5 text-Moss/700">
          <strong>
            Đăng ký tài khoản
          </strong>
        </li>
        <p className="text-justify py-2">
          Nếu Người mua chưa có tài khoản trên Sàn thương mại điện tử Hathyo, Người mua cần đăng ký mở tài khoản theo quy trình sau:
        </p>
        <ol className="list-disc ml-5">
          <li className="text-justify pb-3">
            Truy cập website https://hathyo.com hoặc truy cập vào ứng dụng Hathyo trên điện thoại
          </li>
          <li className="text-justify pb-3">
            Ấn &quot;Đăng ký&quot; và làm theo hướng dẫn, Người mua có thể lựa chọn một trong các hình thức đăng ký tài khoản như sau:
          </li>
          <ol className="list-disc ml-5">
            <li className="text-justify pb-3">
              Đăng ký bằng số điện thoại, tài khoản Google/Gmail/Facebook
            </li>
            <li className="text-justify pb-3">
              Nhập mã xác minh (OTP) được hệ thống Hathyo gửi về điện thoại/Email
            </li>
            <li className="text-justify pb-3">
              Đăng ký tài khoản thành công
            </li>
          </ol>
        </ol>
        <li className="text-justify pb-3 ml-5 text-Moss/700">
          <strong>
            Đăng nhập tài khoản và sử dụng dịch vụ
          </strong>
        </li>
        <p className="text-justify py-2">
          Khi đã tạo tài khoản Hathyo thành công, Khách hàng nhập thông tài khoản đã đăng ký để sử dụng dịch vụ mua sắm trực tuyến và tham khảo các thông tin hữu ích về chăm sóc sức khỏe trên Sàn Hathyo.
        </p>
      </ol>
    ),
  },
  // 2
  {
    header: "2. Tìm kiếm sản phẩm",
    contents: (
      <ol className="list-disc ml-5">
        <li className="text-justify py-2">
          Khách hàng có thể tìm kiếm, tham khảo thông tin sản phẩm, dịch vụ, khuyến mại, và các chính sách hỗ trợ của Người bán mà Người mua đang có nhu cầu mua (so sánh với những Người bán khác trên website Hathyo để đưa ra quyết định mua sản phẩm, dịch vụ đó). 
        </li>
        <li className="text-justify py-2">
          Khách hàng tìm kiếm sản phẩm theo 3 cách như sau:
        </li>
        <ol className="list-disc ml-5">
          <li className="text-justify py-2">
            Nhập tên sản phẩm trên thanh công cụ tìm kiếm
          </li>
          <li className="text-justify py-2">
            Tìm sản phẩm dựa theo danh mục
          </li>
          <li className="text-justify py-2">
            Tìm các sản phẩm bán chạy nhất, mới nhất hoặc danh mục phổ biến trên từng ngành hàng
          </li>
        </ol>
        <li className="text-justify py-2">
          Ngoài ra Người mua có thể tìm tên cửa hàng trên thanh công cụ tìm kiếm và trao đổi trực tiếp cùng Người bán (công cụ chat trên website/ứng dụng Hathyo) để tham khảo chi tiết về dịch vụ hoặc thông tin sản phẩm đang có nhu cầu.
        </li>
      </ol>
    ),
  },
  // 3
  {
    header: "3. Thêm sản phẩm vào giỏ hàng",
    contents: (
      <div>
        <ol className="list-disc ml-10">
          <li className="text-justify py-2">
            Khi đã tìm được sản phẩm mong muốn, Khách hàng bấm vào hình ảnh sản phẩm để đến trang thông tin chi tiết của sản phẩm và làm theo các bước sau:
          </li>
          <ol className="list-disc ml-10">
            <li className="text-justify py-2">
              Đọc kỹ thông tin sản phẩm bao gồm mô tả sản phẩm, giá cả, thông tin khuyến mãi,v.v…
            </li>
            <li className="text-justify py-2">
              Chọn số lượng sản phẩm cần đặt mua
            </li>
            <li className="text-justify py-2">
              Chọn nút “thêm vào giỏ” để sản phẩm được thêm vào giỏ hàng đợi
            </li>
            <li className="text-justify py-2">
              Trở về trang chủ rồi tiếp tục thao tác tìm kiếm và thêm vào giỏ hàng những sản phẩm đang có nhu cầu khác giống như các bước trên
            </li>
          </ol>
        </ol>
        <p className="text-justify py-2 ml-5">
          Sau khi lựa chọn các sản phẩm cần mua và cho vào giỏ hàng, Khách hàng vui lòng nhấn vào biểu tượng “Giỏ hàng” và chọn “Mua hàng” để đến bước đặt hàng
        </p>
      </div>
    ),
  },
  // 4
  {
    header: "4. Kiểm tra giỏ hàng và đặt hàng",
    contents: (
      <div>
        <ol className="list-disc ml-10">
          <li className="text-justify py-2">
            Khách hàng kiểm tra số lượng sản phẩm cần mua (có thể xóa bớt hoặc thêm sản phẩm)
          </li>
          <li className="text-justify py-2">
            Khách hàng kiểm tra mã giảm giá/Hathyo Calorie (nếu có) để áp dụng giảm giá cho đơn hàng
          </li>
          <li className="text-justify py-2">
            Khách hàng kiểm tra lại thông tin người nhận hàng gồm địa chỉ, số điện thoại,v.v…
          </li>
          <li className="text-justify py-2">
            Khách hàng lựa chọn phương thức thanh toán mà Hathyo cung cấp gồm thanh toán khi nhận hàng (COD), thanh toán trực tuyến, hoặc mua trước trả sau
          </li>
          <li className="text-justify py-2">
            Nhấn “Mua ngay” để bắt đầu đặt hàng
          </li>
        </ol>
        <p className="text-justify py-2 ml-5">
          <strong>Ghi chú:</strong>
        </p>
        <ol className="list-disc ml-10">
          <li className="text-justify py-2">
            Các sản phẩm khác nhau trong giỏ hàng có thể được gom thành 01 đơn hàng.
          </li>
          <li className="text-justify py-2">
            Các sản phẩm trong giỏ hàng sẽ được đóng thành 1 kiện hàng nếu sản phẩm thuộc cùng 01 Nhà Bán Hàng và giao đến địa chỉ người nhận
          </li>
        </ol>
      </div>
    ),
  },
  // 5
  {
    header: "5. Kiểm tra và theo dõi hành trình đơn hàng",
    contents: (
      <ol className="list-disc ml-5">
        <li className="text-justify py-2">
          Sau khi hoàn tất các bước mua hàng và đơn hàng được xác nhận thành công, thông tin chi tiết về đơn hàng sẽ được gửi đến Khách hàng bao gồm thông tin vận chuyển (đơn vị vận chuyển, mã vận đơn, hành trình đơn hàng), mã đơn hàng, và thời gian giao hàng dự kiến
        </li>
        <li className="text-justify py-2">
          Khách hàng vui lòng theo dõi tình trạng xử lý đơn hàng và quá trình vận chuyển của đơn hàng trong “Đơn hàng của tôi”
        </li>
      </ol>
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
