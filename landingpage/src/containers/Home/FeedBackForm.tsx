"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "@/components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🎯 Định nghĩa schema với Yup
const schema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  message: Yup.string().required("Vui lòng nhập nội dung góp ý"),
});

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyBTxEC7zsMoinRqeSR4FVDJUTTV4p_2TZBJaLxNj9xoTpwMyqsvce-l9ne3a7ml9Kd/exec"; // <-- Thay YOUR_SCRIPT_ID thật

// 🧾 FORM COMPONENT
const Form = ({ formRef }: { formRef: React.RefObject<HTMLFormElement> }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Gửi ý kiến thành công! Cảm ơn bạn.");
        reset();
      } else {
        toast.error("Đã xảy ra lỗi khi gửi biểu mẫu.");
      }
    } catch (err) {
      toast.error("Không thể kết nối đến hệ thống. Vui lòng thử lại sau.");
    }
  };

  return (
    <form
    // onSubmit={handleSubmit(onSubmit)}
    // className="xl:mt-[-130px] md:basis-1/2 bg-white z-[3] flex flex-col w-full px-6 py-6 gap-8 shadow-Shadow/md rounded-[20px]"
    >
      {/* <h5 className="heading-5 text-Grayiron/700">Đề xuất và góp ý</h5>
      <div className="flex flex-col gap-4">
        <input
          {...register("name")}
          placeholder="Tên của bạn"
          className="body-medium bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}

        <input
          {...register("email")}
          placeholder="Email của bạn"
          className="body-medium bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        <textarea
          {...register("message")}
          placeholder="Nội dung"
          className="min-h-[144px] body-medium bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
        />
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message.message}</span>
        )}
      </div>

      <div className="mx-auto">
        <Button
          rounded
          type="warning"
          size="small"
          className="min-w-[200px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang gửi..." : "Gửi ý kiến"}
        </Button>
      </div>
      <div className="body-sm-medium text-Grayiron/500 text-center">
        Cảm ơn bạn đã đóng góp ý kiến quý báu, giúp chúng tôi không ngừng cải
        thiện dịch vụ.
        <br />
        Chúc bạn mỗi ngày đều tràn ngập niềm vui và luôn khỏe mạnh!
      </div> */}
    </form>
  );
};

// 📝 CONTENT COMPONENT
// const Content = ({
//   contentRef,
// }: {
//   contentRef: React.RefObject<HTMLDivElement>;
// }) => (
//   <div
//     ref={contentRef}
//     className="hidden md:flex basis-1/2 flex-col gap-4 z-[3]"
//   >
//     <div className="body-sm-semibold rounded-lg bg-Warning/400 text-white py-2 px-4 w-fit">
//       Hathyo
//     </div>
//     <div className="flex flex-col gap-4">
//       <h5 className="heading-5 text-white">
//         Góp Ý và Phản Hồi của Bạn Là Điều Quan Trọng!
//       </h5>
//       <div className="flex flex-col gap-4">
//         <p className="body-medium text-white font-normal">
//           Hathyo không chỉ mong bạn hài lòng với sản phẩm mà còn muốn bạn có
//           trải nghiệm mua sắm thật trọn vẹn. Những góp ý của bạn chính là động
//           lực để chúng tôi ngày càng hoàn thiện hơn. Vì vậy, đừng ngại chia sẻ
//           nếu bạn có bất kỳ ý kiến hay phản hồi nào nhé!
//         </p>
//         <p className="body-medium text-white font-normal">
//           Nếu cần thêm thông tin hoặc có thắc mắc, hãy liên hệ ngay với chúng
//           tôi. Đội ngũ Hathyo luôn sẵn sàng hỗ trợ bạn!
//         </p>
//       </div>
//     </div>
//   </div>
// );

// 📦 FEEDBACK FORM PAGE
export default function FeedBackForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(contentRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative flex flex-row justify-around items-center xl:px-16 px-6 xl:py-16 py-8 xl:mt-14"
    >
      {/* <div className="absolute z-0 w-full h-full min-h-[500px] bg-[url(/scientist.jpg)] bg-center bg-cover xl:rounded-[30px]" /> */}
      {/* <div className="absolute w-full h-full min-h-[500px] backdrop-blur-sm bg-Moss/400/85 z-1 blur-sm opacity-65 xl:rounded-[30px]" /> */}
      <div className="flex justify-between md:gap-4 xl:gap-16">
        <Form formRef={formRef} />
        {/* <Content contentRef={contentRef} /> */}
      </div>
    </div>
  );
}
