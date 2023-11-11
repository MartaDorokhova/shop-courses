import { API_URL } from "@core/http";
import {
  AuthResetPwdResponse,
  AuthResetResponse,
  AuthResponse,
  AuthStatusTokenForResetPwdResponse,
} from "@modules/Auth/models/interfaces";
import { makeError } from "@core/utils/makeError";
import AuthApi from "@modules/Auth/api/AuthApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  TCheckTokenResetPwdParams,
  TLoginParams,
  TRegistrationParams,
  TResetParams,
  TResetPwdParams,
} from "../models/types";

export const login = createAsyncThunk<AuthResponse, TLoginParams>(
  "auth/login",
  async (params, { rejectWithValue }) => {
    try {
      const response = await AuthApi.login(params);
      localStorage.setItem("token", response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(makeError(error));
    }
  }
);

export const registration = createAsyncThunk<AuthResponse, TRegistrationParams>(
  "auth/registration",
  async (params, { rejectWithValue }) => {
    try {
      const response = await AuthApi.registration(params);
      localStorage.setItem("token", response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthApi.logout();
      localStorage.removeItem("token");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<AuthResponse>(
        `${API_URL}/auth/refresh`,
        { withCredentials: true }
      );
      localStorage.setItem("token", response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const reset = createAsyncThunk<AuthResetResponse, TResetParams>(
  "auth/reset",
  async (params, { rejectWithValue }) => {
    try {
      const response = await AuthApi.reset(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(makeError(error));
    }
  }
);
export const resetPwd = createAsyncThunk<AuthResetPwdResponse, TResetPwdParams>(
  "auth/resetPwd",
  async (params, { rejectWithValue }) => {
    try {
      const response = await AuthApi.resetPwd(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkTokenForResetPwd = createAsyncThunk<
  AuthStatusTokenForResetPwdResponse,
  TCheckTokenResetPwdParams
>("auth/checkTokenForResetPwd", async (params, { rejectWithValue }) => {
  try {
    const response = await axios.get<AuthStatusTokenForResetPwdResponse>(
      `${API_URL}/auth/password/${params.token}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
