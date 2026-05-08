export interface AddressInfo {
  isDefault: boolean;
  customerStreetAddress: string;
  customerWard: string;
  customerDistrict: string;
  customerProvince: string;
  receiverPhoneNumber: string;
  receiverName: string;
}

export interface AddressDataType {
  addresses: AddressItemResponse[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export interface AddressItemResponse {
  id: number;
  isDefault: boolean;
  customerStreetAddress: string;
  customerWard: string;
  customerDistrict: string;
  customerProvince: string;
  receiverPhoneNumber: string;
  receiverName: string;
  wardId?: number;
  districtId?: number;
  provinceId?: number;
  lat?: number;
  lng?: number;
}

