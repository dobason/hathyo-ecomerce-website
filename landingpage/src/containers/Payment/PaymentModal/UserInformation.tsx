"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Location from "@/components/Icons/Location";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddressItemResponse } from "@/types/address";
import { useAppSelector, useAppDispatch } from "@/store";
import { updateAddressItem, addAddressItem, convertCoordsToAddress } from "@/store/addressSlice";
import {
  getListProvinceService,
  getListDistrictService,
  getListWardService,
} from "@/services/client/address";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MapComponent from "@/components/MapComponent";

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
    lat: yup.number(),
    lng: yup.number(),
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
  lat?: number;
  lng?: number;
};

type Props = {
  actionType: string;
  dataUpdate: AddressItemResponse | undefined;
  setIsFilled?: React.Dispatch<React.SetStateAction<boolean>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
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
  setType,
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
  const [showMap, setShowMap] = useState(false);
  const dispatch = useAppDispatch();
  const [mapInitialCoords, setMapInitialCoords] = useState<{
    lat: number;
    lng: number;
  }>({
    //toạ độ mặc định ban đầu
    lat: 10.7588867,
    lng: 106.6755666,
  });

  let chosenLat = watch("lat");
  chosenLat = chosenLat ? +chosenLat : 10.7588867;

  let chosenLng = watch("lng");
  chosenLng = chosenLng ? +chosenLng : 106.6755666;

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
      handleBack();
    }
  };

  const handleBack = () => {
    setType("USER_ADDRESS");
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
        lat,
        lng,
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
      setValue("lat", lat);
      setValue("lng", lng);

      if (!!provinceId) {
        onGetListDistrict(provinceId);
        if (!!districtId) {
          onGetListWard(provinceId, districtId);
        }
      }
    }
  };

  async function getCoordsFromAddressText(address: string) {
    const apiKey = process.env.NNEXT_PUBLIC_VIETMAP_API_KEY;
    if (!apiKey || !address) return null;

    try {
      const url = `https://maps.vietmap.vn/api/geocode/v3?apikey=${apiKey}&address=${encodeURIComponent(
        address
      )}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch coordinates");

      const data = await res.json();
      if (data && data.length > 0) {
        const [lng, lat] = data[0].geometry.coordinates;
        return { lat, lng };
      }
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  }

  // ====
  // HÀM MỚI VỚI CHỨC NĂNG NÂNG CẤP
  const handleSelectFromMap = async (mapData: {
    address: string;
    lng: number;
    lat: number;
  }) => {
    setShowMap(false);
    setValue("lat", mapData.lat);
    setValue("lng", mapData.lng);
  
    try {
      const result = await dispatch(convertCoordsToAddress({ lat: mapData.lat, lng: mapData.lng })).unwrap();
  
      const boundaries = result?.boundaries || [];
  
      const province = boundaries.find((b: any) => b.type === 0);
      const district = boundaries.find((b: any) => b.type === 1);
      const ward = boundaries.find((b: any) => b.type === 2);
  
      // === Cập nhật Tỉnh ===
      const foundProvince = listProvince.find((p) =>
        province?.fullName.toLowerCase().includes(p.name.toLowerCase())
      );
  
      if (foundProvince) {
        setValue("provinceId", foundProvince.id);
        setValue("customerProvince", foundProvince.name);
  
        const districts = await onGetListDistrict(foundProvince.id);
  
        // === Cập nhật Quận ===
        const foundDistrict = districts.find((d: any) =>
          district?.fullName.toLowerCase().includes(d.name.toLowerCase())
        );
  
        if (foundDistrict) {
          setValue("districtId", foundDistrict.id);
          setValue("customerDistrict", foundDistrict.name);
  
          const wards = await onGetListWard(foundProvince.id, foundDistrict.id);
  
          // === Cập nhật Phường ===
          const foundWard = wards.find((w: any) =>
            ward?.fullName.toLowerCase().includes(w.name.toLowerCase())
          );
  
          if (foundWard) {
            setValue("wardId", foundWard.id);
            setValue("customerWard", foundWard.name);
          }
        }
      }
  
      // Cập nhật địa chỉ chi tiết nếu cần
      const addressParts = mapData.address.split(",").map((p) => p.trim());
      const street = addressParts.slice(0, addressParts.length - 3).join(", ");
      setValue("customerStreetAddress", street || addressParts[0] || "");
    } catch (err) {
      console.error("Error calling vietmap convert:", err);
    }
  };
  useEffect(() => {
    const fullAddress = `${watch("customerStreetAddress")}, ${watch("customerWard")}, ${watch("customerDistrict")}, ${watch("customerProvince")}`;
    const updateCoords = async () => {
      const coords = await getCoordsFromAddressText(fullAddress);
      if (coords) {
        setMapInitialCoords({ lat: coords.lat, lng: coords.lng });
      }
    };
    updateCoords();
  }, [
    watch("customerWard"),
    watch("customerDistrict"),
    watch("customerProvince"),
    watch("customerStreetAddress"),
  ]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showMap) {
        handleClosedMap();
      }
    };

    if (showMap) {
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [showMap]);

  const handleOpenMap = () => {
    setShowMap(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosedMap = () => {
    setShowMap(false);
    document.body.style.overflow = "unset";
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
      return res;
    } catch (e) {
      console.log("Error", e);
      return [];
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
      return res;
    } catch (e) {
      console.log("Error", e);
      return [];
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

  // Cleanup effect khi component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Render modal using Portal
  const renderModal = () => {
    if (!showMap) return null;

    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-5">
        <div
          className="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            width: "calc(100vw - 40px)",
            height: "calc(100vh - 40px)",
            maxWidth: "none",
            maxHeight: "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-1 border-b border-gray-200 bg-white rounded-t-xl">
            <h2 className="text-lg font-semibold text-gray-800">
              Chọn địa chỉ trên bản đồ
            </h2>
            <button
              onClick={handleClosedMap}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition-colors"
            >
              ×
            </button>
          </div>

          <div className="flex-1 relative overflow-hidden">
            <MapComponent
              initialLocation={{
                lat: chosenLat,
                lng: chosenLng,
              }}
              onSelectLocation={handleSelectFromMap}
              onClose={handleClosedMap}
            />
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
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
                {...register("receiverName", { required: true })}
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
                type="tel"
                inputMode="numeric"
                pattern="^0[1-9][0-9]{8,9}$"
                maxLength={11}
                placeholder="Số điện thoại"
                className="pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
                {...register("receiverPhoneNumber", {
                  required: true,
                  pattern: {
                    value: /^(0[1-9][0-9]{8,9})$/,
                    message:
                      "Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và có 10-11 chữ số)",
                  },
                })}
              />
            </div>
            {errors.receiverPhoneNumber && (
              <span className="body-xs-medium text-Warning/500">
                {errors.receiverPhoneNumber?.message}
              </span>
            )}
          </div>
        </div>

        <div className="py-4 flex flex-col gap-2">
          <div className="text-base text-gray-500 font-medium">
            Địa chỉ nhận hàng
          </div>

          {/* Khung chọn thành phố, quận, huyện */}
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

          {/* Khung nhập địa chỉ cụ thể */}
          <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
            <input
              className="w-full pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
              placeholder="Địa chỉ nhận hàng"
              {...register("customerStreetAddress", { required: true })}
            />
            <button type="button" onClick={handleOpenMap}>
              <Location strokeColor="#A0A0AB" />
            </button>
          </div>

          {errors.customerStreetAddress && (
            <span className="body-xs-medium text-Warning/500">
              Nhập Địa Chỉ
            </span>
          )}

          {/* Khung địa chỉ mặc định*/}
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
          <Button type="primary-outlined" onClick={handleBack}>
            Trở lại
          </Button>
          <Button htmlType="submit" type="primary">
            Xác nhận
          </Button>
        </div>
      </form>

      {renderModal()}
    </>
  );
}

export default UserInformation;
