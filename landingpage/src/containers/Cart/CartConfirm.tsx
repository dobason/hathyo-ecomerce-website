"use client";

import { memo } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { formatToCurrencyVND } from "@/utils/commonHelper";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateAllIsChoose } from "@/store/cartSlice";

type Props = {
  className?: string;
};

function CartConfirm({ className = "" }: Props) {
  const router = useRouter();
  const carts = useAppSelector((state) => state.cart.carts);
  const totalChooseItem = useAppSelector((state) => state.cart.totalChooseItem);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const selectedShippingMethods = useAppSelector(
    (state) => state.payment.selectedShippingMethods
  );
  const dispatch = useAppDispatch();
  const displayCount = useAppSelector(
    (state) => state.cart.totalProductsInCart
  );

  const onToggleSelectAll = () => {
    dispatch(updateAllIsChoose({ choose: !carts?.choose }));
  };

  const onSubmit = () => {
    if (totalChooseItem && totalChooseItem > 0 && carts.carts?.length) {
      const selectedCarts = carts.carts.filter((cart) => cart.choose);
      const allHaveShipping = selectedCarts.every(
        (cart) => !!selectedShippingMethods[cart.id]
      );
      // if (!allHaveShipping) {
      //   toast.warning(
      //     "Vui lòng chọn phương thức vận chuyển cho tất cả sản phẩm đã chọn"
      //   );
      //   return;
      // }
      router.push("/payment");
    } else {
      toast.warning("Bạn chưa chọn sản phẩm để đặt hàng");
    }
  };

  return (
    <div className={"bg-white rounded-2xl p-6 text-white " + className}>
      {/* <div className="w-full flex justify-end border border-white border-b-Moss/200 py-4">
        <div className="xl:w-3/5 flex justify-start">
          <div className=" flex justify-start items-center gap-4">
            <DiscountFill />
            <div className="text-base text-gray-600">Khuyến mãi</div>
          </div>
          <div className=" flex justify-end text-base text-[#32D583]">
            Chọn hoặc nhập mã
          </div>
        </div>
      </div> */}
      <div className="w-full my-5 flex justify-between pt-4">
        <div className="xl:w-3/5 w-1/2 flex justify-start">
          <div className="xl:w-1/2 w-full flex flex-col items-start gap-2">
            <div className="flex flex-row justify-start items-center gap-4 xl:gap-8">
              <input
                type="checkbox"
                className="h-5 w-5 text-Moss/400"
                checked={carts?.choose}
                onChange={onToggleSelectAll}
              ></input>
              <div className="xl:hidden text-md text-gray-600">Chọn tất cả</div>
              <div className="xl:block hidden text-base text-gray-600">
                Chọn tất cả sản phẩm ({displayCount} sản phẩm)
              </div>
            </div>
            <div className="xl:flex justify-start items-center gap-4">
              <div className="xl:text-base text-md text-gray-600 flex justify-start items-center">
                Tổng cộng
              </div>
              <div className="xl:text-xl text-base text-Moss/400 flex justify-start items-center">
                {formatToCurrencyVND(totalPrice)}
              </div>
            </div>
          </div>
        </div>
        <div className="xl:w-2/5 w-1/2 flex justify-end flex-wrap">
          <div className="xl:w-1/2 w-full flex flex-col items-end gap-2">
            <Button
              type="primary"
              onClick={onSubmit}
              className="w-fit flex justify-center items-center xl:mt-0 mt-3"
            >
              Đặt hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CartConfirm);
