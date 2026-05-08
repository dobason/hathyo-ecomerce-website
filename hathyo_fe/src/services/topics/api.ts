// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { omit } from 'lodash';

export async function list(params?: API.TopicFilter, options?: { [key: string]: any }) {
  const response = await request<API.TopicResult>('/topics', {
    method: 'GET',
    baseURL: ADMIN_API_URL as string,
    params,
    ...(options || {}),
  });

  return { data: response };
}

export async function addTopic(data: API.Topic, options?: { [key: string]: any }) {
  const response = await request<API.Topic>('/topics', {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
    data: {
      name: data?.name,
      parentId: data?.topic,
    },
    ...(options || {}),
  });

  return { data: response };
}

export async function patchTopic(data: API.Topic, options?: { [key: string]: any }) {
  const response = await request<API.PostsResult>(`/topics/${data?.id}`, {
    method: 'PATCH',
    baseURL: ADMIN_API_URL as string,
    data: omit(data, 'id'),
    ...(options || {}),
  });

  return { data: response };
}

export async function deleteTopic(data: API.Topic, options?: { [key: string]: any }) {
  const response = await request<API.PostsResult>(`/topics/${data?.id}`, {
    method: 'DELETE',
    baseURL: ADMIN_API_URL as string,
    ...(options || {}),
  });

  return { data: response };
}
