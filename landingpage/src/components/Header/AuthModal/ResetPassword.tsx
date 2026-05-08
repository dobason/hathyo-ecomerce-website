"use client";
import Button from "@/components/Button";
import { AUTH_STEP } from "@/constants/auth";
// import { AUTH_STEP } from "@/constants/auth";
import {
  resetPassword,
  sentActivationForgotPass,
} from "@/services/client/auth";
import { map } from "lodash";
import { memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormInput = {
  password?: string;
  confirmPassword?: string;
  key?: string;
};

function ResetPassword({ currentData, setCurrentData, setCurrentStep }: any) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { confirmPassword, password, key } = data;

    if (confirmPassword !== password) {
      setError("confirmPassword", { message: "Mật khẩu không khớp" });
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword({
        body: {
          key,
          phone: currentData?.phone,
          email: currentData?.phone,
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
              response.message || "Có lỗi xảy ra trong quá trình reset mật khẩu"
            );
          }
        } else {
          toast.success(
            "Reset mật khẩu thành công, vui lòng đăng nhập lại để tiếp tục"
          );
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

  const resendActivation = async () => {
    try {
      const { phone } = currentData;
      const response = await sentActivationForgotPass({
        body: { phone },
      });
      if (response?.code) {
        toast.error(response?.message);
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
        <div className="mb-5">
          <input
            {...register("key", {
              required: "Vui lòng nhập mã xác nhận",
            })}
            placeholder="Nhập mã xác nhận đã được gửi qua email/sdt của bạn"
            className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
          />
          {errors.key && (
            <p className="text-red-500 mt-2">{errors.key.message}</p>
          )}
        </div>

        <div className="text-md text-Grayiron/400 text-center cursor-pointer mb-5">
          Không nhận được mã xác minh ?{" "}
          <span onClick={resendActivation} className="text-Moss/500">
            Gửi lại mã
          </span>
        </div>
        <hr className="my-2 mx-6" />
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

export default memo(ResetPassword);
