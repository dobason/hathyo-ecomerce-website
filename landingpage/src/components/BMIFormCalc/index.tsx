"use client";

import dayjs from "dayjs";
import React, { useCallback } from "react";
import Image from "next/image"; // Import the Image component from Next.js
import BMIIcon from "../Icons/BMIIcon";
import Button from "../Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    gender: yup.string().required("Vui lòng chọn giới tính"),
    name: yup.string().required("Vui lòng nhập tên"),
    age: yup.string().required("Vui lòng nhập tuổi"),
    height: yup.string().required("Vui lòng nhập chiều cao"),
    weight: yup.string().required("Vui lòng nhập cân nặng"),
  })
  .required();

type Inputs = {
  gender: string;
  name: string;
  age: string;
  height: string;
  weight: string;
  tool: string;
};

export default function BMIFormCalc() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    resetField,
  } = useForm<Inputs>({
    resolver: yupResolver(schema) as any,
  });

  const router = useRouter();

  const createQueryString = useCallback((values: Inputs) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      params.set(key, value);
    });
    return params.toString();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      console.log("values", values);
      const queryString = createQueryString({
        ...values,
        tool: "bmi_calculator",
      });
      router.push(`/apps/hathyo-tools?${queryString}`);
    } catch (e) {
      console.log("Error", e);
    } finally {
      resetField("gender");
      resetField("age");
      resetField("height");
      resetField("weight");
    }
  };
  const gender = watch("gender");

  return (
    <div className="flex flex-row flex-wrap w-full shadow-Shadow/md rounded-xl">
      <div className="w-full bg-Moss/400 rounded-tl-xl rounded-tr-xl py-4 px-3">
        <div className="flex flex-row gap-4 justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="text-white body-bold">
              Tính chỉ số BMI - Chỉ số khối cơ thể
            </div>
            <div className="text-white body-xs-medium">
              Tham vấn y khoa: Bác sĩ Nguyễn Thương Hạnh
            </div>
            <div className="text-white body-xs-medium">
              Ngày {dayjs().format("DD/MM/YYYY")}
            </div>
          </div>
          <BMIIcon />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col py-6 gap-8 px-4 w-full bg-white rounded-bl-xl rounded-br-xl"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="body-sm-medium text-Grayiron/600">
              Giới tính của bạn
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 flex-row flex-nowrap justify-between w-full">
                <Button
                  className={classNames(
                    { "!bg-Moss/50": gender === "male" },
                    "flex-1 w-full flex justify-center items-center"
                  )}
                  onClick={() => setValue("gender", "male")}
                >
                  <Image
                    className="inline-block"
                    src="/male.svg"
                    alt="Nam"
                    width={24}
                    height={24}
                  />
                  &nbsp; Nam
                </Button>
                <Button
                  className={classNames(
                    { "!bg-Moss/50": watch("gender") === "female" },
                    "flex-1 w-full flex justify-center items-center"
                  )}
                  onClick={() => setValue("gender", "female")}
                >
                  <Image
                    className="inline-block"
                    src="/female.svg"
                    alt="Nữ"
                    width={24}
                    height={24}
                  />
                  &nbsp; Nữ
                </Button>
              </div>
              {errors.gender && (
                <span className="text-sm text-Warning/500 font-normal">
                  {errors.gender?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="body-sm-medium text-Grayiron/600">
              Tên của bạn?{" "}
            </div>
            <div className="flex flex-col gap-1">
              <input
                placeholder="Họ tên"
                className="body-sm-medium text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-sm text-Warning/500 font-normal">
                  {errors.name?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="body-sm-medium text-Grayiron/600">
              Bạn bao nhiêu tuổi?{" "}
              <span className="body-sm-medium text-Grayiron/400">{`(năm)`}</span>
            </div>
            <div className="flex flex-col gap-1">
              <input
                placeholder="Số tuổi"
                className="body-sm-medium text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
                {...register("age")}
              />
              {errors.age && (
                <span className="text-sm text-Warning/500 font-normal">
                  {errors.age?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="body-sm-medium text-Grayiron/600">
              Bạn cao bao nhiêu?{" "}
              <span className="body-sm-medium text-Grayiron/400">{`(cm)`}</span>
            </div>
            <div className="flex flex-col gap-1">
              <input
                placeholder="Chiều cao"
                className="body-sm-medium text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
                {...register("height")}
              />
              {errors.height && (
                <span className="text-sm text-Warning/500 font-normal">
                  {errors.height?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="body-sm-medium text-Grayiron/600">
              Cân nặng của bạn?{" "}
              <span className="body-sm-medium text-Grayiron/400">{`(kg)`}</span>
            </div>
            <div className="flex flex-col gap-1">
              <input
                placeholder="Cân nặng"
                className="body-sm-medium text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
                {...register("weight")}
              />
              {errors.weight && (
                <span className="text-sm text-Warning/500 font-normal">
                  {errors.weight?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <Button htmlType="submit" type="primary" className="flex-1 w-full">
            Tính ngay
          </Button>
        </div>
      </form>
    </div>
  );
}
