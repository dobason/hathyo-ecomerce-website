"use client";

import Button from "@/components/Button";
import { AUTH_STEP } from "@/constants/auth";
import { sendOtpAPI, signupAPI } from "@/services/client/auth";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import EmailActiveCode from "./EmailActiveCode";

type FormInput = {
  firstName: string;
  lastName: string;
  phoneNo: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
  role: [];
  acceptTerm?: boolean;
};

function Register({ setCurrentData, setCurrentStep }: any) {
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [formData, setFormData] = useState<FormInput | null>(null); //Lưu data
  const [phoneNoMasked, setPhoneNoMasked] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { firstName, lastName, phoneNo, password, email, acceptTerm } = data;

    if (!acceptTerm) {
      setError("acceptTerm", {
        message: "Vui lòng chấp nhận điều khoản và chính sách bảo mật",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await sendOtpAPI({
        params: {
          phoneNumber: phoneNo,
        },
      });

      if (res?.code) {
        setError("phoneNo", {
          type: "manual",
          message: res.message || "Không thể gửi mã OTP. Vui lòng thử lại.",
        });
        return;
      }

      setFormData(data); // Lưu lại data để dùng sau khi xác thực OTP
      setPhoneNoMasked(
        data.phoneNo.replace(
          /^(\d{3})(\d+)(\d{2})$/,
          (_, a, b, c) => `${a}${"*".repeat(b.length)}${c}`
        )
      );
      setShowOtpInput(true);
    } catch (error) {
      setError("phoneNo", {
        type: "manual",
        message: "Không thể kết nối đến máy chủ",
      });
    } finally {
      setLoading(false);
    }
  };

  const onConfirmOtp = async () => {
    if (!otpCode) {
      toast.error("Vui lòng nhập mã OTP.");
      return;
    }

    if (!formData) {
      toast.error("Thiếu thông tin đăng ký.");
      return;
    }

    const {
      firstName,
      lastName,
      phoneNo,
      email = "",
      confirmPassword = "",
      password,
      acceptTerm,
    } = formData;

    setLoading(true);
    try {
      const Payload = {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        phoneNo: phoneNo.trim(),
        email: email.trim(),
        confirmPassword: confirmPassword.trim(),
        password,
        otp: otpCode,
        acceptTerm: acceptTerm || false,
        roles: [],
      };

      const res = await signupAPI({ body: Payload });

      if (res?.code) {
        toast.error(res.message || "Đăng ký thất bại");
        return;
      }
      toast.success("Đăng ký thành công!");
    } catch (error) {
      toast.error("Không thể kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-white rounded-lg overflow-hidden">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 xl:p-8 md:p-4 p-2">
        <h2 className="text-2xl font-bold mb-2">Xin chào,</h2>
        <p className="mb-6 text-gray-500">Đăng ký tài khoản Hathyo</p>

        <form onSubmit={handleSubmit(onSubmit)} className="py-2">
          {!showOtpInput ? (
            <>
              {/* --- Họ tên --- */}
              <div className="flex gap-4 mb-5">
                <div className="flex-1">
                  <label className="block mb-1 text-gray-600">
                    Họ, tên đệm
                  </label>
                  <input
                    {...register("firstName", {
                      required: "Vui lòng nhập họ, tên đệm",
                    })}
                    placeholder="Họ, tên đệm"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block mb-1 text-gray-600">Tên</label>
                  <input
                    {...register("lastName", {
                      required: "Vui lòng nhập tên",
                    })}
                    placeholder="Tên"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* --- Số điện thoại --- */}
              <div className="mb-5">
                <label className="block mb-1 text-gray-600">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  {...register("phoneNo", {
                    required: "Vui lòng nhập số điện thoại",
                    pattern: {
                      value: /^[0-9]{9,11}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  })}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.phoneNo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNo.message}
                  </p>
                )}
              </div>

              {/* --- Email --- */}
              <div className="mb-5">
                <label className="block mb-1 text-gray-600">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email không hợp lệ",
                    },
                  })}
                  placeholder="Nhập email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* --- Mật khẩu --- */}
              <div className="mb-5">
                <label className="block mb-1 text-gray-600">Mật khẩu</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Vui lòng nhập mật khẩu",
                    })}
                    placeholder="Mật khẩu"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* --- Nhập lại mật khẩu --- */}
              <div className="mb-5">
                <label className="block mb-1 text-gray-600">
                  Nhập lại mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Vui lòng nhập lại mật khẩu",
                      validate: (value) =>
                        value === watch("password") ||
                        "Mật khẩu nhập lại không khớp",
                    })}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* --- Điều khoản --- */}
              <div className="mb-5">
                <label className="inline-flex items-center gap-2">
                  <input
                    {...register("acceptTerm")}
                    type="checkbox"
                    className="rounded-sm h-4 w-4 text-green-500 accent-green-500 hover:accent-green-400"
                  />
                  <span className="text-gray-500 text-sm">
                    Tôi đã đọc và đồng ý với{" "}
                    <Link
                      href="/terms/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      Chính sách bảo mật
                    </Link>{" "}
                    của Hathyo
                  </span>
                </label>
                {errors.acceptTerm && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.acceptTerm.message}
                  </p>
                )}
              </div>
              <Button
                loading={loading}
                onClick={handleSubmit(onSubmit)}
                className="w-full mb-2"
                type="primary"
              >
                Gửi mã xác thực
              </Button>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">XÁC THỰC OTP</h3>
              <p className="text-sm text-gray-600 mb-2">
                Vui lòng nhập mã OTP chúng tôi đã gửi đến số điện thoại <br />
                <strong>{phoneNoMasked}</strong>. Mã có hiệu lực trong{" "}
                <strong>120s</strong>.
              </p>

              <div className="flex justify-center gap-2 my-4">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otpCode[index] || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!/^\d*$/.test(val)) return;
                      const updated = otpCode.split("");
                      updated[index] = val;
                      setOtpCode(updated.join(""));
                      const next = document.getElementById(`otp-${index + 1}`);
                      if (val && next) (next as HTMLInputElement).focus();
                    }}
                    id={`otp-${index}`}
                    className="w-10 h-12 text-center border border-gray-300 rounded-md text-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ))}
              </div>

              <Button
                loading={loading}
                onClick={onConfirmOtp}
                className="w-full mb-2"
                type="primary"
              >
                Tiếp tục
              </Button>
              <p className="text-sm text-gray-500">
                Không nhận được mã?{" "}
                <span className="text-blue-600 cursor-pointer">Gửi lại</span>
              </p>
            </div>
          )}
        </form>
      </div>

      {/* Right: Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-green-50 p-6">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/mascot/register.png"
            alt="Mascot"
            width={280}
            height={280}
          />
          <h3 className="text-green-600 font-semibold text-lg mt-4">
            Chào mừng bạn đến với Hathyo
          </h3>
          <p className="text-sm text-gray-900">
            Cùng xây dựng cộng đồng khỏe mạnh
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(Register);
