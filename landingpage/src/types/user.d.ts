export interface User {
  firstname: string;
  lastname: string;
  avatar: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  birthday: string;
  phone: string;
  ward: string;
  district: string;
  city: string;
  address: string;
  email: string;
  cityId?: number;
  districtId?: number;
  wardId?: number;

  province?: string;
  provinceId?: number;
}
