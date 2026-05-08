"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Location from "@/components/Icons/Location";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddressItemResponse } from "@/types/address";
import { useAppDispatch } from "@/store";
import { updateAddressItem, addAddressItem } from "@/store/addressSlice";
import {
  getListProvinceService,
  getListDistrictService,
  getListWardService,
} from "@/services/client/address";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface AddressType {
  id: number;
  name: string;
  code: string;
  area: string;
  aresName: string;
  deletedFlag: boolean;
}

const schema = yup
  .object({
    receiverName: yup.string().required("Vui lòng nhập tên"),
    receiverPhoneNumber: yup.string().required("Vui lòng nhập số điện thoại"),
    customerStreetAddress: yup.string().required("Vui lòng nhập số nhà/ đường"),
    customerWard: yup.string().required("Chọn phường/xã"),
    customerDistrict: yup.string().required("Chọn quận/huyện"),
    customerProvince: yup.string().required("Chọn tỉnh/thành phố"),
    wardId: yup.number(),
    districtId: yup.number(),
    provinceId: yup.number(),
    isDefault: yup.boolean(),
  })
  .required();

type Inputs = {
  receiverName: string;
  receiverPhoneNumber: string;
  customerStreetAddress: string;
  customerWard: string;
  customerDistrict: string;
  customerProvince: string;
  wardId?: number;
  districtId?: number;
  provinceId?: number;
  isDefault: boolean;
};

type Props = {
  actionType: string;
  dataUpdate: AddressItemResponse | undefined;
  setIsFilled?: React.Dispatch<React.SetStateAction<boolean>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActionType: React.Dispatch<React.SetStateAction<string>>;
  setDataUpdate: React.Dispatch<
    React.SetStateAction<AddressItemResponse | undefined>
  >;
};

