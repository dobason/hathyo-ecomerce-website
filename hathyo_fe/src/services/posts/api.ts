// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { get, isEmpty, isString, map, omit, pick } from 'lodash';

export async function productRelatedPost(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.Post>(`/posts/${params?.id}/products`, {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function deleteProductRelatedPost(data: any, options?: { [key: string]: any }) {
  const response = await request<any>(`/posts/${data?.id}/products/${data?.productId}`, {
    method: 'DELETE',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function addProductRelatedPost(data: any, options?: { [key: string]: any }) {
  const response = await request<any>(`/posts/${data?.id}/product?productId=${data?.productId}`, {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function detailPost(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.Post>(`/posts/${params?.id}`, {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function post(params: API.PageParams, options?: { [key: string]: any }) {
  const response = await request<API.PostsResult>('/posts', {
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

export async function deletePost(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.PostsResult>(`/posts/${params?.id}`, {
    method: 'DELETE',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}

export async function addPost(data: API.PostFormValue, options?: { [key: string]: any }) {
  const { data: responseUpload } = await upload({ file: data?.fileUpload[0].originFileObj });
  if (isEmpty(responseUpload?.links)) {
    throw new Error('Có lỗi xảy ra trong quá trình upload thumbnail');
  }

  const payload = {
    ...pick(data, [
      'title',
      'content',
      'topic',
      'themeQuestion',
      'draft',
      'series',
      'description',
      'indexOfContent',
    ]),
    permalink: responseUpload?.links?.permalink,
    thumbnail: responseUpload?.links?.thumbnail,
    // permalink: '',
    // thumbnail: '',
    tags: map(data?.tags, (item) => (isString(item) ? { name: item } : { id: item })),
  };
  const response = await request<API.PostsResult>('/posts', {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data: payload,
    ...(options || {}),
  });

  return { data: response };
}

export async function patchPost(data: API.PostFormValue, options?: { [key: string]: any }) {
  let payload = {
    ...pick(data, ['title', 'content', 'topic', 'themeQuestion', 'description', 'indexOfContent']),
    series: data?.series || null,
    permalink: data?.permalink,
    thumbnail: data?.thumbnail,
    tags: map(data?.tags, (item) => (isString(item) ? { name: item } : { id: item })),
  };

  if (get(data, 'fileUpload.0.name')) {
    const { data: responseUpload } = await upload({ file: data?.fileUpload[0].originFileObj });
    if (isEmpty(responseUpload?.links)) {
      throw new Error('Có lỗi xảy ra trong quá trình upload thumbnail');
    }

    payload = {
      ...payload,
      permalink: responseUpload?.links?.permalink,
      thumbnail: responseUpload?.links?.thumbnail,
    };
  }

  const response = await request<API.PostsResult>(`/posts/${data?.id}`, {
    method: 'PATCH',
    baseURL: ADMIN_API_URL as string,
    data: payload,
    ...(options || {}),
  });

  return { data: response };
}

export async function patchStatus(data: API.PatchStatusValue, options?: { [key: string]: any }) {
  const response = await request<API.PostsResult>(`/posts/${data?.id}/status`, {
    method: 'POST',
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
