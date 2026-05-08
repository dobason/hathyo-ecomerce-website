"use client";

import Image from "next/image";

// Define the interface for the component props
interface PromoCardProps {
  imageSrc: string;
  discount: string;
  minimumOrder: string;
  expiryDate: string;
  actionText: string;
}

// Use the PromoCardProps interface in your functional component
function PromoCard({
  imageSrc,
  discount,
  minimumOrder,
  expiryDate,
  actionText,
}: PromoCardProps) {
  return (
    <div className="my-3 rounded-2xl shadow-Shadow/md overflow-hidden">
      <div className="flex flex-row flex-nowrap">
        <div className="w-1/4">
          <div className="relative w-full h-full">
            <Image src={imageSrc} alt="promo" layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="w-3/4 p-3 flex flex-col gap-3">
          <div className="text-base text-Moss/400 font-medium">{discount}</div>
          <div className="text-base text-gray-600 font-normal">
            {minimumOrder}
          </div>
          <div className="flex flex-row flex-nowrap justify-between">
            <div className="text-base text-gray-400 font-normal">
              HSD: {expiryDate}
            </div>
            <div className="text-base text-[#FDB022] font-normal">
              {actionText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromoCard;
