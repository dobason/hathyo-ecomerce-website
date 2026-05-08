// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { get, isEmpty, omit } from 'lodash';
import moment from 'moment';
import { upload } from '../posts/api';

export async function detailMerchant(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.Merchants>(`/merchant/${params?.id}`, {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function orders(
  params: {
    page?: number;
    size?: number;
    status?: string;
    merchantId?: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.OrderReturnResponse>('/orders/order-return', {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    params: {
      ...params,
      status: params.status === 'ALL' ? undefined : params.status,
      page: Number(params?.page),
      size: Number(params?.size) || 20,
      // default page start at 0, must minus 1 for page
    },
    ...(options || {}),
  });

  return { data: response };
}

export async function ordersRevenue(
  body: {
    startDate: string;
    endDate: string;
    merchantId: number;
    page: number;
    size: number;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.OrderReturnResponse>('/orders/order-return/revenue', {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data: {
      ...body,
    },
    ...(options || {}),
  });

  return { data: response };
}

export async function transOrderReturn(
  body: API.OrderTransRequest,
  options?: { [key: string]: any },
) {
  const response = await request<any>(`/orders/order-return/${body.id}/trans`, {
    method: 'PATCH',
    baseURL: ADMIN_API_URL as string,
    data: {
      remarks: body.remarks,
      order_time: moment(body.order_time).format('YYYY-MM-DD HH:mm:ss'),
      payment_method: body.payment_method,
      service_id: body.service_id,
    },
    ...(options || {}),
  });

  return { data: response };
}

export async function cancelOrderReturn(
  body: API.OrderCancelRequest,
  options?: { [key: string]: any },
) {
  const response = await request<any>(`/orders/order-return/${body.id}/cancel`, {
    method: 'PATCH',
    baseURL: ADMIN_API_URL as string,
    data: {
      cancelReason: body.cancelReason === 'other' ? body.otherReason : body.cancelReason,
    },
    ...(options || {}),
  });

  return { data: response };
}

export async function rejectOrderReturn(
  body: API.OrderRejectRequest,
  options?: { [key: string]: any },
) {
  const response = request<any>(`/orders/order-return/reject`, {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data: {
      orderReturnId: body.orderReturnId,
      reasonReject: body.reasonReject === 'other' ? body.otherReason : body.reasonReject,
    },
    ...(options || {}),
  });
  return { data: response };
}

export async function sentRefund(body: API.OrderCancelRequest, options?: { [key: string]: any }) {
  const response = await request<any>(`/orders/order-return/refund/sent`, {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data: body,
    ...(options || {}),
  });

  return { data: response };
}

export async function getListCityByAhamove(options?: { [key: string]: any }) {
  const response = await request<API.CityResponse>(`/ahamove/source-data/cities/`, {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function getListServiceTypeByAhamove(
  params: {
    city_id: number;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.ServiceTypeResponse>(`ahamove/source-data/service_types`, {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    params,
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
