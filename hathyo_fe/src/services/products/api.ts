// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { get, isEmpty, omit } from 'lodash';

export async function productSearch(params: any, options?: { [key: string]: any }) {
  const response = await request<any>('products', {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    params: { ...params, size: 20 },
    ...(options || {}),
  });

  return { data: response };
}

export async function detailProduct(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.Product>(`/products/${params?.id}`, {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function products(params: API.ProductsPageParams, options?: { [key: string]: any }) {
  const response = await request<API.ProductResult>('/products', {
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

export async function deleteProduct(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.Product>(`/products/${params?.id}`, {
    method: 'DELETE',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function addProduct(data: API.Product, options?: { [key: string]: any }) {
  const { data: responseUpload } =
    (await upload({
      file: data?.mainImageUrl && data?.mainImageUrl[0].originFileObj,
    })) || {};
  if (isEmpty(responseUpload?.links)) {
    throw new Error('Có lỗi xảy ra trong quá trình upload thumbnail');
  }

  const payload = {
    ...data,
    mainImageUrl: responseUpload?.links?.permalink,
  };
  const response = await request<API.PostsResult>('/products', {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data: payload,
    ...(options || {}),
  });

  return { data: response };
}

export async function patchProduct(data: API.Product, options?: { [key: string]: any }) {
  let payload = data;

  if (get(data, 'mainImageUrl.0.name')) {
    const { data: responseUpload } =
      (await upload({
        file: data?.mainImageUrl && data?.mainImageUrl[0].originFileObj,
      })) || {};
    if (isEmpty(responseUpload?.links)) {
      throw new Error('Có lỗi xảy ra trong quá trình upload thumbnail');
    }

    payload = {
      ...payload,

      mainImageUrl: responseUpload?.links?.permalink,
    };
  }

  const response = await request<API.PostsResult>(`/products`, {
    method: 'PATCH',
    baseURL: ADMIN_API_URL as string,
    data: payload,
    ...(options || {}),
  });

  return { data: response };
}

export async function patchStatus(data: API.PatchStatusValue, options?: { [key: string]: any }) {
  const response = await request<API.PostsResult>(`/products/${data?.id}/status`, {
    method: 'PATCH',
    baseURL: ADMIN_API_URL as string,
    data: omit(data, 'id'),
    ...(options || {}),
  });

  return { data: response };
}

export async function addHome(data: API.PatchStatusValue, options?: { [key: string]: any }) {
  const response = await request<API.PostsResult>(`/posts/add-to-homepage`, {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data: { postId: data?.id },
    ...(options || {}),
  });

  return { data: response };
}

export async function upload(
  data: {
    file: File | undefined;
  },
  options?: { [key: string]: any },
) {
  if (!data?.file) {
    return;
  }

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

export async function getSattisticProduct() {
  const response = await request<API.ProductStatistics>('/products/statistics', {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
  });

  return { data: response };
}
