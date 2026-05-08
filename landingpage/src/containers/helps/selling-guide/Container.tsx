"use client";

import React from "react";
import Button from "@/components/Button";
import Call from "@/components/Icons/Call";
import Mail from "@/components/Icons/Mail";
import Link from "next/link";

function Container() {
  return (
    <main>
      <div className="container m-auto xl:py-8 py-4 xl:gap-8 gap-4 flex-col flex">
        <div className="w-full relative">
          <section className="container mx-auto px-4 py-12 text-justify">
            <h1 className="text-2xl font-bold text-center text-primary mb-8">
              CƠ CHẾ GIẢI QUYẾT TRANH CHẤP, KHIẾU NẠI
            </h1>

            <div className="space-y-6 text-gray-800 leading-relaxed">
              <p>
                Khi phát sinh tranh chấp hoặc khiếu nại, Hathyo khuyến khích
                giải pháp thương lượng, hòa giải giữa các bên để đạt được sự
                đồng thuận về phương án giải quyết. Nếu hai bên không thể thương
                lượng với nhau và yêu cầu Hathyo đứng ra giải quyết vụ việc,
                quyết định của Hathyo là quyết định cuối cùng.
              </p>

              <div>
                <p className="font-semibold">
                  Đầu mối tiếp nhận giải quyết tranh chấp:
                </p>
                <ul className="list-disc ml-6">
                  <li>CÔNG TY TNHH CUỘC SỐNG VUI KHỎE</li>
                  <li>
                     82 Phan Đăng Lưu, Phường Đức Nhuận, TP HCM
                  </li>
                  <li>
                    Email:{" "}
                    <a
                      href="mailto:email@hathyo.com"
                      className="text-blue-600 underline"
                    >
                      email@hathyo.com
                    </a>
                  </li>
                  <li>
                    Hotline:{" "}
                    <a
                      href="tel:0827000248"
                      className="text-blue-600 underline"
                    >
                      0827000248
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">
                  Trình tự giải quyết khiếu nại, tranh chấp:
                </p>
                <ol className="list-decimal ml-6 space-y-2">
                  <li>
                    Website Hathyo tiếp nhận thông tin khiếu nại, tranh chấp.
                  </li>
                  <li>
                    Xác thực thông tin trong vòng 24-48 giờ kể từ thời điểm nhận
                    khiếu nại.
                  </li>
                  <li>
                    Hathyo đứng ra hòa giải hoặc thương lượng với các bên, thời
                    gian xử lý trong 3-7 ngày làm việc.
                  </li>
                  <li>Giải quyết tranh chấp nếu đạt được thỏa thuận.</li>
                  <li>
                    Nếu không thành công, tranh chấp sẽ được giải quyết tại Tòa
                    án có thẩm quyền.
                  </li>
                </ol>
              </div>

              <div>
                <p className="font-semibold">
                  Đối với tranh chấp giữa Người bán và Người mua:
                </p>
                <p>
                  Hathyo luôn khuyến khích các bên tích cực phối hợp để giải
                  quyết. Công ty sẽ tiếp nhận và xử lý khiếu nại, đảm bảo quyền
                  lợi của Khách hàng và tuân thủ pháp luật. Mọi hành vi gian lận
                  sẽ bị xử lý nghiêm và yêu cầu bồi thường nếu có thiệt hại.
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Đối với tranh chấp giữa thành viên và Hathyo:
                </p>
                <p>
                  Hathyo có trách nhiệm lớn nhất trong việc đảm bảo quyền lợi
                  của thành viên. Nếu lỗi do Hathyo, công ty sẽ nhanh chóng xử
                  lý. Nếu lỗi thuộc về thành viên, có thể bị cảnh cáo, khóa tài
                  khoản hoặc ngừng giao dịch.
                </p>
              </div>

              <p className="italic">
                Mọi tranh chấp phát sinh liên quan đến giao dịch tại Sàn TMĐT
                Hathyo sẽ được giải quyết trên cơ sở thương lượng, hòa giải,
                hoặc thông qua Tòa án, tùy theo quy định pháp luật tại từng thời
                điểm.
              </p>
            </div>
          </section>
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
