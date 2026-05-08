"use client";
import Button from "@/components/Button";
// import { AUTH_STEP } from "@/constants/auth";
import { resentActivation, sentActivation } from "@/services/client/auth";
import { slice } from "lodash";
import { memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInput = {
  phone?: string;
  acceptTerm?: boolean;
};

function EmailActiveCode({
  currentData,
}: // setCurrentStep
any) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { phone, acceptTerm } = data;
    if (!acceptTerm) {
      setError("acceptTerm", {
        message: "Vui lòng chấp nhận điều khoản và chính sách bảo mật",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await sentActivation({ body: { phone } });
      if (response) {
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
      const response = await resentActivation({ body: { phone } });
      if (response) {
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
        <div className="text-base text-Grayiron/500 font-normal mb-1">
          Nhập mã số mà Hathyo đã gửi đến số điện thoại ****
          {slice(currentData?.phone, 4, 9)}
        </div>
        <div className="mb-5">
          <input
            {...register("phone", {
              required: "Vui lòng nhập mã xác minh",
            })}
            placeholder="Mã xác minh"
            className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
          />
          {errors.phone && (
            <p className="text-red-500 mt-2">{errors.phone.message}</p>
          )}
        </div>

        <div className="text-md text-Grayiron/400 text-center cursor-pointer mb-5">
          Không nhận được mã xác minh ?{" "}
          <span onClick={resendActivation} className="text-Moss/500">
            Gửi lại
          </span>
        </div>
        <div className="">
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

export default memo(EmailActiveCode);
