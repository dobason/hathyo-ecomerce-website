"use client";
import Button from "@/components/Button";
import { AUTH_STEP } from "@/constants/auth";
// import { AUTH_STEP } from "@/constants/auth";
import { createPassword } from "@/services/client/auth";
import { map } from "lodash";
import { memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormInput = {
  password?: string;
  confirmPassword?: string;
};

function CreatePassword({ currentData, setCurrentData, setCurrentStep }: any) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { confirmPassword, password } = data;

    if (confirmPassword !== password) {
      setError("confirmPassword", { message: "Mật khẩu không khớp" });
      return;
    }

    setLoading(true);
    try {
      const response = await createPassword({
        body: {
          key: currentData?.key,
          phone: currentData?.phone,
          email: currentData?.email,
          password,
        },
      });
      if (response) {
        if (response?.code) {
          if (response?.validationErrors) {
            map(response?.validationErrors, (item): any => {
              setError(item?.field, {
                message: item.message,
              });
            });
          } else {
            toast.error(
              response.message || "Có lỗi xảy ra trong quá trình tạo mật khẩu"
            );
          }
        } else {
          setCurrentData({});
          setCurrentStep(AUTH_STEP.LOGIN);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="py-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="text-md text-Grayiron/600 font-normal mb-6">
          Bạn có thể tạo một mật khẩu mới gồm 8 kí tự ngay bây giờ. Hoặc có thể
          bấm `Bỏ qua` và thiết lập mật khẩu sau tại màn hình Thông tin cá nhân.
        </div>
        <div className="text-Grayiron/500 font-normal">Mật khẩu mới</div>
        <div className="my-1">
          <input
            {...register("password", {
              required: "Vui nhập mật khẩu mới",
            })}
            type="password"
            placeholder="Nhập mật khẩu mới"
            className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
          />
          {errors.password && (
            <p className="text-red-500 mt-2">{errors.password.message}</p>
          )}
        </div>
        <div className="text-Grayiron/500 font-normal mt-3">
          Nhập lại mật khẩu
        </div>
        <div className="my-1">
          <input
            {...register("confirmPassword", {
              required: "Vui lòng nhập lại mật khẩu",
            })}
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 mt-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="mt-6">
          <Button
            loading={loading}
            htmlType="submit"
            className="m-auto w-full"
            type="primary"
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </form>
  );
}

export default memo(CreatePassword);
