/* eslint-disable @next/next/no-img-element */
import { useState, Fragment } from "react";
import { map, slice } from "lodash";
import { toast } from "react-toastify";

import Item from "./Item";
import ModalCancel from "./ModalCancel";
import ModalReturn from "./ModalReturn";
import RatingModal from "./RatingModal";
import Button from "@/components/Button";

import { recievedOrderService } from "@/services/client/orders";
import { ORDER_STATUS } from "@/constants/order_status";
import { formatToCurrencyVND } from "@/utils/commonHelper";
import { Order, OrderItem } from "@/types/orders";

type Props = {
  header: string;
  orderList: OrderItem[];
  footer?: React.ReactNode;
  orderStatus: string;
  item?: Order;
  refreshData: () => void;
  // NEW: Add these props to handle notes and order details
  userNote?: string; // The user's previous note
  onOpenOrderDetail?: (orderId: string) => void; // Function to open order details
};

const OrderInformation = ({
  header,
  orderList,
  footer,
  orderStatus,
  item,
  refreshData,
  userNote, // NEW: User's note
  onOpenOrderDetail, // NEW: Function to open details
}: Props) => {
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [visibleReturn, setVisibleReturn] = useState(false);
  const [visibleRating, setVisibleRating] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [ratingItem, setRatingItem] = useState<OrderItem>();
  // NEW: State to show/hide the note section
  const [showNoteSection, setShowNoteSection] = useState(false);
  const userNoteToDisplay = item?.userNote || userNote || "";
  const getStatusColor = (status: string) => {
    return (
      {
        PENDING: "text-blue-500",
        IN_TRANSIT: "text-yellow-500",
        DELIVERED: "text-green-500",
        CANCELLED: "text-red-500",
      }[status] || "text-orange-500"
    );
  };

  const renderOrderStatus = (status: string) => {
    const statusObj = ORDER_STATUS.find((it) => it.key === status);
    return (
      <span className={`text-sm font-semibold ${getStatusColor(status)}`}>
        {statusObj?.value}
      </span>
    );
  };

  const handleRating = (item: OrderItem) => {
    setRatingItem(item);
    setVisibleRating(true);
  };

  const handleReceive = async () => {
    try {
      if (item?.id) {
        const res = await recievedOrderService({ id: item.id });
        if (res?.code && res?.message) {
          toast.error(res.message || "Nhận hàng thất bại");
        } else {
          toast.success("Nhận hàng thành công");
          refreshData();
        }
      }
    } catch {
      toast.error("Có lỗi xảy ra khi nhận hàng");
    }
  };

  // NEW: Function to handle opening order details
  const handleOpenOrderDetail = () => {
    if (onOpenOrderDetail && item?.id) {
      onOpenOrderDetail(item.id.toString());
    }
  };

  return (
    <Fragment>
      <div className="bg-white rounded-2xl shadow-md my-5 p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-base font-semibold text-gray-700 truncate">
            {header}
          </h3>
          <div className="flex items-center gap-2">
            {renderOrderStatus(orderStatus)}
            {/* NEW: Button to show note/details options */}
            <button
              onClick={() => setShowNoteSection(!showNoteSection)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              📝 Chi tiết & Ghi chú
            </button>
          </div>
        </div>

        {/* NEW: Note and Detail Section */}
        {showNoteSection && (
          <div className="bg-gray-50 rounded-lg p-3 space-y-3">
            {/* Show user's note if it exists */}
            {userNote && userNote.trim() !== "" ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">📝</span>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Lời nhắn của bạn:
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      &ldquo;{userNoteToDisplay}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">💡</span>
                  <p className="text-sm text-gray-600">
                    Bạn chưa có lời nhắn nào cho đơn hàng này
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Product Items */}
        <div className="divide-y">
          {map(slice(orderList, 0, 2), (item, index) => (
            <Item
              key={index}
              orderStatus={orderStatus}
              item={item}
              onRating={handleRating}
            />
          ))}
        </div>

        {orderList.length > 2 && (
          <div className="text-center text-gray-400 text-sm">
            Xem thêm ({orderList.length - 2} sản phẩm)
          </div>
        )}

        {/* Shipping + Payment Info */}
        <div className="w-full flex justify-end">
          <div className="InfoRow flex flex-col xl:flex-row gap-2 xl:gap-3 justify-between items-end xl:items-center text-sm text-gray-600 w-full xl:w-8/12">
            <InfoRow label="Đơn vị vận chuyển">
              <img
                src=""
                alt="shipping unit"
                className="w-[120px] h-[32px] object-contain"
              />
            </InfoRow>
            <InfoRow label="Chi phí">
              <span className="text-Moss/400 font-medium">
                {formatToCurrencyVND(item?.shippingFee)}
              </span>
            </InfoRow>
            <InfoRow label="Tổng thanh toán">
              <span className="text-Moss/400 font-semibold">
                {formatToCurrencyVND(item?.totalPrice)}
              </span>
            </InfoRow>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          {orderStatus === "PENDING" && (
            <Button
              type="danger"
              size="small"
              onClick={() => setVisibleCancel(true)}
            >
              Hủy đơn hàng
            </Button>
          )}
          {orderStatus === "DELIVERED" && (
            <>
              <Button
                size="small"
                type="primary-outlined"
                onClick={() => setVisibleReturn(true)}
              >
                Yêu cầu trả hàng
              </Button>
              <Button
                size="small"
                type="primary"
                onClick={() => setShowConfirmModal(true)}
              >
                Đã nhận được hàng
              </Button>
            </>
          )}
        </div>

        {footer && <div className="pt-2">{footer}</div>}
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
            <h4 className="text-lg font-semibold mb-2">Xác nhận</h4>
            <p className="text-sm text-gray-600 mb-4">
              Vui lòng chỉ nhấn <strong>Xác nhận</strong> khi đơn hàng bạn nhận
              được không gặp vấn đề nào và Hathyo sẽ thanh toán số tiền này cho
              Người bán
            </p>
            <div className="flex justify-end gap-2">
              <Button
                size="small"
                type="danger"
                onClick={() => setShowConfirmModal(false)}
              >
                Hủy
              </Button>
              <Button
                size="small"
                type="primary-outlined"
                onClick={() => {
                  setShowConfirmModal(false);
                  handleReceive();
                }}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {visibleCancel && (
        <ModalCancel
          isOpen={visibleCancel}
          onClose={() => setVisibleCancel(false)}
          title="Hủy đơn hàng"
          order={item}
          refreshData={refreshData}
        />
      )}
      {visibleReturn && (
        <ModalReturn
          isOpen={visibleReturn}
          onClose={() => setVisibleReturn(false)}
          title="Yêu cầu hoàn trả"
          order={item}
          refreshData={refreshData}
          orderList={orderList}
        />
      )}
      {visibleRating && (
        <RatingModal
          visible={visibleRating}
          onClose={() => setVisibleRating(false)}
          productId={ratingItem?.productId}
          orderItemId={ratingItem?.id}
        />
      )}
    </Fragment>
  );
};

const InfoRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
    <div className="text-sm text-gray-400 font-medium truncate">{label}:</div>
    {children}
  </div>
);

export default OrderInformation;
