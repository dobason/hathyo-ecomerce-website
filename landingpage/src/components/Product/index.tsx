"use client";
import classNames from "classnames";
import Fire from "../Icons/Fire";
import Rating from "../Rating";
import { formatToCurrencyVND } from "@/utils/commonHelper";
import ImageFallback from "../ImageFallback";
import { useRouter } from "next/navigation";
import Item from "../OrderInformation/Item";

const Product = ({
  id,
  title,
  mainImageUrl,
  discountPercent,
  rating,
  anchoPrice,
  price,
  className,
}: {
  id?: number | undefined;
  title?: string | undefined;
  mainImageUrl?: string | undefined;
  rate?: number | undefined;
  price?: number | undefined;
  discountPercent?: number | undefined;
  rating?: number | undefined;
  anchoPrice?: number | undefined;
  className?: string;
  onAddToCart?: any | undefined;
}) => {
  const router = useRouter();

  const onClickProduct = (e: any) => {
    e.preventDefault();
    router.push(`/product/${id}`);
  };

  return (
    <div
      className={classNames(
        "bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full",
        className
      )}
      onClick={onClickProduct}
    >
      {/* Thay đổi từ w-[260px] thành w-full để responsive */}
      <div className="w-full aspect-square relative overflow-hidden">
        <ImageFallback
          src={mainImageUrl}
          fallback="/logo_icon.svg"
          alt={Item.name}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="px-2 py-2 flex flex-1 flex-col gap-1">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-start gap-4">
            <span className="body-lg-semibold text-Warning/500">
              {formatToCurrencyVND(price)}
            </span>
            <div className="flex items-center gap-1 text-green-700 font-bold">
              {!!discountPercent &&
                discountPercent > 0 &&
                discountPercent < 100 && (
                  <div
                    onClick={onClickProduct}
                    className="rounded-md bg-green-700 text-white py-[2px] px-1 flex items-center gap-1"
                  >
                    🔥
                    <span className="label-normal">{discountPercent}%</span>
                  </div>
                )}
            </div>
          </div>
        </div>
        {!!rating && rating > 0 && (
          <div className="flex items-center text-black">
            Đánh giá: <Rating size="xs" value={rating} />
          </div>
        )}
        <div
          onClick={onClickProduct}
          className="text-Grayiron/600 body-md-bold line-clamp-2 group-hover:text-Moss/500 text-base"
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default Product;