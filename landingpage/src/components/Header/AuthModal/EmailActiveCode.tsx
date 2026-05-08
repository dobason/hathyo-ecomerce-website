"use client";
import Button from "@/components/Button";
import { AUTH_STEP } from "@/constants/auth";
// import { AUTH_STEP } from "@/constants/auth";
import { activate, resentActivation } from "@/services/client/auth";
import { memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormInput = {
  key?: string;
};

function EmailActiveCode({
  currentData,
  setCurrentData,
  setCurrentStep,
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
    const { key } = data;

    setLoading(true);
    try {
      const response = await activate({
        body: {
          key,
          phone: currentData?.phone,
          email: currentData?.phone,
        },
      });

      if (response) {
        if (response?.code) {
          setError("key", {
            message:
              response.message || "Có lỗi xảy ra trong quá trình xác nhận",
          });
        } else {
          setCurrentStep(AUTH_STEP.CREATE_PASSWORD);
          setCurrentData({ ...currentData, key });
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resendActivation = async () => {
    try {
      const { phone } = currentData;
      const response = await resentActivation({ body: { phone } });
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
        {/* <div className="text-base text-Grayiron/500 font-normal mb-1">Ma</div> */}
        <div className="mb-5">
          <input
            {...register("key", {
              required: "Vui lòng nhập mã xác nhận",
            })}
            placeholder="Nhập mã xác nhận"
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
