/* eslint-disable prettier/prettier */
import React from "react";
import Button from "@/components/Button";
import Call from "@/components/Icons/Call";
import Mail from "@/components/Icons/Mail";
import Link from "next/link";

function Container() {
  return (
    <main>
      <div className="container m-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="xl:w-3/4 flex my-5 justify-center text-center">
            <div className="heading-3 text-Moss/700">
              Từ chối trách nhiệm
            </div>
          </div>
          <div className="w-3/4 flex mb-5 justify-center">
            <div className="w-full">
              <div className="text-base text-Grayiron/600 mt-3">
                <p className="list-disc ml-5 pb-3">
                  Các tác giả, người đánh giá, và biên tập của Hathyo đã đồng lòng và nỗ lực để đảm bảo rằng các thông tin đưa ra là chính xác và tuân thủ các tiêu chuẩn được chấp nhận tại thời điểm công bố.
                </p>
                <p className="list-disc ml-5 pb-3">
                  Tuy nhiên, với một số lý do khách quan bao gồm sự cập nhật liên tục từ các nghiên cứu cũng như những thử nghiệm lâm sàng, hay sự đa dạng lập luận giữa các chuyên gia, chúng tôi khuyến cáo Người Dùng nên có sự đánh giá cá nhân khi áp dụng thông tin từ Hathyo vào trong cuộc sống hàng ngày.
                </p>
                <p className="list-disc ml-5 pb-3">
                  Thông tin, sản phẩm, dịch vụ được cung cấp trên Hathyo chỉ mang tính chất tham khảo và không thay thế cho sự chẩn đoán chuyên môn hay sự điều trị nào cho các vấn đề sức khỏe. Chúng tôi không chịu trách nhiệm về bất kỳ tổn thất hay thiệt hại nào phát sinh từ việc sử dụng thông tin từ trang Hathyo.
                </p>
                <p className="list-disc ml-5 pb-3">
                  Nếu có bất kỳ thắc mắc nào về tình trạng sức khỏe, Hathyo khuyến nghị Người Dùng nên tham khảo ý kiến Chuyên Gia Y Tế để có lời khuyên phù hợp nhất với tình trạng cá nhân.
                </p>
                
              </div>
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
