// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { isEmpty, pick } from 'lodash';

export async function getCoupons(params: API.PageParams, options?: { [key: string]: any }) {
  const response = await request<API.CouponResult>('/coupons/admin', {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    params: {
      ...params,
      page: Number(params?.page) || 0,
      size: Number(params?.size) || 20,
    },
    ...(options || {}),
  });

  return response;
}

export async function detailCoupon(params: { id: string }, options?: { [key: string]: any }) {
  const response = await request<API.Coupon>(`/coupons/${params?.id}`, {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function deleteCoupon(params: { id: string }, options?: { [key: string]: any }) {
  const response = await request(`/coupons/${params?.id}`, {
    method: 'DELETE',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function upload(
  data: {
    file: File;
  },
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  formData.append('file', data?.file);
  const response = await request<API.UploadResult>('/files/upload', {
    method: 'POST',
    // baseURL: ADMIN_API_URL as string,
    baseURL: 'https://api.hathyo.com/admin/api/v1',
    headers: { contentType: 'multiple/form-data' },
    data: formData,
    ...(options || {}),
  });

  return { data: response };
}

export async function addCoupon(data: API.CouponFormValue, options?: { [key: string]: any }) {
  if (!Array.isArray(data?.image)) {
    return;
  }
  const { data: responseUpload } = await upload({ file: data?.image[0].originFileObj });
  if (isEmpty(responseUpload?.links)) {
    throw new Error('Có lỗi xảy ra trong quá trình upload thumbnail');
  }
  const payload = {
    ...pick(data, [
      'code',
      'title',
      'description',
      'image',
      'discountType',
      'discountValue',
      'discountPercent',
      'minimumPriceApply',
      'maxDiscountPrice',
      'quantity',
      'startAt',
      'expiredAt',
      'type',
    ]),
    merchantId: null,
    productId: null,
    image: responseUpload?.links?.permalink,
  };

  const response = await request('/coupons', {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data: payload,
    ...(options || {}),
  });
  return { data: response };
}

export async function patchCoupon(data: API.CouponFormValue, options?: { [key: string]: any }) {
  if (!Array.isArray(data?.image)) {
    return;
  }
  const { data: responseUpload } = await upload({ file: data?.image[0].originFileObj });
  if (isEmpty(responseUpload?.links)) {
    throw new Error('Có lỗi xảy ra trong quá trình upload thumbnail');
  }
  const payload = {
    ...pick(data, [
      'code',
      'title',
      'description',
      'image',
      'discountType',
      'discountValue',
      'discountPercent',
      'minimumPriceApply',
      'maxDiscountPrice',
      'quantity',
      'startAt',
      'expiredAt',
      'type',
      'merchantId',
      'productId',
    ]),
    image: responseUpload?.links?.permalink,
  };

  const response = await request(`/coupons/${data?.code}`, {
    method: 'PATCH',
    baseURL: ADMIN_API_URL as string,
    data: payload,
    ...(options || {}),
  });

  return { data: response };
}

export async function patchStatus(
  params: { id: number; status: boolean },
  options?: { [key: string]: any },
) {
  const response = await request(`/coupons/${params.id}/active-status`, {
    method: 'PUT',
    baseURL: ADMIN_API_URL as string,
    params: { status: params.status },
    ...(options || {}),
  });

  return { data: response };
}
