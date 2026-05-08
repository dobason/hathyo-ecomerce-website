"use client";
import Button from "@/components/Button";
import Rating from "@/components/Rating";
import { useState } from "react";

function Review() {
  const [rate, setRate] = useState(5);

  return (
    <div className="py-3">
      <div className="py-5 border border-white border-y-gray-200">
        <div className="py-3">
          <Rating
            className="w-full flex justify-center mb-3"
            size="large"
            value={rate}
            setValue={setRate}
          />
        </div>
        <div className="py-3">
          <div className="py-2 text-gray-500 text-base">Nhận xét</div>
          <input
            type="text"
            placeholder="Để lại bình luận của bạn"
            className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="py-4 flex justify-end">
        <Button type="primary">Xác nhận</Button>
      </div>
    </div>
  );
}

export default Review;
