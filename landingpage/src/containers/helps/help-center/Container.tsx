/* eslint-disable prettier/prettier */
import React from "react";
import Button from "@/components/Button";
import Call from "@/components/Icons/Call";
import Mail from "@/components/Icons/Mail";
import Link from "next/link";

function Container() {
  return (
    <main>
      <div className="container m-auto xl:py-8 py-4">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="xl:w-3/4 flex justify-center text-center">
            <div className="heading-3 text-Moss/700">
              Trung tâm trợ giúp
            </div>
          </div>
          <div className="xl:w-3/4 flex justify-center">
            <div className="w-full">
              <div className="text-md text-Grayiron/600 mt-3">
                <ol className="list-disc ml-5">
                  <li className="text-justify pb-3">
                    Mọi thắc mắc vui lòng liên hệ trực tiếp với Hathyo qua các kênh liên lạc sau:
                  </li>
                  <ol className="list-disc ml-5">
                    <li className="text-justify pb-3">
                      Hotline: 0827000248
                    </li>
                    <li className="text-justify pb-3">
                      Email: email@hathyo.com
                    </li>
                  </ol>
                  <li className="text-justify pb-3">
                    Hoặc điền thông tin vào mẫu dưới đây để được hỗ trợ trong vòng 24h. Các trường thu thập thông tin thực hiện theo link:
                  </li>
                  <a 
                    href="https://docs.google.com/forms/d/1gzql2xqEJ7lgfKP2Z8sObTkySHP6Fll8hzhZlTH_n9Q/edit" className="font-medium underline"
                    target="_blank"
                  >
                      Trung tâm hỗ trợ người dùng Hathyo
                  </a>
                </ol>
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
    </main>
  );
}

export default Container;
