// @ts-ignore
/* eslint-disable */

declare namespace API {
  type DiscountType = 'PERCENT' | 'PRICE';
  type CouponSourceType = 'HATHYO' | 'SYSTEM' | 'MERCHANT';

  type Coupon = {
    id: number;
    code: string;
    title: string;
    description: string;
    image: string;
    discountType: DiscountType;
    discountValue: number;
    discountPercent: number;
    minimumPriceApply: number;
    maxDiscountPrice: number;
    quantity: number;
    startAt: string; // ISO format
    expiredAt: string; // ISO format
    type: CouponSourceType;
    merchantId: number;
    productId: number;
    status: boolean; // 👈 trạng thái kích hoạt (true = active, false = inactive)
    activeStatus: boolean;
  };

type CouponFormValue = {
  id?: number;
  code: string;
  title: string;
  description: string;
  image?: string;
  discountType: DiscountType;
  discountValue?: number;
  discountPercent?: number;
  minimumPriceApply?: number;
  maxDiscountPrice?: number;
  quantity: number;
  startAt: string;
  expiredAt: string;
  type: CouponSourceType;
  merchantId?: number;
  productId?: number;
  status?: boolean;
  dateRange?: [string | dayjs.Dayjs, string | dayjs.Dayjs]; // 👈 thêm dòng này
};

  type CouponQueryParams = {
    q?: string;
    page?: number;
    size?: number;
    type?: CouponSourceType;
    createdFrom?: string;
    createdTo?: string;
  };

  type CouponResult = {
    current?: number;
    pageSize?: number;
    totalElements?: number;
    coupons?: Coupon[];
  };
}
