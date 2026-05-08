import { useState } from "react";
import OrderModal from "./OrderModal";
import Button from "../Button";

type Props = {
  orderStatus: string;
};

function Footer({ orderStatus }: Props) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [typeModal, setTypeModal] = useState<string | null>(null);

  const onCancelOrder = () => {
    setVisibleModal(true);
    setTypeModal("CANCEL_ORDER");
  };

  const onReview = () => {
    setVisibleModal(true);
    setTypeModal("REVIEW");
  };

  return (
    <>
      <div className="p-3 border border-white border-b-gray-200">
        {orderStatus === "pending" ? (
          <div className="flex flex-row justify-between items-center">
            <div className="flex gap-4">
              <div className="text-md text-gray-400">Đặt ngày</div>
              <div className="text-md text-blue-400">20/02/2023</div>
            </div>
            <Button type="warning" onClick={onCancelOrder}>
              Hủy đơn
            </Button>
          </div>
        ) : orderStatus === "shipping" ? (
          <div className="flex flex-row justify-between items-center">
            <div className="flex gap-2">
              <div className="flex gap-4">
                <div className="text-md text-gray-400">Đặt ngày</div>
                <div className="text-md text-blue-400">20/02/2023</div>
              </div>
              <div className="flex gap-4">
                <div className="text-md text-gray-400">Đặt nhận dự kiến</div>
                <div className="text-md text-blue-400">20/02/2023</div>
              </div>
            </div>
            <div className="flex flex-end gap-4">
              <Button type="warning" onClick={onCancelOrder}>
                Hủy đơn
              </Button>
              <Button type="primary">Đã nhận hàng</Button>
            </div>
          </div>
        ) : orderStatus === "success" ? (
          <div className="flex flex-row justify-between items-center">
            <div className="flex gap-2">
              <div className="flex gap-4">
                <div className="text-md text-gray-400">Đặt ngày</div>
                <div className="text-md text-blue-400">20/02/2023</div>
              </div>
              <div className="flex gap-4">
                <div className="text-md text-gray-400">Nhận ngày</div>
                <div className="text-md text-blue-400">20/02/2023</div>
              </div>
            </div>
            <div className="flex flex-end gap-4">
              <Button type="warning" onClick={onReview}>
                Đánh giá
              </Button>
              <Button type="primary">Mua lại</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-between items-center">
            <div className="flex gap-2">
              <div className="flex gap-4">
                <div className="text-md text-gray-400">Đặt ngày</div>
                <div className="text-md text-blue-400">20/02/2023</div>
              </div>
              <div className="flex gap-4">
                <div className="text-md text-gray-400">Nhận ngày</div>
                <div className="text-md text-blue-400">20/02/2023</div>
              </div>
            </div>
            <Button type="primary">Mua lại</Button>
          </div>
        )}
      </div>
      {visibleModal && typeModal !== null && (
        <OrderModal
          type={typeModal}
          visible={visibleModal}
          setVisible={setVisibleModal}
        />
      )}
    </>
  );
}

export default Footer;
