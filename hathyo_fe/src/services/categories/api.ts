// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

const response = await request(`${ADMIN_API_URL}/posts`, {
  method: 'GET',
});

export async function list(params?: API.CateFilter, options?: { [key: string]: any }) {
  const response = await request<API.CateResult>('/shop-categories', {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    params,
    ...(options || {}),
  });

  return { data: response };
}

export async function addCate(data: API.Category, options?: { [key: string]: any }) {
  const response = await request<API.Category>('/shop-categories', {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data: {
      name: data?.name,
      parentId: data?.parentId,
      slug: data?.name,
    },
    ...(options || {}),
  });

  return { data: response };
}

// export async function patchCate(data: API.Topic, options?: { [key: string]: any }) {
//   const response = await request<API.PostsResult>(`/topics/${data?.id}`, {
//     method: 'PATCH',
//     baseURL: ADMIN_API_URL as string,
//     data: omit(data, 'id'),
//     ...(options || {}),
//   });

//   return { data: response };
// }

export async function deleteCate(data: API.Category, options?: { [key: string]: any }) {
  const response = await request<API.Category>(`/shop-categories/${data?.id}`, {
    method: 'DELETE',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}
