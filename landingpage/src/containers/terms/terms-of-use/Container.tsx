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
        <div className="w-full h-[600px] relative">
          <iframe
            src="/helps/term-of-use.pdf"
            title="Cơ chế giải quyết tranh chấp"
            className="absolute top-0 left-0 w-full h-full border-none"
          />
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
