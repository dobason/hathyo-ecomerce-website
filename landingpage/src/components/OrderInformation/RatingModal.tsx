import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/Modal";
import UploadImage from "@/components/UploadImage";
import { Rating, ThinStar } from "@smastrom/react-rating";
import { ratingOrderItem } from "@/services/client/orders";
import { toast } from "react-toastify";
import "@smastrom/react-rating/style.css";

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  productId?: number;
  orderItemId?: number;
}

interface RatingFormData {
  rate: number;
  comment: string;
  imageUrls?: string;
}

const schema = yup.object().shape({
  rate: yup.number().min(1, "Vui lòng chọn ít nhất 1 sao").required(),
  comment: yup.string().required("Vui lòng nhập nhận xét"),
  imageUrls: yup.string().optional(),
});

const RatingModal: React.FC<RatingModalProps> = ({
  visible,
  onClose,
  productId,
  orderItemId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RatingFormData>({
    defaultValues: {
      rate: 0,
      comment: "",
      imageUrls: "",
    },
    resolver: yupResolver(schema),
  });

  const rate = watch("rate");

  const onFormSubmit = async (data: RatingFormData) => {
    try {
      await ratingOrderItem({
        body: {
          productId,
          orderItemId,
          ...data,
        },
      });
      toast.success("Đánh giá thành công!");
      reset();
      onClose();
    } catch (e) {
      console.log("Error", e);
    }
  };

  const footer = (
    <div className="flex justify-end gap-2 mt-6">
      <button
        type="button"
        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
        onClick={onClose}
      >
        Hủy
      </button>
      <button
        type="submit"
        form="rating-form"
        className="px-4 py-2 rounded-md bg-Moss/500 text-white hover:bg-Moss/700"
      >
        Gửi đánh giá
      </button>
    </div>
  );

  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Đánh giá sản phẩm"
      footer={footer}
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        id="rating-form"
        className="flex flex-col gap-4 py-4"
      >
        {/* Rating */}
        <div className="flex flex-col gap-1">
          <Rating
            itemStyles={myStyles}
            style={{ maxWidth: 300 }}
            value={rate}
            onChange={(val: number) => setValue("rate", val)}
          />
          {errors.rate && (
            <p className="text-red-500 text-sm mt-1">{errors.rate.message}</p>
          )}
        </div>

        {/* Comment */}
        <div className="flex flex-col gap-1">
          <textarea
            className="focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50 placeholder:text-Grayiron/300 placeholder:text-md text-Grayiron/600 border-Grayiron/200 resize-y rounded-xl w-full"
            rows={2}
            placeholder="Viết nhận xét..."
            {...register("comment")}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            <div className="text-base text-gray-500 font-medium">Ảnh</div>
            <UploadImage
              showIcon={false}
              customKey="imageUrls"
              setValue={setValue}
              watch={watch}
            />
          </div>

          {errors.imageUrls && (
            <p className="text-red-500 text-sm mt-1">
              {errors.imageUrls.message}
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default RatingModal;
