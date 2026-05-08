import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Order } from "@/types/orders";
import { cancelOrderService } from "@/services/client/orders";
import { toast } from "react-toastify";

interface FormValues {
  reason: string;
  customReason?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  order?: Order;
  refreshData: () => void;
}

const reasons = [
  "Thay đổi thông tin nhận hàng (địa chỉ, số điện thoại...)",
  "Thêm/thay đổi mã giảm giá",
  "Thay đổi sản phẩm (kích thước, màu sắc, số lượng…)",
  "Tìm thấy chỗ khác giá tốt hơn",
  "Không còn nhu cầu mua",
  "Quá trình thanh toán gặp lỗi/rắc rối",
  "Thời gian giao hàng lâu hơn mong đợi",
  "Sản phẩm không còn hàng (người bán thông báo hết hàng sau khi đặt)",
  "Khác",
];

// Validation Schema
const schema = Yup.object({
  reason: Yup.string().required("A reason is required"),
  customReason: Yup.string(),
});

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  order,
  refreshData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const reasonWatch = watch("reason");

  const onSubmit: SubmitHandler<FormValues> = async ({
    reason,
    customReason,
  }) => {
    try {
      if (order?.id) {
        const finalReason = reason === "Other" ? customReason : reason;
        const res = await cancelOrderService({
          id: order?.id,
          body: {
            cancelReason: finalReason,
          },
        });
        if (!!res.code && !!res.message) {
          toast.error(res.message ?? "Hủy thất bại");
          return;
        }
        toast.success("Hủy thành công");
        refreshData();
      }
    } catch (e) {
      console.log("Error", e);
    } finally {
      reset(); // reset after form submit
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {reasons.map((r) => (
            <div key={r} className="flex items-center">
              <input
                {...register("reason")}
                type="radio"
                value={r}
                className="form-radio h-4 w-4 text-Moss/600"
              />
              <span className="ml-2 text-gray-700">{r}</span>
            </div>
          ))}
          {errors.reason && (
            <p className="text-red-500 text-xs">{errors.reason.message}</p>
          )}
          {reasonWatch === "Other" && (
            <input
              {...register("customReason")}
              type="text"
              placeholder="Specify your reason"
              className="mt-2 form-input rounded-md shadow-sm w-full"
            />
          )}
          {errors.customReason && (
            <p className="text-red-500 text-xs">
              {errors.customReason.message}
            </p>
          )}
        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-4 py-2 bg-Moss/500 text-white rounded-lg"
          >
            Chấp nhận
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-Grayiron/200 text-white rounded-lg"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
