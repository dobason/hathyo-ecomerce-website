import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "@/components/Select";
import {
  returnOrderService,
  updateChooseReturnItem,
} from "@/services/client/orders";
import { toast } from "react-toastify";
import { Order, OrderItem } from "@/types/orders";
import { useState, useEffect } from "react";
import ImageFallback from "@/components/ImageFallback";
import { formatToCurrencyVND } from "@/utils/commonHelper";
import {
  getListProvinceService,
  getListDistrictService,
  getListWardService,
} from "@/services/client/address";
import Location from "@/components/Icons/Location";
import dayjs from "dayjs";
import UploadImage from "@/components/UploadImage";

interface FormValues {
  reason: string;
  customReason?: string;
  returnName: string;
  returnPhone: string;
  streetAddress: string;
  ward?: string;
  district?: string;
  province?: string;
  wardId: number;
  districtId: number;
  provinceId: number;
  bankName: string;
  bankHolder: string;
  bankNumber: string;
  imageUrls?: string;
}

interface AddressType {
  id: number;
  name: string;
  code: string;
  area: string;
  aresName: string;
  deletedFlag: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  order?: Order;
  refreshData: () => void;
  orderList: OrderItem[];
}

const reasons = [
  "Sản phẩm bị lỗi, hư hỏng, bể vỡ...",
  "Sản phẩm không đúng mô tả",
  "Giao sai sản phẩm",
  "Thiếu hàng",
  "Hàng giả, hàng nhái, hàng không chính hãng",
  "Sản phẩm đã qua sử dụng",
  "Hàng không hoạt động hoặc bị lỗi kỹ thuật",
  "Không có phụ kiện đi kèm",
  "Sản phẩm hết hạn sử dụng",
  "Nhận hàng trễ hơn dự kiến",
  "Khác",
];