function UserInformation({
  actionType,
  dataUpdate,
  setActionType,
  setDataUpdate,
  setVisible,
}: Props) {
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

  const [loading, setLoading] = useState(false);
  const [listProvince, setListProvince] = useState<AddressType[]>([]);
  const [listDistrict, setListDistrict] = useState<AddressType[]>([]);
  const [listWard, setListWard] = useState<AddressType[]>([]);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (actionType === "update" && dataUpdate?.id) {
        dispatch(updateAddressItem({ id: dataUpdate?.id, ...data }));
      } else {
        dispatch(addAddressItem(data));
      }
    } catch (e) {
      console.log("Error", e);
    } finally {
      setDataUpdate(undefined);
      setActionType("create");
      setVisible(false);
    }
  };

  useEffect(() => {
    onGetListProvince();
  }, []);

  useEffect(() => {
    onInitvalues();
  }, [JSON.stringify(dataUpdate)]);

  const onInitvalues = () => {
    if (!!dataUpdate) {
      const {
        receiverName,
        receiverPhoneNumber,
        customerStreetAddress,
        customerWard,
        customerDistrict,
        customerProvince,
        wardId,
        districtId,
        provinceId,
        isDefault,
      } = dataUpdate;
      setValue("receiverName", receiverName);
      setValue("receiverPhoneNumber", receiverPhoneNumber);
      setValue("customerStreetAddress", customerStreetAddress);
      setValue("customerWard", customerWard);
      setValue("customerDistrict", customerDistrict);
      setValue("customerProvince", customerProvince);
      setValue("wardId", wardId);
      setValue("districtId", districtId);
      setValue("provinceId", provinceId);
      setValue("isDefault", isDefault);
      if (!!provinceId) {
        onGetListDistrict(provinceId);
        if (!!districtId) {
          onGetListWard(provinceId, districtId);
        }
      }
    }
  };

  const onGetListProvince = async () => {
    try {
      setLoading(true);
      const res = await getListProvinceService();
      setListProvince(res);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
    }
  };

  const onGetListDistrict = async (provinceId: number) => {
    try {
      setLoading(true);
      const res = await getListDistrictService({ params: { provinceId } });
      setListDistrict(res);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
    }
  };

  const onGetListWard = async (provinceId?: number, districtId?: number) => {
    try {
      setLoading(true);
      const res = await getListWardService({
        params: { provinceId, districtId },
      });
      setListWard(res);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeProvince = (provinceId: number) => {
    const findProvinceName =
      listProvince.find((p) => p.id === provinceId)?.name ?? "";
    setValue("provinceId", provinceId);
    setValue("customerProvince", findProvinceName);
    resetField("districtId");
    resetField("wardId");
    resetField("customerDistrict");
    resetField("customerWard");
    onGetListDistrict(provinceId);
  };

  const handleChangeDistrict = (districtId: number) => {
    const findDistrictName =
      listDistrict.find((p) => p.id === districtId)?.name ?? "";
    setValue("districtId", districtId);
    setValue("customerDistrict", findDistrictName);
    resetField("wardId");
    resetField("customerWard");
    onGetListWard(watch("provinceId"), districtId);
  };

  const handleChangeWard = (wardId: number) => {
    const findWardName = listWard.find((p) => p.id === wardId)?.name ?? "";
    setValue("wardId", wardId);
    setValue("customerWard", findWardName);
  };

  return (
    <form className="py-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="p-3 border border-white border-y-gray-200">
        <div className="py-4 flex flex-col gap-2">
          <div className="text-base text-gray-500 font-medium">
            Tên người nhận
          </div>
          <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
            <input
              className="pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
              placeholder="Họ và tên"
              {...register("receiverName")}
            />
          </div>
          {errors.receiverName && (
            <span className="body-xs-medium text-Warning/500">
              {errors.receiverName?.message}
            </span>
          )}
        </div>
        <div className="py-4 flex flex-col gap-2">
          <div className="text-base text-gray-500 font-medium">
            Số điện thoại
          </div>
          <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
            <input
              className="pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
              placeholder="Số điện thoại"
              {...register("receiverPhoneNumber")}
            />
          </div>
          {errors.receiverPhoneNumber && (
            <span className="body-xs-medium text-Warning/500 ">
              {errors.receiverPhoneNumber?.message}
            </span>
          )}
        </div>
        <div className="py-4 flex flex-col gap-2">
          <div className="text-base text-gray-500 font-medium">
            Địa chỉ nhận hàng
          </div>
          <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
            <input
              className="w-full pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
              placeholder="Địa chỉ nhận hàng"
              {...register("customerStreetAddress")}
            />
            <Location strokeColor="#A0A0AB" />
          </div>
          {errors.customerStreetAddress && (
            <span className="body-xs-medium text-Warning/500">
              {errors.customerStreetAddress?.message}
            </span>
          )}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-2">
              <Select
                value={watch("provinceId")}
                className=""
                placeholder="Tỉnh thành"
                options={listProvince?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                onChange={(value) => handleChangeProvince(value)}
              />
              {errors.customerProvince && (
                <span className="body-xs-medium text-Warning/500">
                  {errors.customerProvince?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {/* <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
                <input
                  className="w-full pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
                  placeholder="Quận huyện"
                  {...register("customerDistrict")}
                />
              </div> */}
              <Select
                value={watch("districtId")}
                className=""
                placeholder="Quận huyện"
                options={listDistrict?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                onChange={(value) => handleChangeDistrict(value)}
              />
              {errors.customerDistrict && (
                <span className="body-xs-medium text-Warning/500">
                  {errors.customerDistrict?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {/* <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
                <input
                  className="w-full pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
                  placeholder="Phường xã"
                  {...register("customerWard")}
                />
              </div> */}
              <Select
                value={watch("wardId")}
                className=""
                placeholder="Phường xã"
                options={listWard?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                onChange={(value) => handleChangeWard(value)}
              />
              {errors.customerWard && (
                <span className="body-xs-medium text-Warning/500">
                  {errors.customerWard?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center w-full">
          <input
            id="isDefault-checkbox"
            type="checkbox"
            className="w-4 h-4 text-Moss/600 accent-Moss/700 bg-gray-100 border-text-black-tertiary rounded-md focus:ring-Moss/500 focus:ring-2"
            {...register("isDefault")}
          />
          <label
            htmlFor="isDefault-checkbox"
            className="text-gray-500 text-md font-normal"
          >
            Địa chỉ mặc định
          </label>
        </div>
      </div>
      <div className="mt-4 flex flex-row justify-end gap-2">
        <Button type="primary-outlined" onClick={() => setVisible(false)}>
          Trở lại
        </Button>
        <Button htmlType="submit" type="primary">
          Xác nhận
        </Button>
      </div>
    </form>
  );
}

export default UserInformation;
