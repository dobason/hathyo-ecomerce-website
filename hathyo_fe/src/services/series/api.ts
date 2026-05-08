// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function detailSeries(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.Series>(`/series/${params?.id}`, {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function list(
  params: {
    query: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.SeriesResult>('/series', {
    params: {
      page: 0,
      size: 20,
      q: params?.query || '',
    },
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function series(
  params: {
    page?: number;
    size?: number;
    q?: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.SeriesResult>('/series', {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    params: {
      ...params,
      page: Number(params?.page),
      size: Number(params?.size) || 20,
      // default page start at 0, must minus 1 for page
    },
    ...(options || {}),
  });

  return { data: response };
}

export async function deleteSeries(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<unknown>(`/series/${params?.id}`, {
    method: 'DELETE',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function addSeries(data: API.SeriesFormValue, options?: { [key: string]: any }) {
  const response = await request<API.Series>('/series', {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data,
    ...(options || {}),
  });

  return { data: response };
}

export async function patchSeries(data: API.SeriesFormValue, options?: { [key: string]: any }) {
  const response = await request<API.Series>(`/series/${data?.id}`, {
    method: 'PATCH',
    baseURL: ADMIN_API_URL as string,
    data,
    ...(options || {}),
  });

  return { data: response };
}

export async function updateOrderSeries(
  data: API.UpdatePostOrder,
  options?: { [key: string]: any },
) {
  const response = await request<API.Series>(`/series/${data?.id}/update-order`, {
    method: 'PUT',
    baseURL: ADMIN_API_URL as string,
    data: data?.body,
    ...(options || {}),
  });

  return { data: response };
}
