import { clientFetch } from "@/services/clientServices";
import { RequestConfig } from "@/types";

export const sendOtpEmail = (newEmail: string) => {
  return clientFetch(
    `/users/get-changeEmail-key?newEmail=${encodeURIComponent(newEmail)}`,
    {
      method: "POST",
      baseUrl: process.env.API_URL,
    }
  ) as any;
};

export const updateEmailWithKey = (newEmail: string, key: string) => {
  return clientFetch(`/users/update-email`, {
    method: "PATCH",
    baseUrl: process.env.API_URL,
    body: { newEmail, key },
  }) as any;
};

export const sendOtpAPI = (config?: RequestConfig) => {
  return clientFetch(`/sms/send-otp`, {
    method: "POST",
    ...config,
    baseUrl: process.env.API_URL,
  }) as any;
};

export const updatePhoneWithKey = (config?: RequestConfig) => {
  return clientFetch(`/users/update-phone`, {
    method: "PATCH",
    ...config,
    baseUrl: process.env.API_URL,
  }) as any;
};

export const signupAPI = (config?: RequestConfig) => {
  return clientFetch(`/auth/signup`, {
    method: "POST",
    ...config,
    baseUrl: process.env.AUTH_API_URL,
  }) as any;
};
export const sentActivation = (config?: RequestConfig) => {
  return clientFetch(`/auth/send-activation`, {
    method: "POST",
    ...config,
    baseUrl: process.env.AUTH_API_URL,
  }) as any;
};
export const sentActivationForgotPass = (config?: RequestConfig) => {
  return clientFetch(`/auth/send-reset-password`, {
    method: "POST",
    ...config,
    baseUrl: process.env.AUTH_API_URL,
  }) as any;
};
export const resentActivation = (config?: RequestConfig) => {
  return clientFetch(`/auth/resend-activation`, {
    method: "POST",
    ...config,
    baseUrl: process.env.AUTH_API_URL,
  }) as any;
};

export const activate = (config?: RequestConfig) => {
  return clientFetch(`/auth/activate`, {
    method: "POST",
    ...config,
    baseUrl: process.env.AUTH_API_URL,
  }) as any;
};

export const signIn = (config?: RequestConfig) => {
  return clientFetch(`/auth/signin`, {
    method: "POST",
    ...config,
    baseUrl: process.env.AUTH_API_URL,
  }) as any;
};

export const createPassword = (config?: RequestConfig) => {
  return clientFetch(`/auth/init-password`, {
    method: "POST",
    baseUrl: process.env.AUTH_API_URL,
    ...config,
  }) as any;
};

export const resetPassword = (config?: RequestConfig) => {
  return clientFetch(`/auth/reset-password`, {
    method: "POST",
    baseUrl: process.env.AUTH_API_URL,
    ...config,
  }) as any;
};

export const getUser = (config?: RequestConfig) => {
  return clientFetch(`/users/profile`, {
    method: "GET",
    ...config,
  }) as any;
};

export const updateUser = (config?: RequestConfig) => {
  return clientFetch(`/users/update-profile`, {
    method: "PATCH",
    ...config,
  }) as any;
};
