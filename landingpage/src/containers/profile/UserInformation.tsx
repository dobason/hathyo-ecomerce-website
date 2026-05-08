"use client";

import React, { Fragment, useEffect, useState } from "react";
import { User } from "@/types/user";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { toast } from "react-toastify";
import AvatarUpload from "@/components/UploadAvatar";
import ChangePasswordModal from "./ChangePasswordModal";
import ChangePhoneModal from "./ChangePhoneModal";
import ChangeEmailModal from "./ChangeEmailModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateUserProfile } from "@/store/userSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import Modal from "@/components/Modal";
import ChangePassWord from "./ChangePasswordModal/ChangePassword";
import Close from "@/components/Icons/Close";
import Edit from "@/components/Icons/Edit";
import { useAddressSelector } from "@/hooks/useAddressSelector";
import { fetchUserInfo } from "@/store/userSlice";

export default function UserInformation() {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  const [openPhoneModal, setOpenPhoneModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    resetField,
  } = useForm<User>({
    defaultValues: { ...userInfo },
  });

  const {
    listProvince,
    listDistrict,
    listWard,
    provinceId,
    setProvinceId,
    setDistrictId,
    setWardId,
    error,
    isLoadingProvinces,
    isLoadingDistricts,
    isLoadingWards,
  } = useAddressSelector(watch("provinceId"));

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log("Form state:", {
      provinceId: watch("provinceId"),
      districtId: watch("districtId"),
      wardId: watch("wardId"),
    });
    console.log("Dropdown data lengths:", {
      listProvince: listProvince.length,
      listDistrict: listDistrict.length,
      listWard: listWard.length,
    });
    console.log("Select options:", {
      provinces: listProvince.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      districts: listDistrict.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      wards: listWard.map((item) => ({ value: item.id, label: item.name })),
    });
    console.log("Hook state:", {
      provinceId,
      isLoadingDistricts,
      isLoadingWards,
      error,
    });
  }, [
    watch,
    listProvince,
    listDistrict,
    listWard,
    provinceId,
    isLoadingDistricts,
    isLoadingWards,
    error,
  ]);

  useEffect(() => {
    if (userInfo?.provinceId) {
      setProvinceId(userInfo.provinceId);
    }
    if (userInfo?.districtId) {
      setDistrictId(userInfo.districtId);
    }
    if (userInfo?.wardId) {
      setWardId(userInfo.wardId);
    }
  }, [userInfo, setProvinceId, setDistrictId, setWardId]);

  const handleChangeProvince = (value: number | undefined) => {
    const selected = listProvince.find((p) => p.id === value);
    if (selected) {
      setValue("provinceId", value);
      setValue("province", selected.name ?? "");
      setProvinceId(value ?? null);
      resetField("district");
      resetField("ward");
      resetField("districtId");
      resetField("wardId");
    }
  };

  const handleChangeDistrict = (value: number | undefined) => {
    console.log("Changing district to:", value);
    const selected = listDistrict.find((p) => p.id === value);
    if (selected) {
      setValue("districtId", value);
      setValue("district", selected.name ?? "");
      setDistrictId(value ?? null);
      resetField("ward");
      resetField("wardId");
    } else {
      console.warn("District not found for value:", value);
    }
  };

  const handleChangeWard = (value: number | undefined) => {
    console.log("Changing ward to:", value);
    const selected = listWard.find((p) => p.id === value);
    if (selected) {
      setValue("wardId", value);
      setValue("ward", selected.name ?? "");
      setWardId(value ?? null);
    } else {
      console.warn("Ward not found for value:", value);
    }
  };

  const hiddenPhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber.length < 5) return phoneNumber;
    const hiddenSection = phoneNumber.slice(0, -4).replace(/./g, "*");
    const visibleSection = phoneNumber.slice(-4);
    return hiddenSection + visibleSection;
  };

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      data.phone = undefined as any;
      await dispatch(updateUserProfile(data)).unwrap();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Đã có lỗi xảy ra khi lưu thay đổi");
    }
  };

  return (
    <Fragment>
      <Modal
        onClose={() => setVisible(!visible)}
        visible={visible}
        title="Đổi mật khẩu"
        footer={null}
      >
        <div
          onClick={() => setVisible(!visible)}
          className="absolute top-1 right-1 cursor-pointer"
        >
          <Close />
        </div>
        <ChangePassWord />
      </Modal>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-h-[85vh] rounded-lg bg-white shadow-md pb-4">
          <div className="h-full flex flex-col gap-4 xl:gap-8 justify-start xl:px-20 px-6 py-3">
            <div className="flex flex-col gap-1">
              <AvatarUpload setValue={setValue} watch={watch} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-md text-gray-500 font-normal">
                  Số điện thoại
                </label>

                <div className="flex items-center gap-2">
                  <input
                    value={getValues("phone") || ""}
                    readOnly
                    className="flex-1 text-md bg-gray-100 text-gray-900 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2"
                  />
                  <button
                    type="button"
                    className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    onClick={() => setOpenPhoneModal(true)}
                  >
                    Thay đổi
                  </button>
                </div>

                <ChangePhoneModal
                  isOpen={openPhoneModal}
                  onClose={() => setOpenPhoneModal(false)}
                  onSuccess={async (newPhone) => {
                    setValue("phone", newPhone);
                    await dispatch(fetchUserInfo());
                    setOpenPhoneModal(false);
                    toast.success("Số điện thoại đã được cập nhật thành công!");
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-md text-gray-500 font-normal">
                  Email
                </label>

                <div className="flex items-center gap-2">
                  <input
                    value={getValues("email") || ""}
                    readOnly
                    className="flex-1 text-md bg-gray-100 text-gray-900 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2"
                  />
                  <button
                    type="button"
                    className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    onClick={() => setOpenEmailModal(true)}
                  >
                    Thay đổi
                  </button>
                </div>

                <ChangeEmailModal
                  isOpen={openEmailModal}
                  onClose={() => setOpenEmailModal(false)}
                  onSuccess={async (newEmail) => {
                    await dispatch(fetchUserInfo());
                    setValue("email", newEmail);
                    setOpenEmailModal(false);
                    toast.success("Email đã được cập nhật thành công!");
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="mb-3 flex justify-start text-md text-gray-500 font-normal">
                Họ và tên
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <input
                    {...register("firstname", {
                      required: "Vui lòng nhập tên",
                      validate: (value) => {
                        if (/^\d+$/.test(value)) {
                          return "Họ và tên không được chỉ chứa số";
                        }
                        return true;
                      },
                    })}
                    placeholder="Họ và tên đệm"
                    className={`text-md bg-white text-gray-900 placeholder-gray-400 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2 ${
                      errors.firstname ? "border-red-500" : ""
                    }`}
                  />
                  <p className="text-sm min-h-[20px]">
                    <span
                      className={
                        errors.firstname ? "text-red-500" : "invisible"
                      }
                    >
                      {errors.firstname?.message || "Lỗi giữ chỗ"}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    {...register("lastname", {
                      required: "Vui lòng nhập tên",
                      validate: (value) => {
                        if (/^\d+$/.test(value)) {
                          return "Họ và tên không được chỉ chứa số";
                        }
                        return true;
                      },
                    })}
                    placeholder="Tên"
                    className={`text-md bg-white text-gray-900 placeholder-gray-400 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2 ${
                      errors.lastname ? "border-red-500" : ""
                    }`}
                  />
                  <p className="text-sm min-h-[20px] invisible">Lỗi giữ chỗ</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 grid-cols-2 grid">
              <div className="flex flex-col gap-1">
                <div className="mb-3 flex justify-start text-md text-gray-500 font-normal">
                  Ngày sinh
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="date"
                    {...register("birthday", {
                      required: "Vui lòng nhập ngày sinh",
                    })}
                    className="text-md bg-Grayiron/50 text-gray-500 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50 px-3 py-2"
                  />
                  {errors.birthday && (
                    <p className="text-red-500 body-xs-medium mt-2">
                      {errors.birthday.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="mb-3 flex justify-start text-md text-gray-500 font-normal">
                  Giới tính
                </div>
                <div className="flex flex-col gap-1">
                  <select
                    {...register("gender", {
                      required: "Vui lòng chọn giới tính",
                    })}
                    className="text-md bg-Grayiron/50 text-gray-500 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50 px-3 py-2"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 body-xs-medium mt-2">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="mb-3 flex justify-start text-md text-gray-500 font-normal">
                Địa chỉ cụ thể
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <input
                    {...register("address", {
                      required: "Vui lòng nhập địa chỉ",
                    })}
                    placeholder="Địa chỉ cụ thể: số nhà, tên tòa nhà, tầng"
                    className="text-md bg-Grayiron/50 text-Grayiron/600 placeholder-Grayiron/200 block w-full rounded-md border-Grayiron/200 shadow-sm focus:border-Moss/200 focus:ring focus:ring-Moss/200 focus:ring-opacity-50 px-3 py-2"
                  />
                  {errors.address && (
                    <p className="text-red-500 body-xs-medium mt-2">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4 grid grid-cols-3">
                  <Select
                    value={watch("provinceId")}
                    placeholder={
                      isLoadingProvinces ? "Đang tải..." : "Tỉnh/Thành phố"
                    }
                    options={listProvince.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    onChange={handleChangeProvince}
                  />
                  <div>
                    <Select
                      value={watch("districtId")}
                      placeholder={
                        isLoadingDistricts ? "Đang tải..." : "Quận/Huyện"
                      }
                      options={listDistrict.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      onChange={(value) => handleChangeDistrict(value)}
                      disabled={isLoadingDistricts || !listDistrict.length}
                    />
                  </div>
                  <div>
                    <Select
                      value={watch("wardId")}
                      placeholder={isLoadingWards ? "Đang tải..." : "Phường/Xã"}
                      options={listWard.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      onChange={handleChangeWard}
                      disabled={isLoadingWards || !listWard.length}
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
            </div>
            <div className="mb-5">
              <div className="flex flex-row justify-start gap-4 cursor-pointer">
                <div
                  className="text-md text-Warning/400 font-normal flex flex-row"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  Đổi mật khẩu
                  <div className="ml-1">
                    <Edit />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Button htmlType="submit" type="primary">
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
