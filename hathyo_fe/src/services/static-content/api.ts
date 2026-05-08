// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function detailContent(params: { code: string }, options?: { [key: string]: any }) {
  const response = await request<API.Content>(`/static-content/detail`, {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    params,
    ...(options || {}),
  });

  return { data: response };
}

export async function content(params: API.PageContentParams, options?: { [key: string]: any }) {
  const response = await request<API.ContentsResult>('/static-content/list', {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data: {
      page: Number(params?.page) || 0,
      size: Number(params?.size) || 20,
    },
    ...(options || {}),
  });

  return { data: response };
}

export async function addContent(data: API.ContentFormValue, options?: { [key: string]: any }) {
  const payload = {
    code: data.code,
    title: data.title,
    description: data.description,
    attachment: null,
  };

  const response = await request<API.ContentsResult>('/static-content/create', {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data: payload,
    ...(options || {}),
  });

  return { data: response };
}

export async function patchContent(data: API.ContentFormValue, options?: { [key: string]: any }) {
  const payload = {
    code: data.code,
    title: data.title,
    description: data.description,
    attachment: null,
  };

  const response = await request<API.ContentsResult>(`/static-content/update`, {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data: payload,
    ...(options || {}),
  });

  return { data: response };
}

export async function upload(data: { file: File }, options?: { [key: string]: any }) {
  const formData = new FormData();
  formData.append('file', data?.file);

  const response = await request<API.UploadResult>('/files/upload', {
    method: 'POST',
    baseURL: 'https://api.hathyo.com/admin/api/v1',
    headers: { contentType: 'multipart/form-data' },
    data: formData,
    ...(options || {}),
  });

  return { data: response };
}
