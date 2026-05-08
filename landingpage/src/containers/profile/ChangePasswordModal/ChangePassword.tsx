"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import Eye from "@/components/Icons/Eye";
import EyeSlash from "@/components/Icons/EysSlash";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";

const schema = yup
  .object({
    currentPassword: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
    newPassword: yup.string().required("Vui lòng nhập mật khẩu mới"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), ""], "Mật khẩu không khớp")
      .required("Vui lòng xác nhận mật khẩu"),
  })
  .required();

type Inputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function ChangePassWord() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log("data", data);
    } catch (e) {
      console.log("Error", e);
    } finally {
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 hathyo-popup"
    >
      <div className="my-6 py-6 border border-dashed border-white border-y-gray-300 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="text-base text-Grayiron/500 font-normal">
            Mật khẩu hiện tại
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <input
                type={currentPasswordVisible ? "text" : "password"}
                placeholder="Mật khẩu hiện tại"
                className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
                {...register("currentPassword")}
              />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setCurrentPasswordVisible(!currentPasswordVisible);
                }}
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 focus:outline-none cursor-pointer"
              >
                {currentPasswordVisible ? (
                  <EyeSlash strokeColor="#51525c" />
                ) : (
                  <Eye strokeColor="#51525c" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <span className="body-xs-medium text-Warning/500">
                {errors.currentPassword?.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-base text-Grayiron/500 font-normal">
            Mật khẩu mới
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <input
                type={newPasswordVisible ? "text" : "password"}
                placeholder="Mật khẩu mới"
                className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setNewPasswordVisible(!newPasswordVisible);
                }}
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 focus:outline-none cursor-pointer"
              >
                {newPasswordVisible ? (
                  <EyeSlash strokeColor="#51525c" />
                ) : (
                  <Eye strokeColor="#51525c" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <span className="body-xs-medium text-Warning/500">
                {errors.newPassword?.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-base text-Grayiron/500 font-normal">
            Xác nhận Mật khẩu mới
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Xác Nhận Mật khẩu mới"
                className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setConfirmPasswordVisible(!confirmPasswordVisible);
                }}
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 focus:outline-none cursor-pointer"
              >
                {confirmPasswordVisible ? (
                  <EyeSlash strokeColor="#51525c" />
                ) : (
                  <Eye strokeColor="#51525c" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="body-xs-medium text-Warning/500">
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <Button htmlType="submit" className="m-auto w-full" type="primary">
        Xác nhận
      </Button>
    </form>
  );
}

export default ChangePassWord;
