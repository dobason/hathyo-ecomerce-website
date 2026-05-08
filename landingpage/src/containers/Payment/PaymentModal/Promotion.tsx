"use client";
import Button from "@/components/Button";
import PromoCard from "./PromoCard";
import Image from "next/image";

const promoData = [
  {
    id: 1,
    imageSrc: "/promo.png",
    discount: "Giảm 50% cho đơn hàng đầu tiên",
    minimumOrder: "Đơn hàng tối thiểu 500.000đ",
    expiryDate: "31/12/2025",
    actionText: "Sử dụng ngay",
  },
  {
    id: 2,
    imageSrc: "/promo.png",
    discount: "Giảm 30% cho mỗi mua hàng trên 1.000.000đ",
    minimumOrder: "Đơn hàng tối thiểu 1.000.000đ",
    expiryDate: "30/06/2025",
    actionText: "Áp dụng ngay",
  },
  {
    id: 3,
    imageSrc: "/promo.png",
    discount: "Tặng phiếu quà tặng 100.000đ",
    minimumOrder: "Không yêu cầu giá trị đơn hàng tối thiểu",
    expiryDate: "31/01/2025",
    actionText: "Nhận quà",
  },
];

function Promotion() {
  return (
    <div className="py-6">
      <div className="border border-white border-t-gray-200">
        <div className="py-4 flex flex-row flex-nowrap justify-between gap-4">
          <div className="flex-1">
            <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
              <input
                className="flex-1 pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
                placeholder="Nhập mã khuyễn mãi"
              />
            </div>
          </div>
          <div className="w-fit">
            <Button className="w-full" type="primary">
              Áp dụng
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 py-2">
          {true ? (
            <Image
              src={"/empty.svg"}
              alt="promo"
              height={128}
              width={128}
              className="mx-auto"
            />
          ) : (
            promoData?.map((item, idx) => (
              <div
                className="flex flex-col gap-2"
                key={`coupon-${idx}-${item.id}`}
              >
                <PromoCard {...item} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Promotion;
