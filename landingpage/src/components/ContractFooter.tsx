import React, { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import Call from "./Icons/Call";
import Mail from "./Icons/Mail";

function ContractFooter() {
  return (
    <main>
      <div className="flex justify-center xl:m-10 m-4">
        <div className="body-lg-semibold text-center text-Moss/700">
          Bạn có muốn tìm thêm thông tin gì không?
        </div>
      </div>
      <div className="flex xl:flex-row flex-col justify-center xl:m-10 m-4 gap-5">
        <Button className="w-full xl:w-fit">
          <Link href="tel:0084-827000248">
            <div className="flex justify-center items-center gap-2 body-semibold  text-Moss/500">
              <Call className="w-5 h-5"></Call>
              <p className="body-sm-medium">0827000248</p>
            </div>
          </Link>
        </Button>
        <Button className="w-full xl:w-fit">
          <Link href="mailto:email@hathyo.com">
            <div className="flex justify-center items-center gap-2 body-semibold  text-Moss/500">
              <Mail className="w-5 h-5"></Mail>
              <p className="body-sm-medium">Email Hathyo</p>
            </div>
          </Link>
        </Button>
      </div>
    </main>
  );
}

export default ContractFooter;
