"use client";
import Button from "@/components/Button";
import { AUTH_STEP } from "@/constants/auth";
import { sentActivationForgotPass } from "@/services/client/auth";
import { memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type FormInput = {
  phone?: string;
};
function ForgotPassword({ setCurrentData, setCurrentStep }: any) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { phone } = data;
    setLoading(true);
    try {
      const response = await sentActivationForgotPass({
        body: { phone },
      });
      if (response) {
        if (response?.code) {
          setError("phone", {
            message:
              response.message ||
              "Có lỗi xảy ra trong quá trình gửi mã xác nhận",
          });
        } else {
          setCurrentData({ phone });
          setCurrentStep(AUTH_STEP.RESET_PASSWORD);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="py-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-md text-Grayiron/600 font-normal mb-5">
        Vui lòng nhập Số điện thoại, Hathyo sẽ gửi đến bạn mã xác minh để lấy
        lại mật khẩu.
      </div>
      <div className="mb-5">
        <input
          {...register("phone", {
            required: "Vui lòng nhập email hoặc số điện thoại",
          })}
          placeholder="Nhập email/ số điện thoại"
          className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
        />
        {errors.phone && (
          <p className="text-red-500 mt-2">{errors.phone.message}</p>
        )}
      </div>
      <div className="mb-5">
        <Button loading={loading} className="m-auto w-full" type="primary">
          Xác nhận
        </Button>
      </div>
    </form>
  );
}

export default memo(ForgotPassword);
