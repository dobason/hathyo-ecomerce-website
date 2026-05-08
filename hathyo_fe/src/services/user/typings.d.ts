// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    authorities: string[];
    id: string;
    email: string;
    avatar: string;
    fullName: string;
  };

  type LoginResult = {
    accessToken?: string;
    refreshToken?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ChangePasswordParams = {
    currentPassword: string;
    newPassword: string;
    confirmationPassword: string;
  };

  type RegisterParams = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: string[];
  };

  type RegisterResult = {
    currentPassword: string;
    newPassword: string;
    confirmationPassword: string;
  };
}
