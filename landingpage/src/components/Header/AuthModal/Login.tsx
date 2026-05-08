"use client";

import Button from "@/components/Button";
import { ACCESS_TOKEN, AUTH_STEP, REFRESH_TOKEN } from "@/constants/auth";
import { signIn } from "@/services/client/auth";
import { setCookie } from "cookies-next";
import { map } from "lodash";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";

type FormProps = {
  email?: string;
  password?: string;
};

function Login({ setCurrentStep, onClose }: any) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormProps>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const { email, password } = data;

    setLoading(true);
    try {
      const response = await signIn({ body: { email, password } });
      if (!response?.accessToken || !response?.refreshToken || response?.code) {
        if (response?.validationErrors) {
          map(response.validationErrors, (item) =>
            setError(item?.field, { message: item.message })
          );
        }
        toast.error("Tên tài khoản hoặc mật khẩu không chính xác");
        return;
      }
      toast.success("Đăng nhập thành công");
      setCookie(ACCESS_TOKEN, response.accessToken);
      setCookie(REFRESH_TOKEN, response.refreshToken);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const usePasswordToggle = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    return { showPassword, togglePassword };
  };

  const { showPassword, togglePassword } = usePasswordToggle();

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-white rounded-lg overflow-hidden">
      {/* Left: Login Form */}
      <div className="w-full md:w-1/2 xl:p-8 md:p-4 p-2">
        <h2 className="text-2xl font-bold mb-2">Xin chào,</h2>
        <p className="mb-6 text-gray-500">Đăng nhập hoặc tạo tài khoản</p>
        <form onSubmit={handleSubmit(onSubmit)} className="py-2">
          <div className="mb-5">
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              {...register("email", {
                required: "Vui lòng nhập email",
              })}
              placeholder="Nhập email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label className="block mb-1 text-gray-600">Mật khẩu</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                    <line x1="2" y1="2" x2="22" y2="22"></line>
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <div
              onClick={() => setCurrentStep(AUTH_STEP.FORGOT_PASSWORD)}
              className="text-right text-sm text-gray-500 mt-2 cursor-pointer"
            >
              Quên mật khẩu?
            </div>
          </div>
          <div className="mb-5">
            <Button loading={loading} className="w-full" type="primary">
              Đăng nhập
            </Button>
          </div>
          <div className="text-center text-sm text-gray-400">
            Chưa có tài khoản?{" "}
            <span
              onClick={() => setCurrentStep(AUTH_STEP.REGISTER)}
              className="text-green-600 font-medium cursor-pointer"
            >
              Đăng ký ngay
            </span>
          </div>
        </form>
      </div>

      {/* Right: Mascot Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-green-50 p-6">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/mascot/contact.png"
            alt="Mascot"
            width={280}
            height={280}
          />
          <h3 className="text-green-600 font-semibold text-lg mt-4">
            Liên hệ với Hathyo
          </h3>
          <p className="text-sm text-gray-900">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(Login);
