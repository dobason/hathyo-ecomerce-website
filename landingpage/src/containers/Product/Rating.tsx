"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { getProductRating } from "@/services/client/product";
import { Review, ProductDetail } from "@/types";
import Rating from "@/components/Rating";
import Pagination from "@/components/Pagination";
import gsap from "gsap";

type Props = {
  className?: string;
  id: string | number;
  product: ProductDetail;
};

type ReviewResponse = {
  currentPage: number;
  rates: Review[];
  totalElements: number;
  totalPages: number;
};

const ProductReviews = ({ id, product }: Props) => {
  const [data, setData] = useState<ReviewResponse>();
  const [curPage, setCurPage] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(blocksRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [data]);

  useEffect(() => {
    onInitValues();
  }, [id, curPage]);

  const onInitValues = async () => {
    try {
      const res = await getProductRating({
        params: { page: curPage, limit: 12, productId: id },
      });
      setData(res);
    } catch (e) {
      console.error("Error", e);
    }
  };

  if (product.rating <= 0) return null;

  return (
    <div
      ref={wrapperRef}
      className="bg-white p-6 rounded-lg flex flex-col gap-6"
    >
      <h5 ref={(el) => void (blocksRef.current[0] = el)} className="heading-5">
        ĐÁNH GIÁ SẢN PHẨM
      </h5>

      <div className="flex flex-col gap-4">
        <div
          ref={(el) => void (blocksRef.current[1] = el)}
          className="flex items-center gap-4"
        >
          <div className="text-red-600 heading-1">{product.rating}</div>
          <div>
            <div className="flex text-yellow-400">
              <Rating
                className="justify-center xl:justify-start"
                size="default"
                value={product.rating}
              />
            </div>
            <div className="body-sm-semibold text-gray-600">trên 5</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {data?.rates?.map((review, index) => (
            <div
              key={review.id}
              ref={(el) => void (blocksRef.current[index + 2] = el)}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 font-semibold">
                <div className="body-sm-semibold">{review.userName}</div>
                <div className="text-gray-500 body-sm-semibold">
                  | {dayjs(review.createdAt).format("YYYY-MM-DD HH:mm")}
                </div>
              </div>

              <Rating
                className="justify-center xl:justify-start"
                size="small"
                value={review?.rate}
              />
              <div className="body-sm-medium text-gray-600">
                Phân loại hàng: {review.orderItem.productTitle}
              </div>

              <p className="body-sm-semibold text-gray-800">{review.comment}</p>

              {!!review.imageUrls && (
                <div className="flex gap-2 mt-2">
                  <Image
                    src={review.imageUrls}
                    alt="Review image"
                    width={100}
                    height={100}
                    className="object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <Pagination
          totalPages={data?.totalPages ?? 0}
          currentPage={data?.currentPage ?? 0}
          setCurPage={setCurPage}
        />
      </div>
    </div>
  );
};

export default ProductReviews;
