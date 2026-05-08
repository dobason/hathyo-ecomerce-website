"use client";
import Button from "@/components/Button";

function CancelOrder() {
  return (
    <div className="py-3">
      <div className="py-3 border border-white border-y-gray-200">
        <div className="py-3">
          <label className="inline-flex items-center">
            <input type="checkbox" />
            <span className="ml-2 text-base text-gray-600 font-normal">
              Mua Nhầm Sản Phẩm
            </span>
          </label>
        </div>
        <div className="py-3">
          <label className="inline-flex items-center">
            <input type="checkbox" />
            <span className="ml-2 text-base text-gray-600 font-normal">
              Thay đổi thông tin người nhận
            </span>
          </label>
        </div>
        <div className="py-3">
          <label className="inline-flex items-center">
            <input type="checkbox" />
            <span className="ml-2 text-base text-gray-600 font-normal">
              Thay đổi phương thức thanh toán
            </span>
          </label>
        </div>
        <div className="py-3">
          <label className="inline-flex items-center">
            <input type="checkbox" />
            <span className="ml-2 text-base text-gray-600 font-normal">
              Thay đổi phương thức vận chuyển
            </span>
          </label>
        </div>
        <div className="py-3">
          <label className="inline-flex items-center">
            <input type="checkbox" />
            <span className="ml-2 text-base text-gray-600 font-normal">
              Khác
            </span>
          </label>
        </div>
        <div className="py-3">
          <textarea className="w-full rounded-md" placeholder="Lí do khác" />
        </div>
      </div>
      <div className="py-3 flex justify-end">
        <Button type="primary">Mua Hàng</Button>
      </div>
    </div>
  );
}

export default CancelOrder;
