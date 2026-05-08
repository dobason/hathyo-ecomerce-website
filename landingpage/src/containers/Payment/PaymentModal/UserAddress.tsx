import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { useAppSelector, useAppDispatch } from "@/store";
import { selectAddress } from "@/store/addressSlice";
import { AddressItemResponse } from "@/types/address";

type Props = {
  actionType: string;
  dataUpdate: AddressItemResponse | undefined;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActionType: React.Dispatch<React.SetStateAction<string>>;
  setDataUpdate: React.Dispatch<
    React.SetStateAction<AddressItemResponse | undefined>
  >;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

function AddressBook({
  setVisible,
  setType,
  setActionType,
  setDataUpdate,
}: Props) {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.address.addresses);
  const addressSelected = useAppSelector(
    (state) => state.address.addressSelected
  );

  const [selectedAddress, setSelectedAddress] = useState<
    AddressItemResponse | undefined
  >(addressSelected);

  useEffect(() => {
    setSelectedAddress(addressSelected);
  }, [addressSelected]);

  const handleUpdate = (item: AddressItemResponse) => {
    setDataUpdate(item);
    setActionType("update");
    setType("USER_INFORMATION");
  };

  const handleAdd = () => {
    setDataUpdate(undefined);
    setActionType("create");
    setType("USER_INFORMATION");
  };

  const formatAddress = (
    address: string,
    ward: string,
    district: string,
    province: string
  ) => {
    return [address, ward, district, province].filter(Boolean).join(", ");
  };

  const handleSelectedAddress = (address: AddressItemResponse) => {
    setSelectedAddress(address);
  };

  const onConfirmSelected = () => {
    if (!!selectedAddress) {
      dispatch(selectAddress(selectedAddress));
      setVisible(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-4">
        {addresses?.map((it, index) => (
          <React.Fragment key={it.id}>
            {index > 0 && <hr className="my-2 border-gray-200" />}
            <div className="flex gap-4 items-center">
              <input
                type="radio"
                name="selectedAddress"
                value={it.id}
                checked={selectedAddress?.id === it.id}
                onChange={() => handleSelectedAddress(it)}
                className="accent-Moss5700 text-Moss/500 focus:ring-Moss/500 h-4 w-4 border-gray-300"
              />
              <div className="flex flex-1 w-full flex-col gap-1">
                <div className="flex items-center justify-between w-full">
                  <h4 className="font-semibold text-lg text-Grayiron/700">
                    {it.receiverName}
                  </h4>
                  <div
                    className="text-Moss/600 hover:text-Moss/500 py-1 rounded-sm text-md cursor-pointer"
                    onClick={() => handleUpdate(it)}
                  >
                    Cập nhật
                  </div>
                </div>

                <p className="text-Grayiron/500 text-md">
                  {it.receiverPhoneNumber}
                </p>
                <p className="text-Grayiron/400 body-xs-medium">
                  {formatAddress(
                    it.customerStreetAddress,
                    it.customerWard,
                    it.customerDistrict,
                    it.customerProvince
                  )}
                </p>
                {it.isDefault && (
                  <span className="text-xs font-semibold border border-Moss/500 text-Moss/500 px-2 py-1 rounded-sm w-fit">
                    Mặc định
                  </span>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
        {addresses.length < 5 && (
          <div
            onClick={handleAdd}
            className="text-Moss/600 hover:text-Moss/500 flex items-center py-1 rounded-sm cursor-pointer"
          >
            <svg
              className="w-4 h-4 mr-2 fill-current text-Moss/600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 5v5h5v1h-5v5h-1v-5H4v-1h5V5h1z" />
            </svg>
            Thêm địa chỉ mới
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-row justify-end">
        <Button type="primary" onClick={onConfirmSelected}>
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

export default AddressBook;
