// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getReport() {
  const response = await request<API.ReportType>('/report', {
    method: 'POST',
    baseURL: ADMIN_API_URL as string,
  });

  return { data: response };
}
