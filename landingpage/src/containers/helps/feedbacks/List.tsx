"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";

interface FormData {
  email: string;
  verificationCode: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  verificationCode: yup.string().required("Vui lòng nhập mã xác thực"),
});

const API_URL =
  "https://script.google.com/macros/s/AKfycbyetL0f1MIif2VbKw05PnT4c0d-ASsFEAoJOGS3sp467W-0ndoDkTszau_AXHqGtcrt/exec";

export default function QueryForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [otpValue, setOtpValue] = useState("");

  const emailValue = watch("email");

  const handleGetCode = async () => {
    if (!emailValue) return toast.error("Vui lòng nhập email");

    setCodeLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `action=getVerificationCode&email=${encodeURIComponent(
          emailValue
        )}`,
      });
      const result = await response.json();
      if (result.status === "success") {
        toast.success("HATHYO đã gửi mã xác thực tới email của bạn");
        setCountdown(30);
      } else {
        toast.error(result.message || "Có lỗi xảy ra");
      }
    } catch (err) {
      toast.error("Lỗi kết nối. Vui lòng thử lại sau.");
    }
    setCodeLoading(false);
  };

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (otpValue.length === 4) {
      trigger("verificationCode");
      handleSubmit(onSubmit)();
    }
  }, [otpValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `action=verifyAndQuery&email=${encodeURIComponent(
          data.email
        )}&verificationCode=${encodeURIComponent(data.verificationCode)}`,
      });
      const result = await response.json();
      if (result.status === "success") {
        toast.success("Xác thực thành công");
        setDataRows(result.data || []);
      } else {
        toast.error(result.message || "Có lỗi xảy ra");
        setDataRows([]);
      }
    } catch (error) {
      toast.error("Lỗi kết nối. Vui lòng thử lại sau.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2 text-Moss/700">
        Kiểm tra trạng thái xử lý yêu cầu
      </h2>
      <p className="text-Grayiron/600 mb-4">
        Nhập email bạn đã sử dụng khi liên hệ
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-Grayiron/800"
          >
            Email:
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 pr-28 block w-full rounded-md border-Grayiron/200 bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/400 shadow-sm p-2 text-sm focus:border-Moss/300 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={handleGetCode}
              disabled={codeLoading || countdown > 0}
              className="absolute inset-y-0 right-2 top-1 bottom-1 my-auto text-xs px-3 py-1 bg-Moss/50 text-Moss/500 rounded-md disabled:opacity-60"
            >
              {codeLoading
                ? "Đang gửi..."
                : countdown > 0
                ? `Gửi lại sau ${countdown}s`
                : "Lấy mã"}
            </button>
          </div>
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-Grayiron/800">
            Mã xác thực:
          </label>
          <OtpInput
            value={otpValue}
            onChange={(value: string) => {
              setOtpValue(value);
              setValue("verificationCode", value);
            }}
            numInputs={4}
            inputType="tel"
            containerStyle="flex gap-2 mt-1"
            renderInput={(props) => (
              <input
                {...props}
                className="!w-8 !h-8 md:!w-10 md:!h-10 text-xs md:text-lg text-center rounded-md border border-Grayiron/300 bg-Grayiron/50 text-Grayiron/700 focus:outline-none focus:ring-2 focus:ring-Moss/300 focus:border-Moss/400"
              />
            )}
            shouldAutoFocus
          />
          {errors.verificationCode && (
            <p className="text-sm text-red-600 mt-1">
              {errors.verificationCode.message}
            </p>
          )}
        </div>

        {!otpValue || otpValue.length < 4 ? (
          <button
            type="submit"
            disabled={loading}
            className="bg-Moss/700 text-white px-4 py-2 rounded-md hover:bg-Moss/800"
          >
            {loading ? "Đang xác thực..." : "Xác thực"}
          </button>
        ) : null}
      </form>

      {dataRows.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 text-Moss/700">
            Trạng thái mẫu tin
          </h3>
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[980px] border text-xs md:text-sm table-auto">
              <thead className="bg-Grayiron/100">
                <tr>
                  <th className="p-2 border">Thời gian</th>
                  <th className="p-2 border">Quý danh</th>
                  <th className="p-2 border">Mục đích</th>
                  <th className="p-2 border">Tiêu đề</th>
                  <th className="p-2 border">Nội dung</th>
                  <th className="p-2 border">Phụ trách</th>
                  <th className="p-2 border">Trạng thái</th>
                  <th className="p-2 border">Kết quả</th>
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">
                      {new Date(row[0]).toLocaleString("vi-VN")}
                    </td>
                    <td className="p-2 border">{row[1]}</td>
                    <td className="p-2 border">{row[2]}</td>
                    <td className="p-2 border">{row[5]}</td>
                    <td className="p-2 border">{row[6]}</td>
                    <td className="p-2 border">{row[8] || "CSKH HATHYO"}</td>
                    <td className="p-2 border">
                      <span
                        className={`inline-block px-2 py-1 rounded-md w-fit text-xs font-medium ${
                          row[9] === "Chưa xử lý"
                            ? "bg-red-100 text-red-700"
                            : row[9] === "Đang xử lý"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {row[9] || "Đang xử lý"}
                      </span>
                    </td>
                    <td className="p-2 border">{row[10] || "--"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
