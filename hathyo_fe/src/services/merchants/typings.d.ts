// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Merchants = {
    address?: string;
    email?: string;
    city?: string;
    district?: string;
    id?: string;
    logo?: string;
    merchantCode?: string;
    merchantStatus?: string;
    merchantType?: string;
    phoneNo?: string;
    storeName?: string;
    userId?: string;
    ward?: string;
    fileUpload: [file];
    taxNumber: string;
    identityNumber: string;
    identityImageFront: string;
    identityImageBack: string;
    agreed: boolean;
    identityImageFrontTempt: [file];
    identityImageBackTempt: [file];
    businessLicenseTempt: [file];
    businessLicense: string;
  };

  type MerchantResponse = {
    currentPage: number;
    merchants: Merchants[];
    totalElements: number;
    totalPages: number;
  };

  type UpdateMerchantStatusParams = {
    id?: string;
    status?: string;
  };
}

declare const ADMIN_API_URL: string;
declare const AUTH_API_URL: string;
