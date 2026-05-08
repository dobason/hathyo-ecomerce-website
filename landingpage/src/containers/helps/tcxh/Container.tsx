"use client";

import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postFeedback } from "@/services/client/feedback";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import { useForm, SubmitHandler } from "react-hook-form";

const schema = yup.object({
  feedbackOrigin: yup.string().required("Vui lòng chọn loại phản hồi"),
  name: yup.string().required("Vui lòng nhập tên"),
  organizationEstablishCode: yup.string().when("feedbackOrigin", {
    is: "ORGANIZATION",
    then: (schema) => schema.required("Vui lòng nhập mã thành lập tổ chức"),
    otherwise: (schema) => schema.notRequired(),
  }),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  feedbackTitle: yup.string().required("Vui lòng nhập tiêu đề"),
  feedbackContent: yup.string().required("Vui lòng nhập nội dung"),
});

interface FormValues {
  feedbackOrigin: string;
  name: string;
  organizationEstablishCode?: string;
  email: string;
  phone: string;
  feedbackTitle: string;
  feedbackContent: string;
}

function FeedbackForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const feedbackOrigin = watch("feedbackOrigin");

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      await postFeedback({ body: data });
      toast.success("Gửi phản hồi thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Gửi phản hồi thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div className="flex flex-col gap-4 xl:gap-8 justify-center items-center container mx-auto xl:py-8 py-4">
      <div className="flex justify-center text-center">
        <h3 className="heading-3 text-Moss/700">
          Tiếp nhận phản ánh của Tổ chức xã hội
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full xl:w-8/12 mx-auto bg-white rounded-lg shadow flex flex-col gap-4 py-6 px-4"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="block mb-1 font-semibold text-gray-700">
              Loại phản hồi
            </label>
            <select
              {...register("feedbackOrigin")}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="INDIVIDUAL">Đề xuất và góp ý</option>
              <option value="ORGANIZATION">Tiếp nhận phản ánh của TCXH</option>
            </select>
            {errors.feedbackOrigin && (
              <p className="text-red-500 text-sm mt-1">
                {errors.feedbackOrigin.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="block mb-1 font-semibold text-gray-700">
              Tên
            </label>
            <input
              {...register("name")}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {feedbackOrigin === "ORGANIZATION" && (
            <div className="flex flex-col gap-1">
              <label className="block mb-1 font-semibold text-gray-700">
                Mã thành lập tổ chức
              </label>
              <input
                {...register("organizationEstablishCode")}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              {errors.organizationEstablishCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.organizationEstablishCode.message}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="block mb-1 font-semibold text-gray-700">
              Số điện thoại
            </label>
            <input
              {...register("phone")}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="block mb-1 font-semibold text-gray-700">
              Tiêu đề
            </label>
            <input
              {...register("feedbackTitle")}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.feedbackTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.feedbackTitle.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="block mb-1 font-semibold text-gray-700">
              Nội dung
            </label>
            <textarea
              {...register("feedbackContent")}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 h-32"
            />
            {errors.feedbackContent && (
              <p className="text-red-500 text-sm mt-1">
                {errors.feedbackContent.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Đang gửi..." : "Gửi phản hồi"}
        </Button>
      </form>
    </div>
  );
}

export default FeedbackForm;
