import { useEffect, useState } from "react";
import {
  getListDistrictService,
  getListProvinceService,
  getListWardService,
} from "@/services/client/address";

interface AddressType {
  id: number;
  name: string;
  code: string;
  area: string;
  aresName: string;
  deletedFlag: boolean;
}

export const useAddressSelector = (initialProvinceId: number = 79) => {
  const [listProvince, setListProvince] = useState<AddressType[]>([]);
  const [listDistrict, setListDistrict] = useState<AddressType[]>([]);
  const [listWard, setListWard] = useState<AddressType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [isLoadingWards, setIsLoadingWards] = useState(false);

  const [provinceId, setProvinceId] = useState<number | null>(
    initialProvinceId
  );
  const [districtId, setDistrictId] = useState<number | null>(null);
  const [wardId, setWardId] = useState<number | null>(null);

  const fetchProvinces = async () => {
    setIsLoadingProvinces(true);
    try {
      const res = await getListProvinceService();
      console.log("Provinces fetched:", res);
      if (res && Array.isArray(res)) {
        console.log("Provinces fetched:", res);
        setListProvince(res);
        setError(null);
      } else {
        console.error("Invalid province data:", res);
        setListProvince([]);
        setError("Dữ liệu tỉnh/thành phố không hợp lệ");
      }
    } catch (err) {
      console.error("Province fetch error:", err);
      setError("Không thể tải danh sách tỉnh/thành phố");
      setListProvince([]);
    } finally {
      setIsLoadingProvinces(false);
    }
  };

  const fetchDistricts = async (provinceId: number) => {
    setIsLoadingDistricts(true);
    try {
      const res = await getListDistrictService({ params: { provinceId } });
      console.log("Districts fetched for provinceId", provinceId, ":", res);
      if (res && Array.isArray(res)) {
        setListDistrict(res);
        setError(null);
      } else {
        console.error("Invalid district data:", res);
        setListDistrict([]);
        setError("Dữ liệu quận/huyện không hợp lệ");
      }
    } catch (err) {
      console.error("District fetch error:", err);
      setError("Không thể tải danh sách quận/huyện");
      setListDistrict([]);
    } finally {
      setIsLoadingDistricts(false);
    }
  };

  const fetchWards = async (provinceId: number, districtId: number) => {
    setIsLoadingWards(true);
    try {
      const res = await getListWardService({
        params: { provinceId, districtId },
      });
      console.log(
        "Wards fetched for provinceId",
        provinceId,
        "districtId",
        districtId,
        ":",
        res
      );
      if (res && Array.isArray(res)) {
        setListWard(res);
        setError(null);
      } else {
        console.error("Invalid ward data:", res);
        setListWard([]);
        setError("Dữ liệu phường/xã không hợp lệ");
      }
    } catch (err) {
      console.error("Ward fetch error:", err);
      setError("Không thể tải danh sách phường/xã");
      setListWard([]);
    } finally {
      setIsLoadingWards(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
    if (initialProvinceId) {
      fetchDistricts(initialProvinceId);
    }
  }, []);

  useEffect(() => {
    console.log("provinceId changed:", provinceId);
    if (provinceId) {
      setListDistrict([]);
      setListWard([]);
      setDistrictId(null);
      setWardId(null);
      fetchDistricts(provinceId);
    } else {
      setListDistrict([]);
      setListWard([]);
      setDistrictId(null);
      setWardId(null);
    }
  }, [provinceId]);

  useEffect(() => {
    console.log("districtId changed:", districtId);
    if (provinceId && districtId) {
      setListWard([]);
      setWardId(null);
      fetchWards(provinceId, districtId);
    } else {
      setListWard([]);
      setWardId(null);
    }
  }, [provinceId, districtId]);

  return {
    listProvince,
    listDistrict,
    listWard,
    provinceId,
    districtId,
    wardId,
    setProvinceId,
    setDistrictId,
    setWardId,
    fetchProvinces,
    fetchDistricts,
    fetchWards,
    error,
    isLoadingProvinces,
    isLoadingDistricts,
    isLoadingWards,
  };
};
