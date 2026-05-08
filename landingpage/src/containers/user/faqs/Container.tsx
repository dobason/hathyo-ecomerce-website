/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
"use client";
import React, { useEffect, useState } from "react";
import { map,  } from "lodash";
import Collapse from "./Collapse";
import Button from "@/components/Button";
import Call from "@/components/Icons/Call";
import Mail from "@/components/Icons/Mail";
import Link from "next/link";

const CONTENTS = [
  {
    "name": "Tài khoản",
    "content": [
      // 1
      {
        heading: "Cách đăng ký tài khoản Hathyo như thế nào?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Để đăng ký tài khoản Người dùng, bạn thực hiện theo các bước sau:
              </li>
              <ol className="list-disc ml-5">
                <li className="text-justify pb-3">
                  Bấm chọn <strong>&quot;Đăng nhập&quot;</strong> trên trang chủ Hathyo
                </li>
                <li className="text-justify pb-3">
                  Tiếp đó, bấm chọn <strong>&quot;Đăng ký ngay&quot;</strong>
                </li>
                <li className="text-justify pb-3">
                  Điền đầy đủ thông tin (số điện thoại hoặc email)
                </li>
                <li className="text-justify pb-3">
                  Tạo mật khẩu và nhập mã xác minh (OTP) được gửi về điện thoại hoặc
                  email đã đăng ký
                </li>
              </ol>
            </ol>
          </div>
        ),
      },
      // 2
      {
        heading: "Tại sao tôi không thể đăng ký tài khoản Hathyo bằng số điện thoại của mình?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Nếu bạn không thể đăng ký tài khoản Hathyo bằng số điện thoại của mình, có khả năng số điện thoại đó đã được đăng ký và liên kết với một tài khoản Hathyo đang tồn tại
              </li>
              <li className="text-justify pb-3">
                Theo quy định của Hathyo, mỗi số điện thoại chỉ có thể liên kết với một tài khoản duy nhất nhằm đảm bảo an toàn và tránh lạm dụng
              </li>
              <li className="text-justify pb-3">
                Nếu số điện thoại thuộc sở hữu của bạn, bạn có thể đăng nhập hoặc xóa tài khoản cũ để tạo tài khoản mới
              </li>
              <li className="text-justify pb-3">
                Trường hợp số điện thoại liên kết với tài khoản Hathyo không phải của bạn, hãy liên hệ đội ngũ CSKH của Hathyo để được hỗ trợ
              </li>
            </ol>
          </div>
        ),
      },
      // 17
      {
        heading: "Làm thế nào để trở thành người bán trên Hathyo?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Đăng ký tài khoản bán hàng trên Hathyo bằng cách nhấn vào “Bán hàng trên Hathyo” hoặc truy cập vào đường dẫn&nbsp;
                <a 
                  href="https://admin.hathyo.com/user/login" 
                  className="text-Moss/900 font-medium"
                  target="blank"
                >
                  https://admin.hathyo.com/user/login
                </a>
                &nbsp;và làm theo hướng dẫn trên màn hình để trở thành đối tác/Nhà Bán Hàng của Hathyo.
              </li>
            </ol>
          </div>
        ),
      },
      // 21
      {
        heading: "Tôi bị quên mật khẩu, làm sao để lấy lại?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Trên màn hình đăng nhập, chọn <strong>&quot;Quên mật khẩu&quot;</strong> và làm theo hướng dẫn để khôi phục bằng email hoặc số điện thoại.
              </li>
            </ol>
          </div>
        ),
      },
      // 25
      {
        heading: "Cách đăng sản phẩm lên Hathyo như thế nào?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Vào Kênh người bán, chọn <strong> &quot;Thêm sản phẩm mới&quot;</strong>, điền thông tin sản phẩm, hình ảnh và chọn <strong>&quot;Lưu&quot;</strong>.
              </li>
            </ol>
          </div>
        ),
      },
    ]
  },
  {
    "name": "Đặt hàng",
    "content": [
      // 4
      {
        heading: "Làm thế nào để đặt hàng trên Hathyo?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Tìm kiếm sản phẩm, chọn sản phẩm và số lượng, nhấn <strong>&quot;Mua ngay&quot;</strong> và nhập thông tin người nhận, sau đó chọn phương thức thanh toán và xác nhận đặt hàng.
              </li>
              <li className="text-justify pb-3">
                <div className="flex flex-row items-center gap-4">
                  <span>Chi tiết vui lòng tham khảo</span>
                  <Button 
                    type="selected"
                    rounded size="small"
                    href="/helps/buying-guide"
                    target="blank"
                  >
                    Hướng dẫn mua hàng trên Hathyo
                  </Button>
                </div>
              </li>
            </ol>
          </div>
        ),
      },
      // 5
      {
        heading: "Làm cách nào để kiểm tra tình trạng đơn hàng?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Truy cập vào mục <strong>&quot;Đơn hàng của tôi&quot;</strong> trong tài khoản và kiểm tra tình trạng đơn hàng theo từng trạng thái:
              </li>
              <ol className="list-disc ml-5">
                <li className="text-justify pb-3">Chờ xác nhận</li>
                <li className="text-justify pb-3">Chờ lấy hàng</li>
                <li className="text-justify pb-3">Đang giao hàng</li>
              </ol>
            </ol>
          </div>
        ),
      },
      // 6
      {
        heading: "Làm thế nào để hủy đơn hàng?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Vào <strong>&quot;Đơn hàng của tôi&quot;</strong>, chọn đơn cần hủy và nhấn <strong>&quot;Hủy đơn hàng&quot;</strong>.
              </li>
              <li className="text-justify pb-3">
                Nếu đơn hàng đã ở trạng thái <strong>&quot;Đang giao&quot;</strong>, bạn không thể thao tác hủy trực tiếp trên website/ứng dụng mà phải liên hệ hotline Hathyo để được hỗ trợ.
              </li>
            </ol>
          </div>
        ),
      },
      // 8
      {
        heading: "Tôi có thể thay đổi địa chỉ, số điện thoại người nhận hàng sau khi đã đặt hàng không?",
        content: (
          <div className="text-md font-normal">
            <p className="text-justify py-3 ml-5">
              Bạn có thể thay đổi thông tin địa chỉ hoặc số điện thoại nhận hàng cho đơn hàng đã đặt nếu đáp ứng các điều kiện sau:
            </p>
            <ol className="list-disc ml-10">
              <li className="text-justify pb-3">
                Người bán chưa xác nhận đơn hàng (đơn hàng chưa có mã vận đơn)
              </li>
              <li className="text-justify pb-3">
                Là lần đầu yêu cầu thay đổi thông tin cho đơn hàng đó
              </li>
              <li className="text-justify pb-3">
                Địa chỉ mới phải nằm trong khu vực giao hàng hỗ trợ và không làm thay đổi mức phí vận chuyển
              </li>
            </ol>
            <p className="text-justify py-3 ml-5">
              Nếu đáp ứng đủ tất cả các điều kiện trên, bạn có thể thực hiện thay đổi trực tiếp trên hệ thống
            </p>
          </div>
        ),
      },
      // 9
      {
        heading: "Tôi muốn thêm/bớt sản phẩm sau khi đã đặt hàng?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Chúng tôi rất tiếc vì Hathyo chưa hỗ trợ thêm/bớt sản phẩm sau khi đặt đơn hàng thành công, Khách hàng vui lòng cân nhắc khi đặt hàng. Trường hợp quý khách muốn thêm/bớt sản phẩm, vui lòng hủy đơn hàng cũ và đặt lại đơn mới.
              </li>
            </ol>
          </div>
        ),
      },
      // 10
      {
        heading: "Hathyo hỗ trợ những phương thức thanh toán nào?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                {/* Hathyo hỗ trợ thanh toán khi nhận hàng (COD), thanh toán trực tuyến bằng cổng ONEPAY trên sàn gồm thẻ tín dụng/ghi nợ, ví điện tử, mua trước trả sau. */}
                Hathyo hỗ trợ thanh toán khi nhận hàng (COD)
              </li>
            </ol>
          </div>
        ),
      },
      // 14
      {
        heading: "Tại sao đơn hàng của tôi bị hủy?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Đơn hàng có thể bị hủy vì sản phẩm hết hàng, địa chỉ giao hàng không chính xác, hoặc do người bán từ chối.
              </li>
            </ol>
          </div>
        ),
      },
      // 18
      {
        heading: "Có thể trả giá trên Hathyo không?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
              Một số sản phẩm có tính năng <strong>&quot;Trả giá&quot;</strong> cho phép bạn đề xuất mức giá thấp hơn với người bán.
              </li>
            </ol>
          </div>
        ),
      },
      // 24
      {
        heading: "Có thể liên hệ trực tiếp với người bán không?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Bạn có thể nhắn tin cho người bán qua mục <strong>&quot;Chat ngay&quot;</strong> trong phần mô tả sản phẩm hoặc trang gian hàng của người bán.
              </li>
            </ol>
          </div>
        ),
      },
    ]
  },
  {
    "name": "Giao nhận",
    "content": [
      // 3
      {
        heading: "Làm thế nào để tránh các đơn hàng ảo hoặc giả mạo?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Để hạn chế rủi ro khi nhận phải các đơn hàng ảo hoặc giả mạo, người mua cần kiểm tra các thông tin đơn hàng trên ứng dụng như mã đơn hàng, mã vận đơn, và đối chiếu với thông tin đơn hàng mà bưu tá giao đến
              </li>
              <li className="text-justify pb-3">
                Nếu phát hiện sự khác biệt về thông tin đơn hàng hoặc nghi ngờ, người mua nên từ chối nhận hàng. Đơn hàng của Hathyo có các thông tin xác thực như thông tin sản phẩm/ tên cửa hàng, đơn vị vận chuyển, mã đơn hàng/mã vận đơn và thông tin người nhận rõ ràng. Nên kiểm tra kỹ trước khi thanh toán hoặc nhận hàng.
              </li>
            </ol>
          </div>
        ),
      },
      // 11
      {
        heading: "Thời gian giao hàng trên Hathyo là bao lâu?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Thời gian giao hàng tùy thuộc vào địa điểm người bán và phương thức vận chuyển. Thông thường từ 1 - 5 ngày làm việc.
              </li>
            </ol>
          </div>
        ),
      },
      // 12
      {
        heading: "Tôi muốn liên hệ với Đơn vị vận chuyển để tra cứu thông tin đơn hàng hoặc hối giao hàng thì phải làm sao?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Hiện tại Hathyo chưa hỗ trợ việc giao, nhận hàng theo giờ cụ thể hoặc nhanh hơn thời gian dự kiến hiển thị trên hệ thống
              </li>
              <li className="text-justify pb-3">
                Số điện thoại của shipper/nhân viên giao hàng cũng không được cung cấp
              </li>
              <li className="text-justify pb-3">
                Nếu bạn có khiếu nại về tình trạng đơn hàng hoặc vấn đề giao nhận, hãy liên hệ trực tiếp với bộ phận chăm sóc khách hàng của Hathyo thông qua hotline 0827000248
              </li>
              <li className="text-justify pb-3">
                Trong trường hợp cần thiết, bạn có thể liên hệ trực tiếp với phía Đơn vị vận chuyển thông qua trang chủ (Website), hòm thư điện tử (Email), hoặc tổng đài điện thoại (Hotline) của Đơn vị vận chuyển đó. Nếu cửa hàng của bạn bị tính tỷ lệ giao hàng chậm trễ do Đơn vị vận chuyển chưa đến lấy hàng, người bán hãy liên hệ Hathyo để được hỗ trợ
              </li>
            </ol>
          </div>
        ),
      },
      // 13
      {
        heading: "Làm sao để được Freeship trên Hathyo?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Hathyo thường có mã miễn phí vận chuyển hoặc chương trình khuyến mãi. Bạn có thể áp dụng mã trong quá trình thanh toán.
              </li>
            </ol>
          </div>
        ),
      },
      // 16
      {
        heading: "Tại sao đơn hàng của tôi bị giao chậm?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Giao hàng có thể bị chậm do thời tiết, dịch bệnh, hoặc lý do từ đơn vị vận chuyển. Kiểm tra thông tin đơn hàng được cập nhật trong mục <strong>&quot;Đơn hàng của tôi&quot;</strong>.
              </li>
            </ol>
          </div>
        ),
      },
      // 20
      {
        heading: "Tôi có thể thêm nhiều địa chỉ giao hàng không?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Bạn có thể thêm, chỉnh sửa và quản lý nhiều địa chỉ trong mục <strong>&quot;Địa chỉ&quot;</strong> trên Hathyo.
              </li>
            </ol>
          </div>
        ),
      },
    ]
  },
  {
    "name": "Đổi trả",
    "content": [
      // 7
      {
        heading: "Làm sao để yêu cầu đổi trả hàng/hoàn tiền?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Vào <strong>&quot;Đơn hàng của tôi&quot;</strong>, chọn đơn hàng muốn trả và chọn <strong>&quot;Yêu cầu trả hàng/hoàn tiền&quot;</strong>, chọn lý do trả hàng và gửi yêu cầu.
              </li>
              <li className="text-justify pb-3">
                <div className="flex flex-row items-center gap-4">
                  <span>Chi tiết vui lòng tham khảo</span>
                  <Button 
                    type="selected"
                    rounded size="small"
                    href="/terms/return-policy"
                    target="blank"
                  >
                    Chính sách đổi trả hàng
                  </Button>
                </div>
              </li>
            </ol>
          </div>
        ),
      },
      // 23
      {
        heading: "Người bán không phản hồi khi tôi yêu cầu hoàn tiền?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Sau 3 ngày không phản hồi, Hathyo sẽ tự động can thiệp để hỗ trợ bạn.
              </li>
            </ol>
          </div>
        ),
      },
    ]
  },
  {
    "name": "Dịch vụ",
    "content": [
      // 15
      {
        heading: "Tôi có thể sử dụng nhiều mã giảm giá cùng lúc không?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Bạn có thể sử dụng tối đa một mã giảm giá và một mã miễn phí vận chuyển cho mỗi đơn hàng.
              </li>
            </ol>
          </div>
        ),
      },
      // 19
      {
        heading: "Tại sao tôi không áp dụng được mã giảm giá?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Mã giảm giá có thể không hợp lệ do đã hết hạn, không đủ điều kiện áp dụng hoặc sản phẩm không nằm trong chương trình khuyến mãi.
              </li>
            </ol>
          </div>
        ),
      },
      // 22
      {
        heading: "Làm thế nào để đánh giá sản phẩm sau khi nhận hàng?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Vào <strong>&quot;Đơn hàng của tôi&quot;</strong>, chọn đơn đã hoàn tất và nhấn <strong>&quot;Đánh giá&quot;</strong>, sau đó nhập bình luận và gửi.
              </li>
            </ol>
          </div>
        ),
      },
      // 26
      {
        heading: "Chương trình Hathyo Calorie là gì?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                <strong>Hathyo Calorie</strong> là điểm thưởng tích lũy khi mua sắm và tổng thời gian truy cập hệ thống. <strong>Hathyo Calorie</strong> dùng để giảm giá cho đơn hàng tiếp theo.
              </li>
            </ol>
          </div>
        ),
      },
    ]
  },
  {
    "name": "Thông tin Hathyo",
    "content": [
      // 27
      {
        heading: "Làm sao để liên hệ với Hathyo khi gặp sự cố?",
        content: (
          <div className="text-md font-normal">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                Liên hệ tổng đài Hathyo qua số điện thoại: 0827000248
              </li>
              <li className="text-justify pb-3">
                Gửi email tới địa chỉ: email@hathyo.com
              </li>
              <li className="text-justify pb-3">
                Nhắn tin trực tiếp qua mục <strong>&quot;Trò chuyện với Hathyo&quot;</strong> trên website/ứng dụng Hathyo
              </li>
            </ol>
          </div>
        ),
      },
    ]
  },
];

