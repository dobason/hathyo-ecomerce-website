// @ts-ignore
/* eslint-disable */
import { jwtDecode } from '@/utils/func';
import { request } from '@umijs/max';
import Cookies from 'js-cookie';
import get from 'lodash/get';

export async function currentUser() {
  const accessToken = await Cookies.get('accessToken');
  if (accessToken) {
    // await request<API.LoginResult>('/auth/refresh-token', {
    //   method: 'Post',
    //   baseURL: AUTH_API_URL as string,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });

    const decoded = await jwtDecode(accessToken);

    return {
      authorities: get(decoded, 'authorities', []),
      id: get(decoded, 'userId', ''),
      fullName: get(decoded, 'fullName', ''),
      email: get(decoded, 'sub', ''),
      avatar: get(decoded, 'avatar', ''),
    } as API.CurrentUser | undefined;
  }
  return undefined;
}

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/auth/signin', {
    method: 'POST',
    baseURL: AUTH_API_URL as string,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.RegisterResult>('/auth/signup', {
    method: 'POST',
    baseURL: AUTH_API_URL as string,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function changePassword(
  body: API.ChangePasswordParams,
  options?: { [key: string]: any },
) {
  return request<API.LoginResult>('/auth/signin', {
    method: 'POST',
    baseURL: AUTH_API_URL as string,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
