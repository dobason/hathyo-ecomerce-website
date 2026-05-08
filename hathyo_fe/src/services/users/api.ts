import { request } from '@umijs/max';
import { UploadFile } from 'antd';
import { isEmpty, omit } from 'lodash';
import { upload } from '../posts/api';

// Domain models
export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: 'MALE' | 'FEMALE' | null;
  birthday: string | null;
  phone: string;
  ward: string;
  district: string;
  city: string;
  address: string;
  banned: boolean;
  avatar: string | null;
  identityImageFront?: string | null;
  identityImageBack?: string | null;
  businessLicense?: string | null;
}

// Extend for form uploads
export interface UserFormData extends User {
  fileUpload?: UploadFile[];
  identityImageFrontTempt?: UploadFile[];
  identityImageBackTempt?: UploadFile[];
  businessLicenseTempt?: UploadFile[];
}

const BASE = ADMIN_API_URL as string;

export async function detailUser(params: { id: string }, options?: Record<string, any>) {
  const response = await request<User>(`${BASE}/users/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
  return { data: response };
}

export async function getProfile(options?: Record<string, any>) {
  const response = await request<User>(`${BASE}/users/profile`, {
    method: 'GET',
    ...(options || {}),
  });
  return { data: response };
}

export async function listUsers(
  params: { page?: number; size?: number; q?: string },
  options?: Record<string, any>,
) {
  const response = await request<API.UserResponse>(`${BASE}/users`, {
    method: 'GET',
    params: {
      page: params.page ?? 1,
      size: params.size ?? 20,
      ...(params.q ? { q: params.q } : {}),
    },
    ...(options || {}),
  });
  return { data: response };
}

export async function patchStatus(
  params: { banned: boolean; userId: string },
  options?: Record<string, any>,
) {
  const response = await request<any>(`${BASE}/users/ban-user`, {
    method: 'PATCH',
    data: params,
    ...(options || {}),
  });
  return { data: response };
}

// Shared upload-handling logic

async function handleUploads(data: UserFormData): Promise<Partial<User>> {
  const payload: Partial<User> = { ...data };

  if (data.fileUpload?.[0]?.originFileObj) {
    const { data: uploadRes } = await upload({ file: data.fileUpload[0].originFileObj });
    if (isEmpty(uploadRes.links)) throw new Error('Upload avatar failed');
    payload.avatar = uploadRes.links.permalink;
  }
  if (data.identityImageBackTempt?.[0]?.originFileObj) {
    const { data: uploadRes } = await upload({
      file: data.identityImageBackTempt[0].originFileObj,
    });
    if (isEmpty(uploadRes.links)) throw new Error('Upload back ID failed');
    payload.identityImageBack = uploadRes.links.permalink;
  }
  if (data.identityImageFrontTempt?.[0]?.originFileObj) {
    const { data: uploadRes } = await upload({
      file: data.identityImageFrontTempt[0].originFileObj,
    });
    if (isEmpty(uploadRes.links)) throw new Error('Upload front ID failed');
    payload.identityImageFront = uploadRes.links.permalink;
  }
  if (data.businessLicenseTempt?.[0]?.originFileObj) {
    const { data: uploadRes } = await upload({ file: data.businessLicenseTempt[0].originFileObj });
    if (isEmpty(uploadRes.links)) throw new Error('Upload license failed');
    payload.businessLicense = uploadRes.links.permalink;
  }
  return payload;
}

export async function patchUser(data: UserFormData, options?: Record<string, any>) {
  const uploads = await handleUploads(data);
  console.log('HandleUploads result:', uploads);
  const cleaned = omit({ ...data, ...uploads }, [
    'fileUpload',
    'identityImageBackTempt',
    'identityImageFrontTempt',
    'businessLicenseTempt',
  ]);
  const response = await request<User>(`${BASE}/users/${data.id}`, {
    method: 'PATCH',
    data: cleaned,
    ...(options || {}),
  });
  return { data: response };
}

export async function updateProfile(data: UserFormData, options?: Record<string, any>) {
  const uploads = await handleUploads(data);

  const cleaned = omit({ ...data, ...uploads }, [
    'fileUpload',
    'identityImageBackTempt',
    'identityImageFrontTempt',
    'businessLicenseTempt',
    'id',
    'email',
    'wardId',
    'districtId',
    'provinceId',
    'phone',
  ]);
  console.log('Cleaned payload:', JSON.stringify(cleaned, null, 2));
  const response = await request<User>(`${BASE}/users/update-profile`, {
    method: 'PATCH',
    data: cleaned,
    ...(options || {}),
  });

  return { data: response };
}
