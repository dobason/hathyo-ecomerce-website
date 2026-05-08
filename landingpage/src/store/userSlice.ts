// src/store/userInfoSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiError } from "@/types";
import { User } from "@/types/user";
import { toast } from "react-toastify";
import { getUser, updateUser } from "@/services/client/auth";
import {
  sendOtpEmail,
  updateEmailWithKey,
  sendOtpAPI,
  updatePhoneWithKey,
} from "@/services/client/auth";

export const sentOtpEmail = createAsyncThunk(
  "user/sentOtpEmail",
  async (newEmail: string, { rejectWithValue }) => {
    try {
      const res = await sendOtpEmail(newEmail);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Gửi OTP thất bại");
    }
  }
);

export const sendPhoneVerificationOtp = createAsyncThunk(
  "user/sendOtpAPI",
  async (newPhone: string, { rejectWithValue }) => {
    try {
      const res = await sendOtpAPI({
        params: { phoneNumber: newPhone },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Gửi OTP thất bại");
    }
  }
);

export const changeEmail = createAsyncThunk(
  "user/changeEmail",
  async (
    { newEmail, key }: { newEmail: string; key: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateEmailWithKey(newEmail, key);
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Cập nhật email thất bại"
      );
    }
  }
);

export const changePhone = createAsyncThunk(
  "user/changePhone",
  async (
    { newPhone, otp }: { newPhone: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await updatePhoneWithKey({
        body: {
          newPhone,
          otp,
        },
      });
      return res;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "";
      if (errorMessage.includes("already exists")) {
        return rejectWithValue("Số điện thoại này đã tồn tại");
      }
      return rejectWithValue("Cập nhật số điện thoại thất bại");
    }
  }
);

interface UserState {
  userInfo?: User;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  userInfo: undefined,
  status: "idle",
};

export const fetchUserInfo = createAsyncThunk<
  User,
  undefined,
  { rejectValue: ApiError }
>("user/fetchUserInfo", async (_, { rejectWithValue }) => {
  try {
    const response = await getUser();
    return response;
  } catch (error: any) {
    const err: ApiError = error.response.data;
    return rejectWithValue(err);
  }
});

export const updateUserProfile = createAsyncThunk<User, User>(
  "user/updateUserInfo",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateUser({
        body: item,
      });
      if (!response.id) {
        return rejectWithValue(response.message);
      }
      await dispatch(fetchUserInfo());
      toast.success("Lưu thay đổi thông tin thành công");
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { updateUserInfo, clearUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
