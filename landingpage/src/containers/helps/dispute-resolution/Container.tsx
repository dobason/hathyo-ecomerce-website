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
    header: "1. Đăng ký và đăng nhập tài khoản bán hàng",
    contents: (
      <ol className="list-decimal ml-5">
        <li className="text-justify pb-3 ml-5 text-Moss/700">
          <strong>Đăng ký tài khoản</strong>
        </li>
        <p className="text-justify py-2">
          Nếu Người bán chưa có tài khoản trên Sàn thương mại điện tử Hathyo,
          Người bán cần đăng ký mở tài khoản bán hàng theo quy trình sau:
        </p>
        <ol className="list-disc ml-5">
          <li className="text-justify pb-3">
            Truy cập trực tiếp vào trang của Người bán theo đường dẫn{" "}
            <a
              href="https://admin.hathyo.com/user/login"
              className="text-Moss/900 font-medium"
              target="blank"
            >
              https://admin.hathyo.com/user/login
            </a>
            &nbsp; hoặc truy cập vào trang chủ Hathyo{" "}
            <a
              href="https://admin.hathyo.com"
              className="text-Moss/900 font-medium"
              target="blank"
            >
              https://admin.hathyo.com
            </a>
            &nbsp; rồi nhấn vào mục “Bán hàng trên Hathyo” dưới chân trang
          </li>
          <li className="text-justify pb-3">
            Cung cấp thông tin, chứng từ của Người bán một cách chính xác theo
            yêu cầu của Hathyo và tuân thủ theo quy định pháp luật
          </li>
          <li className="text-justify pb-3">
            Hathyo xác minh hồ sơ của Người bán
          </li>
          <li className="text-justify pb-3">
            Hồ sơ đạt yêu cầu, tài khoản đăng ký thành công. Trường hợp hồ sơ
            chưa đạt yêu cầu, Hathyo sẽ hướng dẫn chi tiết cho Người bán bổ sung
            hoặc chỉnh sửa thông tin/ tài liệu đã cung cấp.
          </li>
        </ol>
        <li className="text-justify pb-3 ml-5 text-Moss/700">
          <strong>Đăng nhập tài khoản và đăng bán sản phẩm</strong>
        </li>
        <ol className="list-disc ml-5">
          <li className="text-justify pb-3">
            Sau khi đăng ký tài khoản bán hàng thành công, Người bán đăng nhập
            vào tài khoản đã đăng ký
          </li>
          <li className="text-justify pb-3">
            Người bán tiến hành đăng tải thông tin sản phẩm cần bán. Dưới đây là
            yêu cầu tổng quan về nội dung đăng bán (Nhà Bán Hàng vui lòng tham
            khảo thông tin chi tiết tại Quy định về sản phẩm đăng bán trên{" "}
            <a className="hover:text-Moss/600 text-Moss/500" href="hathyo.com">
              Hathyo.com
            </a>
            ):
          </li>
          <ol className="list-disc ml-5">
            <li className="text-justify pb-3">
              Các bài đăng bán hàng được chia thành 04 phần gồm tên sản phẩm,
              ngành hàng, hình ảnh sản phẩm (ảnh và video) và mô tả chi tiết sản
              phẩm
            </li>
            <li className="text-justify pb-3">
              Phần mô tả sản phẩm không vượt quá 3000 ký tự và định dạng chữ sẽ
              do Hathyo tự động điều chỉnh để cho đồng nhất
            </li>
            <li className="text-justify pb-3">
              Định dạng hình ảnh theo file SVG. Số lượng ảnh tối đa cho 01 bài
              đăng là 09 ảnh
            </li>
            <li className="text-justify pb-3">
              Yêu cầu đối với nội dung video tải lên tối đa 30Mb, độ phân giải
              không vượt quá 1280x1280px, độ dài tối đa 1 phút, định dạng: MP4,
              MKV
            </li>
          </ol>
          <li className="text-justify pb-3">
            Lưu sản phẩm và đăng bán sản phẩm lên Sàn giao dịch thương mại điện
            tử (TMĐT) Hathyo
          </li>
          <li className="text-justify pb-3">
            Hathyo sẽ kiểm duyệt thông tin sản phẩm, dịch vụ mà Người bán cung
            cấp theo Chính sách đăng bán và quy định kiểm duyệt của Hathyo
          </li>
        </ol>
      </ol>
    ),
  },
  // 2
  {
    header: "2. Xác nhận Đơn hàng",
    contents: (
      <ol className="list-disc ml-5">
        <li className="text-justify py-2">
          Khi Người mua đặt đơn hàng, hệ thống Hathyo sẽ gửi thông tin đơn hàng
          cho Người bán và đợi Người bán xác nhận đơn hàng
        </li>
        <li className="text-justify py-2">
          Người Bán cần kiểm tra hàng tồn kho và xác nhận đơn hàng
        </li>
        <li className="text-justify py-2">
          Nếu không thể giao đơn hàng, Người bán hủy đơn theo Nguyên tắc hủy đơn
          của Hathyo và hoàn tiền cho khách hàng (nếu đơn hàng đã được thanh
          toán)
        </li>
      </ol>
    ),
  },
  // 3
  {
    header: "3. Đóng gói sản phẩm",
    contents: (
      <div>
        <p className="text-justify py-2 ml-5">
          Tìm hiểu Hướng dẫn cách đóng gói hàng hóa theo đúng tiêu chuẩn để hiểu
          rõ cách thức đóng gói đơn hàng đúng cách tránh trường hợp hư hỏng sản
          phẩm trong quá trình vận chuyển hoặc đơn vị vận chuyển từ chối nhận
          hàng.
        </p>
        <ol className="list-decimal ml-5">
          <li className="text-justify pb-3 ml-5 text-Moss/700">
            <strong>Đóng gói mặt hàng</strong>
          </li>
          <p className="ist-disc ml-5">
            Người bán cần đóng gói tất cả các sản phẩm của đơn hàng cẩn thận để
            làm giảm rủi ro hư hỏng trong quá trình vận chuyển. Dưới đây là một
            số hướng dẫn về cách lựa chọn bao bì đóng gói:
          </p>
          <ol className="list-disc ml-10">
            <li className="text-justify py-2">
              Chọn đúng kích cỡ và loại bao bì cho sản phẩm
            </li>
            <li className="text-justify py-2">
              Kiểm tra các điều khoản, điều kiện và chính sách mới nhất của nhà
              vận chuyển để xác nhận sản phẩm có thể được vận chuyển
            </li>
            <li className="text-justify py-2">
              Không được gửi kèm bất kỳ thông tin nào hướng dẫn trả hàng để đổi
              lấy các lợi ích khác hoặc thông tin không phù hợp
            </li>
            <li className="text-justify py-2">
              Người bán không được gửi kèm bất kỳ tài liệu khuyến mãi hoặc quảng
              cáo trái phép nào, như tờ rơi, tài liệu trưng bày, nhãn giá, hoặc
              các tài liệu không liên quan đến sàn Hathyo khác
            </li>
            <li className="text-justify py-2">
              Trong trường hợp các sản phẩm đặc biệt đối với chất lỏng, vật sắc
              nhọn, đồ dễ gãy, dễ vỡ, dễ hư hỏng, hàng dệt may, vật liệu nguy
              hiểm, pin…, Người Bán cần phải thực hiện theo đúng hướng dẫn đóng
              gói của hãng vận chuyển
            </li>
            <li className="text-justify py-2">
              Không được đóng gói bất kỳ sản phẩm nào mà khách hàng không đặt
            </li>
            <li className="text-justify py-2">
              Nếu mặt hàng có yêu cầu xử lý đặc biệt, Người bán nên thông báo
              cho bên vận chuyển trước khi vận chuyển
            </li>
          </ol>
          <li className="text-justify pb-3 ml-5 text-Moss/700">
            <strong>Trường hợp bao bì là Hộp Giấy</strong>
          </li>
          <p className="ist-disc ml-5">
            Một số sản phẩm có thể cần có hộp giấy bên ngoài. Khi sử dụng hộp
            giấy, Người bán phải đáp ứng các yêu cầu dưới đây:
          </p>
          <ol className="list-disc ml-10">
            <li className="text-justify py-2">
              Bìa carton phải có khả năng bảo vệ đầy đủ cho sản phẩm trong quá
              trình vận chuyển
            </li>
            <li className="text-justify py-2">
              Chọn hộp giấy với kích thước phù hợp hoặc sử dụng vật chèn lót như
              túi khí, tấm xốp… để đảm bảo không gian trống nhỏ nhất sau khi đã
              đặt sản phẩm vào trong hộp
            </li>
            <li className="text-justify py-2">
              Bịt kín thùng carton bằng băng keo, đặc biệt đối với các sản phẩm
              nhỏ và nhẹ để tránh thất lạc hay hư hỏng trong quá trình vận
              chuyển
            </li>
          </ol>
        </ol>
      </div>
    ),
  },
  // 4
  {
    header: "4. Dán nhãn vận chuyển lên đơn hàng",
    contents: (
      <div>
        <p className="text-justify py-2 ml-5">
          Người Bán nên in nhãn vận chuyển từ hệ thống Hathyo và dán bên ngoài
          bao bì để đảm bảo thông tin giao hàng của khách hàng đầy đủ, chính xác
          nhất. Tham khảo Hướng dẫn in phiếu giao hàng tại Kênh Người Bán
        </p>
        <p className="text-justify py-2 ml-5">
          Nhãn vận chuyển thường bao gồm các thông tin như:
        </p>
        <ol className="list-disc ml-10">
          <li className="text-justify py-2">
            Tên và địa chỉ đầy đủ của Người Mua
          </li>
          <li className="text-justify py-2">
            Thông tin về sản phẩm đặt hàng của khách hàng
          </li>
          <li className="text-justify py-2">
            Tên đầy đủ và địa chỉ của Người Bán
          </li>
          <li className="text-justify py-2">
            Nhãn vận chuyển không chứa thông tin không liên quan đến đơn hàng
          </li>
          <li className="text-justify py-2">
            Mã vạch do hãng vận chuyển cung cấp hay còn gọi là Mã vận đơn
          </li>
          <li className="text-justify py-2">Khối lượng đơn hàng</li>
          <li className="text-justify py-2">
            Số tiền thu của người nhận đối với phương thức thanh toán khi nhận
            hàng
          </li>
        </ol>
      </div>
    ),
  },
  // 5
  {
    header: "5. Giao đơn hàng cho hãng vận chuyển",
    contents: (
      <div>
        <ol className="list-disc ml-5">
          <li className="text-justify py-2">
            Đối với loại hình vận chuyển mà Người bán lựa chọn vận chuyển bởi
            các đối tác liên kết với Hathyo, Người bán có thể bàn giao đơn hàng
            cho các hãng vận chuyển theo hai phương thức:
          </li>
          <ol className="list-disc ml-5">
            <li className="text-justify py-2">
              Đơn vị vận chuyển đến lấy hàng
            </li>
            <li className="text-justify py-2">Tự mang hàng tới bưu cục</li>
          </ol>
          <li className="text-justify py-2">
            Hoặc Người bán có thể tự vận chuyển đơn hàng và cập nhật hành trình
            đơn hàng cho Người mua thông qua Hathyo
          </li>
        </ol>
        <ol className="list-decimal ml-5">
          <li className="text-justify pb-3 text-Moss/700">
            <strong>Đơn vị vận chuyển đến lấy hàng</strong>
          </li>
          <ol className="list-disc ml-5">
            <li className="text-justify py-2">
              Hoàn tất việc đóng gói và giao kiện hàng cho nhà vận chuyển trong
              vòng 3 ngày làm việc sau khi đơn hàng được đặt
            </li>
            <li className="text-justify py-2">
              Người bán phải tuân thủ Thời hạn xử lý đơn hàng để đơn hàng không
              bị HỦY tự động bởi hệ thống Hathyo
            </li>
            <li className="text-justify py-2">
              Nếu đơn vị vận chuyển có sự chậm trễ trong việc lấy hàng, Người
              bán có thể liên hệ Hathyo để được hỗ trợ
            </li>
          </ol>
          <li className="text-justify pb-3 text-Moss/700">
            <strong>Tự mang hàng tới bưu cục</strong>
          </li>
          <ol className="list-disc ml-5">
            <li className="text-justify py-2">
              Người bán có thể tra cứu bưu cục gần nhất thông qua website của
              các đơn vị vận chuyển để có thể sắp xếp thời gian tự giao hàng cho
              đơn vị vận chuyển và tiến hành đóng gói đơn hàng theo đúng Quy
              định của Hathyo
            </li>
            <li className="text-justify py-2">
              In nhãn vận chuyển và dán nhãn này trên gói hàng
            </li>
            <li className="text-justify py-2">
              Người bán tự đem gói hàng đến bưu cục để bàn giao cho đơn vị vận
              chuyển. Người bán nên lưu ý Thời hạn xử lý đơn hàng để tránh chậm
              trễ nhé.
            </li>
          </ol>
        </ol>
        <p className="ml-5 text-justify">
          <strong>
            Lưu ý: Để tránh rủi ro về “thất lạc hàng hóa”, Người Bán nên lựa
            chọn hình thức “Đơn vị vận chuyển đến lấy hàng”
          </strong>
        </p>
      </div>
    ),
  },
  // 6
  {
    header: "6. Các trường hợp ngoại lệ",
    contents: (
      <ol className="list-decimal ml-5">
        <li className="text-justify pb-3 text-Moss/700">
          <strong>Hủy đơn tự động</strong>
        </li>
        <ol className="list-disc ml-5">
          <li className="text-justify py-2">
            Hệ thống Hathyo sẽ tự động hủy đơn hàng và hoàn tiền cho Người Mua
            nếu Người bán gửi hàng chậm trễ dựa theo thời gian quy định (tham
            khảo Thời hạn xử lý đơn hàng).
          </li>
          <li className="text-justify py-2">
            Hathyo sẽ hủy cả Đơn hàng đặt trước và Đơn hàng tiêu chuẩn nếu đơn
            hàng không được giao trước thời hạn quy định. Các điều kiện để tự
            động hủy đơn trên Hathyo thay đổi tùy thuộc vào loại đơn hàng đó là
            Đơn hàng tiêu chuẩn hay Đơn hàng đặt trước.
          </li>
          <p className="text-justify py-2">
            <strong>Ghi chú:</strong>
          </p>
          <li className="text-justify py-2 ml-5">
            Đơn hàng tiêu chuẩn là những đơn mà Người Bán có thể hoàn thành theo
            thời hạn tiêu chuẩn và quy định
          </li>
          <li className="text-justify py-2 ml-5">
            Đơn hàng đặt trước là những đơn cần thời gian hoàn thành lâu hơn và
            tính năng này chỉ áp dụng cho một số Người Bán được mời
          </li>
        </ol>
        <li className="text-justify pb-3 text-Moss/700">
          <strong>Đối với trường hợp bất khả kháng</strong>
        </li>
        <ol className="list-disc ml-5">
          <li className="text-justify py-2">
            Trong trường hợp xảy ra sự cố bất khả kháng khiến Người Bán không
            thể giao sản phẩm cho khách hàng, Người Bán phải báo cáo chi tiết
            bằng cách gửi phiếu hỗ trợ trong Trung tâm Người bán, kèm theo các
            tài liệu hỗ trợ cần thiết. Sự cố bất khả kháng có thể bao gồm thiên
            tai, thời tiết khắc nghiệt, dịch bệnh bùng phát, các hạn chế của
            chính phủ hoặc các sự kiện khác ngoài tầm kiểm soát của Người Bán.
          </li>
          <li className="text-justify py-2">
            Nếu tình huống được xác minh và chấp nhận, Hathyo sẽ không áp dụng
            bất kỳ hình phạt nào đối với Người Bán.
          </li>
        </ol>
        <li className="text-justify pb-3 text-Moss/700">
          <strong>Vấn đề phát sinh sau bán hàng</strong>
        </li>
        <p className="text-justify pb-3 ml-5">
          Người Mua có thể gửi khiếu nại hoặc yêu cầu Trả hàng/Hoàn tiền (tham
          khảo Chính sách đổi trả hàng) với các lý do như sản phẩm bị hư hỏng,
          hoặc sản phẩm khác với mô tả,... thì Hathyo sẽ áp dụng các quy định
          sau đây:
        </p>
        <ol className="list-disc ml-10">
          <li className="text-justify py-2">
            Hathyo sẽ xác định trách nhiệm thuộc về Người bán hay đơn vị vận
            chuyển (ĐVVC). Lưu ý rằng ĐVVC sẽ không chịu trách nhiệm nếu gói
            hàng bị hư hỏng do Người bán không đóng gói mặt hàng một cách cẩn
            thận và theo tiêu chuẩn
          </li>
          <li className="text-justify py-2">
            Người bán có thể tham khảo Chính sách khiếu nại yêu cầu bồi thường
            sản phẩm bị hư hỏng
          </li>
        </ol>
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
