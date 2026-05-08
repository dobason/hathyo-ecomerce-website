// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { get, isEmpty, omit } from 'lodash';

import { upload } from '../posts/api';

export async function detailMerchant(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.Merchants>(`/merchant/${params?.id}`, {
    method: 'GET',
    baseURL: ADMIN_API_URL,
    ...(options || {}),
  });

  return { data: response };
}

export async function merchants(
  params: {
    page?: number;
    size?: number;
    q?: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.MerchantResponse>('/merchant', {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    params: {
      // ...params,
      page: Number(params?.page),
      size: Number(params?.size) || 20,
      ...(params?.q ? { q: params?.q } : {}),
      // default page start at 0, must minus 1 for page
    },
    ...(options || {}),
  });

  return { data: response };
}

export async function patchStatus(
  params: {
    status: string;
    id: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<any>(`/merchant/${params?.id}/update-status`, {
    method: 'PATCH',
    baseURL: ADMIN_API_URL as string,
    data: { merchantStatus: params?.status },
    ...(options || {}),
  });

  return { data: response };
}

export async function patchMerchant(data: API.Merchants, options?: { [key: string]: any }) {
  let payload = {
    ...data,
    logo: data?.logo,
  };

  if (get(data, 'fileUpload.0.name')) {
    const { data: responseUpload } = await upload({ file: data?.fileUpload[0].originFileObj });
    if (isEmpty(responseUpload?.links)) {
      throw new Error('Có lỗi xảy ra trong quá trình upload logo');
    }

    payload = {
      ...payload,
      logo: responseUpload?.links?.permalink,
    };
  }
  if (get(data, 'identityImageBackTempt.0.name')) {
    const { data: responseUpload } = await upload({
      file: data?.identityImageBackTempt[0].originFileObj,
    });
    if (isEmpty(responseUpload?.links)) {
      throw new Error('Có lỗi xảy ra trong quá trình upload ảnh mặt sau CCCD');
    }

    payload = {
      ...payload,
      identityImageBack: responseUpload?.links?.permalink,
    };
  }
  if (get(data, 'identityImageFrontTempt.0.name')) {
    const { data: responseUpload } = await upload({
      file: data?.identityImageFrontTempt[0].originFileObj,
    });
    if (isEmpty(responseUpload?.links)) {
      throw new Error('Có lỗi xảy ra trong quá trình upload ảnh mặt trước CCCD');
    }

    payload = {
      ...payload,
      identityImageFront: responseUpload?.links?.permalink,
    };
  }
  if (get(data, 'businessLicenseTempt.0.name')) {
    const { data: responseUpload } = await upload({
      file: data?.businessLicenseTempt[0].originFileObj,
    });
    if (isEmpty(responseUpload?.links)) {
      throw new Error('Có lỗi xảy ra trong quá trình upload ảnh giấy phép kinh doanh');
    }

    payload = {
      ...payload,
      businessLicense: responseUpload?.links?.permalink,
    };
  }

  const response = await request<API.Merchants>(`/merchant/${data?.id}`, {
    method: 'PATCH',
    baseURL: ADMIN_API_URL as string,
    data: omit(payload, [
      'identityImageFrontTempt',
      'identityImageBackTempt',
      'fileUpload',
      'businessLicenseTempt',
    ]),
    ...(options || {}),
  });

  return { data: response };
}
