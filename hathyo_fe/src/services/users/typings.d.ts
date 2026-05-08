// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Users = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    avatar: string | null;
    gender: 'MALE' | 'FEMALE' | null;
    birthday: string | null;
    phone: string;
    ward: string;
    district: string;
    city: string;
    address: string;
    banned: boolean;
    identityImageBack?: string | null;
    businessLicense?: string | null;
  };
  type UserProfile = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    avatar: string | null;
    gender: 'MALE' | 'FEMALE' | null;
    birthday: string | null;
    phone: string;
    ward: string;
    district: string;
    city: string;
    address: string;
    banned: boolean;
    avatar: string;
    fileUpload: string;
  };

  type UserResponse = {
    currentPage: number;
    users: Users[];
    totalElements: number;
    totalPages: number;
  };

  type UpdateUserStatusParams = {
    userId: string;
    banned: boolean;
  };
}
