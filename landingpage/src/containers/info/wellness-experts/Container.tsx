import React from "react";
import Button from "@/components/Button";
import Call from "@/components/Icons/Call";
import Mail from "@/components/Icons/Mail";
import Image from "next/image";
import Link from "next/link";

function Container() {
  return (
    <main>
      <div className="container m-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="xl:w-3/4 flex my-5 justify-center text-center">
            <div className="heading-3 text-Moss/700">
              Cộng tác viên vui khỏe
            </div>
          </div>
          <div className="w-3/4 flex flex-row my-5 justify-center">
            <Image
              className="w-3/4 h-3/4 object-cover"
              alt="main banner"
              src="/update.svg"
              width="600"
              height="600"
            />
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