function Container() {
  const contentList = CONTENTS.map(item => item.name);

  const [curentContent, setCurentContent] = useState<string>('Tài khoản');
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const newData = CONTENTS.find(item => item.name === curentContent);
    
    if (newData) {
      setData(newData);
    }
  }, [curentContent]);

  return (
    <main>
      <div className="container m-auto">
        <div className="flex my-10 xl:flex-row flex-col justify-center ">
          <div className="h-max xl:w-[500px] w-[calc(100%-48px)] my-8 mx-6 rounded-xl bg-white">
            <div className="my-8 mx-6 rounded-xl bg-white">
              <div className="w-full flex flex-col ">
                {map(contentList, (item: any) => (
                  <div className="py-4 border-b-Moss/100 border-b-[0.5px] cursor-pointer">
                    <div className="body-semibold text-Moss/600" onClick={() => setCurentContent(item)}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="xl:w-[calc(100%-480px] w-full my-8 mx-6">
            {/* <PostList id={id} /> */}
            <div className="text-2xl font-bold text-Moss/700">
             {data.name}
            </div>
            <div className="w-11/12">
              {map(data.content, (item: any, index: number) => (
                <Collapse
                  key={index}
                  content={item.content}
                  heading={item.heading}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center m-10">
          <div className="text-xl font-semibold text-center text-Moss/700">
            Bạn có muốn tìm thêm thông tin gì không?
          </div>
        </div>
        <div className="flex justify-center xl:m-10 xl:gap-5 m-2 gap-2">
          <Button>
            <Link href="tel:0084-827000248">
              <div className="flex justify-center items-center gap-2 body-semibold text-Moss/500">
                <Call className="w-5 h-5"></Call>
                <p className="body-sm-semibold">0827000248</p>
              </div>
            </Link>
          </Button>
          <Button>
            <Link href="mailto:email@hathyo.com">
              <div className="flex justify-center items-center gap-2 body-semibold text-Moss/500">
                <Mail className="w-5 h-5"></Mail>
                <p className="body-sm-semibold">Email Hathyo</p>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Container;
