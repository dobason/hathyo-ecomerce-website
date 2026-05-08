import { UserAction } from "../types";

export const getUsersRequest = (): UserAction => ({
  type: "GET_USERS_REQUEST",
});

export const getUsersSuccess = (users: any[]): UserAction => ({
  type: "GET_USERS_SUCCESS",
  payload: users,
});

export const getUsersFailure = (error: string): UserAction => ({
  type: "GET_USERS_FAILURE",
  payload: error,
});