// Validation Schema
const schema = yup.object({
  reason: yup.string().required("Vui lòng nhập lý do"),
  customReason: yup.string(),
  returnName: yup.string().required("Vui lòng nhập tên"),
  returnPhone: yup.string().required("Vui lòng nhập số điện thoại"),
  streetAddress: yup.string().required("Vui lòng nhập số nhà/ đường"),
  bankName: yup.string().required("Vui lòng nhập tên"),
  bankHolder: yup.string().required("Vui lòng nhập số điện thoại"),
  bankNumber: yup.string().required("Vui lòng nhập số nhà/ đường"),
  wardId: yup.number().required("Chọn phường/xã"),
  districtId: yup.number().required("Chọn quận/huyện"),
  provinceId: yup.number().required("Chọn tỉnh/thành phố"),
  ward: yup.string(),
  district: yup.string(),
  province: yup.string(),
  imageUrls: yup.string(),
});

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  order,
  refreshData,
  orderList,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
    resetField,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const reasonWatch = watch("reason");
  const [loading, setLoading] = useState(false);
  const [listProvince, setListProvince] = useState<AddressType[]>([]);
  const [listDistrict, setListDistrict] = useState<AddressType[]>([]);
  const [listWard, setListWard] = useState<AddressType[]>([]);

  useEffect(() => {
    onGetListProvince();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Reset scroll when modal is closed
    }
    return () => {
      document.body.style.overflow = ""; // Reset on unmount or when modal closes
    };
  }, [isOpen]);

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

  const handleChooseProduct = async (itemId: number, choose: boolean) => {
    try {
      await updateChooseReturnItem({
        id: itemId,
        body: { choose },
      });
      refreshData();
    } catch (e) {
      console.log("Error", e);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      if (order?.id) {
        const finalReason =
          values?.reason === "Other" ? values?.customReason : values?.reason;
        const res = await returnOrderService({
          body: {
            orderId: order?.id,
            merchantId: order?.merchant?.id,
            bankName: values?.bankName,
            bankHolder: values?.bankHolder,
            bankNumber: values?.bankNumber,
            commentReturn: finalReason,
            returnTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            streetAddress: values?.streetAddress,
            wardId: values?.wardId,
            ward: values?.ward,
            districtId: values?.districtId,
            district: values?.district,
            provinceId: values?.provinceId,
            province: values?.province,
            returnPhone: values?.returnPhone,
            returnName: values?.returnName,
            imageUrls: values?.imageUrls,
          },
        });
        if (!!res.code && !!res.message) {
          toast.error(res.message ?? "Yêu cầu hoàn trả thất bại");
          return;
        }
        toast.success("Yêu cầu hoàn trả thành công");
        refreshData();
      }
    } catch (e) {
      console.log("Error", e);
    } finally {
      reset(); // reset after form submit
      onClose();
    }
  };

  const handleChangeProvince = (provinceId: number) => {
    const findProvinceName =
      listProvince.find((p) => p.id === provinceId)?.name ?? "";
    setValue("provinceId", provinceId);
    setValue("province", findProvinceName);
    resetField("districtId");
    resetField("wardId");
    resetField("district");
    resetField("ward");
    onGetListDistrict(provinceId);
  };

  const handleChangeDistrict = (districtId: number) => {
    const findDistrictName =
      listDistrict.find((p) => p.id === districtId)?.name ?? "";
    setValue("districtId", districtId);
    setValue("district", findDistrictName);
    resetField("wardId");
    resetField("ward");
    onGetListWard(watch("provinceId"), districtId);
  };

  const handleChangeWard = (wardId: number) => {
    const findWardName = listWard.find((p) => p.id === wardId)?.name ?? "";
    setValue("wardId", wardId);
    setValue("ward", findWardName);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg xl:max-w-[50vw] w-full flex flex-col gap-6"
      >
        <h3 className="heading-5">Yêu cầu trả hàng</h3>
        <div className="flex flex-col gap-2 h-[70vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <div className="text-base text-gray-500 font-medium">
              Sản phẩm muốn trả
            </div>
            {orderList?.map((item, index) => (
              <div
                className="flex items-center flex-row"
                key={`${item.id}-${index}`}
              >
                <div className="w-full flex justify-start items-center gap-3 text-base px-4">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-Moss/400 rounded-md"
                    checked={item.chooseReturn}
                    disabled={item.returned}
                    onChange={() =>
                      handleChooseProduct(item.id, !item.chooseReturn)
                    }
                  />
                  <div className="flex flex-row justify-start items-center">
                    <ImageFallback
                      src={item.productVariantImage}
                      className="xl:w-12 xl:h-12 rounded-md"
                      alt="cart item"
                      width={32}
                      height={32}
                      errorImg="/product-fallback-image.png"
                    />
                    <div className="ml-2 xl:text-base xl:block flex flex-col h-[108px] xl:h-auto justify-around text-md text-Grayiron/600">
                      <div className="flex flex-col gap-1">
                        <div className="line-clamp-2">
                          {item.productVariantTitle}
                        </div>
                        {item.returned && (
                          <div className="ml-2 italic font-sm-medium text-red-600 ellipsis-content-2 w-full">
                            Đã yêu cầu hoàn trả
                          </div>
                        )}
                      </div>

                      <div className="text-md">
                        {item.discountProductPrice > item.productPrice && (
                          <span className="text-Grayiron/400 line-through pr-1">
                            {formatToCurrencyVND(item.discountProductPrice)}
                          </span>
                        )}
                        <span className="text-Moss/500">
                          {formatToCurrencyVND(item.productPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-base text-gray-500 font-medium">
                Lý do trả hàng
              </div>
              <div className="flex flex-col gap-1 ps-2">
                {reasons.map((r) => (
                  <div key={r} className="flex items-center">
                    <input
                      {...register("reason")}
                      type="radio"
                      value={r}
                      className="form-radio h-4 w-4 text-Moss/600"
                    />
                    <span className="ml-2 text-gray-700">{r}</span>
                  </div>
                ))}
                {errors.reason && (
                  <p className="text-red-500 text-xs">
                    {errors.reason.message}
                  </p>
                )}
              </div>

              {reasonWatch === "Khác" && (
                <input
                  {...register("customReason")}
                  type="text"
                  placeholder="Specify your reason"
                  className="mt-2 form-input rounded-md shadow-sm w-full"
                />
              )}
            </div>

            {errors.customReason && (
              <p className="text-red-500 text-xs">
                {errors.customReason.message}
              </p>
            )}
            <div className="flex flex-col gap-2">
              <div className="text-base text-gray-500 font-medium">
                Địa chỉ hoàn hàng
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
                    <input
                      className="pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
                      placeholder="Tên người hoàn trả"
                      {...register("returnName")}
                    />
                  </div>

                  {errors.returnName && (
                    <span className="body-xs-medium text-Warning/500">
                      {errors.returnName?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
                    <input
                      className="pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
                      placeholder="Số điện thoại hoàn trả"
                      {...register("returnPhone")}
                    />
                  </div>

                  {errors.returnPhone && (
                    <span className="body-xs-medium text-Warning/500">
                      {errors.returnPhone?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
                    <input
                      className="pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
                      placeholder="Địa chỉ hoàn hàng"
                      {...register("streetAddress")}
                    />
                    <Location strokeColor="#A0A0AB" />
                  </div>
                  {errors.streetAddress && (
                    <span className="body-xs-medium text-Warning/500">
                      {errors.streetAddress?.message}
                    </span>
                  )}
                </div>

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
                    {errors.province && (
                      <span className="body-xs-medium text-Warning/500">
                        {errors.province?.message}
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
                    {errors.district && (
                      <span className="body-xs-medium text-Warning/500">
                        {errors.district?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Select
                      value={watch("wardId")}
                      className=""
                      placeholder="Quận huyện"
                      options={listWard?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      onChange={(value) => handleChangeWard(value)}
                    />
                    {errors.ward && (
                      <span className="body-xs-medium text-Warning/500">
                        {errors.ward?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-base text-gray-500 font-medium">
                Tài khoản hoàn tiền
              </div>
              <div className="flex flex-col grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-1">
                  <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
                    <input
                      className="pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
                      placeholder="Ngân hàng"
                      {...register("bankName")}
                    />
                  </div>

                  {errors.bankName && (
                    <span className="body-xs-medium text-Warning/500">
                      {errors.bankName?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
                    <input
                      className="pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
                      placeholder="Tên tài khoản"
                      {...register("bankHolder")}
                    />
                  </div>

                  {errors.bankHolder && (
                    <span className="body-xs-medium text-Warning/500">
                      {errors.bankHolder?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="rounded-lg px-2 py-3 border border-gray-200 flex flex-row justify-between flex-nowrap items-center">
                    <input
                      className="pl-1 py-0 focus:ring-transparent placeholder:text-gray-300 placeholder:text-md placeholder:font-normal pr-1 !border-none bg-white text-gray-500 text-md outline-none font-normal"
                      placeholder="Số tài khoản"
                      {...register("bankNumber")}
                    />
                  </div>

                  {errors.bankNumber && (
                    <span className="body-xs-medium text-Warning/500">
                      {errors.bankNumber?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-base text-gray-500 font-medium">Ảnh</div>
              <UploadImage
                setValue={setValue}
                watch={watch}
                customKey="imageUrls"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-2 bg-Moss/500 text-white rounded-lg"
          >
            Chấp nhận
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-Grayiron/300 text-white rounded-lg"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
