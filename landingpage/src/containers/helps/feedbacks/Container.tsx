"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { FaPhone, FaMailchimp, FaHome, FaMailBulk } from "react-icons/fa";

interface FormData {
  name: string;
  userType: string;
  otherType?: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const schema = yup.object({
  name: yup.string().required("Quý danh không được để trống"),
  userType: yup.string().required("Vui lòng chọn mục đích"),
  otherType: yup.string().when("userType", {
    is: "Other",
    then: (schema) => schema.required("Vui lòng nhập chi tiết mục đích"),
    otherwise: (schema) => schema.notRequired(),
  }),
  phone: yup.string().required("Số điện thoại không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  subject: yup.string().required("Tiêu đề không được để trống"),
  message: yup.string().required("Nội dung không được để trống"),
});

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    formData.append("action", "submitContactForm");

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyetL0f1MIif2VbKw05PnT4c0d-ASsFEAoJOGS3sp467W-0ndoDkTszau_AXHqGtcrt/exec",
        {
          method: "POST",
          body: formData,
          headers: {
            Origin: window.location.origin,
          },
        }
      );

      const result = await res.json();

      if (result.status === "success") {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi gửi mẫu tin");
      }
    } catch (error) {
      toast.error("Lỗi kết nối. Vui lòng thử lại sau.");
    }
    setLoading(false);
  };

  const userType = watch("userType");

  return (
    <div className="container mx-auto my-8 p-4 md:p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        <span className="text-[#ff6300]">Hãy liên hệ với </span>
        <span className="text-[#0a703f]">HATHYO</span>
      </h2>

      <div className="mb-6 grid md:grid-cols-3 gap-4">
        {[
          {
            icon: <FaHome size={24} color={"#0A6D3D"} />,
            title: "Địa chỉ",
            content: "82 Phan Đăng Lưu, Phú Nhuận, TP.HCM",
            href: "https://maps.app.goo.gl/9fsyrQdAEaw3Uot97",
          },
          {
            icon: <FaPhone size={24} color={"#0A6D3D"} />,
            title: "Điện thoại",
            content: "+84-827000248 (Zalo/WhatsApp)",
            href: "tel:+84827000248",
          },
          {
            icon: <FaMailBulk size={24} color={"#0A6D3D"} />,
            title: "Email",
            content: "email@hathyo.com",
            href: "mailto:email@hathyo.com",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="p-4 bg-Moss/10 rounded-lg shadow flex items-start gap-3"
          >
            {item.icon}
            <div>
              <h3 className="font-semibold text-Moss/600">{item.title}</h3>
              <a
                href={item.href}
                target="_blank"
                className="text-Moss/500 hover:underline"
              >
                {item.content}
              </a>
            </div>
          </div>
        ))}
      </div>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {[
          { placeholder: "Quý danh", name: "name" },
          { placeholder: "Số điện thoại", name: "phone" },
          { placeholder: "Email", name: "email" },
          { placeholder: "Tiêu đề", name: "subject" },
        ].map(({ placeholder, name }) => (
          <div key={name} className="flex flex-col gap-1">
            <input
              className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
              placeholder={placeholder}
              {...register(name as keyof FormData)}
            />
            {errors[name as keyof FormData] && (
              <span className="text-red-500 text-sm">
                {errors[name as keyof FormData]?.message}
              </span>
            )}
          </div>
        ))}

        <div className="md:col-span-2 flex flex-col gap-1">
          <select
            className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
            {...register("userType")}
          >
            <option value="" disabled selected>
              Chọn mục đích
            </option>
            <option value="Bán hàng">Bán hàng</option>
            <option value="Mua hàng">Mua hàng</option>
            <option value="Vận chuyển">Vận chuyển</option>
            <option value="Thanh toán">Thanh toán</option>
            <option value="Đổi trả">Đổi trả hàng</option>
            <option value="Khiếu kiện">Khiếu kiện</option>
            <option value="Thuế">Thuế</option>
            <option value="Phí">Phí</option>
            <option value="Phản ánh TCXH">Phản ánh của TCXH</option>
            <option value="Hợp tác kinh doanh">Hợp tác kinh doanh</option>
            <option value="Cộng tác nội dung">Cộng tác nội dung</option>
            <option value="Sản phẩm, dịch vụ">Sản phẩm, dịch vụ</option>
            <option value="Tư vấn sức khỏe">Tư vấn sức khỏe</option>
            <option value="Cơ hội việc làm">Cơ hội việc làm</option>
            <option value="Góp ý">Góp ý</option>
            <option value="Other">Khác</option>
          </select>
          {errors.userType && (
            <span className="text-red-500 text-sm">
              {errors.userType.message}
            </span>
          )}
        </div>

        {userType === "Other" && (
          <div className="md:col-span-2 flex flex-col gap-1">
            <input
              className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
              placeholder="Chi tiết mục đích khác"
              {...register("otherType")}
            />
          </div>
        )}

        <div className="md:col-span-2 flex flex-col gap-1">
          <textarea
            className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
            rows={5}
            placeholder="Nội dung"
            {...register("message")}
          />
          {errors.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}
        </div>

        <button
          className="md:col-span-2 bg-Moss/500 hover:bg-Moss/700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Đang gửi..." : "Gửi HATHYO"}
        </button>
      </form>
    </div>
  );
}
