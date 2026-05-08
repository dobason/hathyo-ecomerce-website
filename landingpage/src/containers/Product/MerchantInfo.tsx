/* eslint-disable @next/next/no-img-element */
"use client";

import { memo, useRef, useEffect } from "react";
import Button from "@/components/Button";
import Chat from "@/components/Icons/Chat";
import Store from "@/components/Icons/Store";
import dayjs from "dayjs";
import Image from "@/components/ImageFallback";
import classNames from "classnames";
import Rating from "@/components/Rating";
import gsap from "gsap";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

type Props = {
  className?: string;
  logo?: string;
  storeName?: string;
  createdAt?: string;
  numOfTotalProducts?: number;
  numOfFollowers?: number;
  responseRate?: number;
  banner?: string;
  id?: string;
  rating?: number;
};

function MerchantInfo({
  className = "",
  logo,
  storeName,
  createdAt,
  numOfTotalProducts,
  banner,
  id,
  rating,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(blocksRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col gap-2 bg-white shadow-Shadow/md rounded-xl"
    >
      {!!banner && (
        <img
          alt="merchant banner"
          className="mb-[-24px] h-[300px] w-full object-cover rounded-t-lg mt-6"
          src={banner}
        />
      )}

      <div
        ref={(el) => void (blocksRef.current[0] = el)}
        className={classNames(
          "p-6 flex flex-row rounded-xl xl:flex-row flex-col justify-between",
          {
            "rounded-t-none": banner,
          },
          className
        )}
      >
        <div
          ref={(el) => void (blocksRef.current[1] = el)}
          className="flex flex-row"
        >
          <div>
            <Image
              width={109}
              height={109}
              className="object-cover xl:w-[109px] xl:h-[109px] w-[80px] h-[80px] rounded-full mr-4"
              src={logo ?? "/logo_icon.svg"}
              alt="merchant logo"
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <div className="text-xl line-clamp-2 text-Grayiron/700 font-semibold">
              {storeName}
            </div>
            {!!rating && (
              <Rating className="justify-start" size="small" value={rating} />
            )}
            <div className="flex flex-row">
              <Button
                size="small"
                type="primary"
                className="mr-2 xl:w-auto w-[47px]"
                icon={<Chat />}
                onClick={() => {
                  window.location.href = "https://www.facebook.com/hathyoVN";
                }}
              >
                <span className="hidden xl:block">Chat ngay</span>
              </Button>
              <Button
                className="xl:w-auto w-[47px]"
                size="small"
                type="secondary"
                icon={<Store />}
                href={`/merchant/${id}`}
              >
                <span className="hidden xl:block">Ghé shop</span>
              </Button>
            </div>
          </div>
        </div>

        <div
          ref={(el) => void (blocksRef.current[2] = el)}
          className="flex flex-col justify-around py-2"
        >
          <div className="flex flex-row justify-between">
            <div className="text-base text-Grayiron/400 font-normal mr-6">
              Sản phẩm
            </div>
            <div className="text-base text-Moss/600 font-semibold">
              {numOfTotalProducts}
            </div>
          </div>
        </div>

        <div
          ref={(el) => void (blocksRef.current[3] = el)}
          className="flex flex-col justify-around py-2"
        >
          <div className="flex flex-row justify-between">
            <div className="text-base text-Grayiron/400 font-normal mr-6">
              Tham gia
            </div>
            <div className="text-base text-Moss/600 font-semibold">
              {!!createdAt ? dayjs(createdAt).fromNow(true) : "Hôm nay"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(MerchantInfo);
