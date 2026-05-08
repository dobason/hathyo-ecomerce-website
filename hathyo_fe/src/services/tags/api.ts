// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function list(
  params: {
    query: string;
  },
  options?: { [key: string]: any },
) {
  if (params?.query) {
    const response = await request<API.TagResult>('/tags/search', {
      params,
      method: 'GET',
      baseURL: ADMIN_API_URL as string,
      ...(options || {}),
    });

    return { data: response };
  }
  return { data: { tags: [] } };
}
