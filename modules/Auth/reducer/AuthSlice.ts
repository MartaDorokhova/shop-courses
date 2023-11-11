import { createSlice } from "@reduxjs/toolkit";
import { IAuthInitialState } from "../models/interfaces";
import {
  checkTokenForResetPwd,
  login,
  logout,
  refresh,
  registration,
  reset,
  resetPwd,
} from "./actions";

const initialState: IAuthInitialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  sendMail: false,
  errors: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.isLoading = false;
      state.errors = null;
      Object.assign(state, {
        user: {
          email: payload.user.email,
          id: payload.user.id,
          isActivated: payload.user.isActivated,
        },
      });
    });

    builder.addCase(login.rejected, (state, { payload }) => {
      state.errors = payload;
      state.isLoading = false;
    });

    builder.addCase(registration.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = "Ошибка"; // todo
    });

    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false;
      state.isLoading = false;
      state.errors = null;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.errors = "Ошибка"; // todo
    });

    builder.addCase(refresh.pending, (state, action) => {});
    builder.addCase(refresh.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.errors = null;
      Object.assign(state, {
        user: {
          email: payload.user.email,
          id: payload.user.id,
          isActivated: payload.user.isActivated,
        },
      });
    });

    builder.addCase(refresh.rejected, (state, action) => {
      state.errors = "Ошибка"; // todo
    });

    builder.addCase(reset.fulfilled, (state, { payload }) => {
      Object.assign(state, {
        sendMail: payload.sendMail,
        token: payload.token,
      });
    });

    builder.addCase(reset.rejected, (state, { payload }) => {
      state.errors = payload;
    });

    builder.addCase(resetPwd.fulfilled, (state, { payload }) => {
      Object.assign(state, {
        resetPwd: payload.resetPwd,
      });
    });

    builder.addCase(resetPwd.rejected, (state, { payload }) => {
      Object.assign(state, {
        errors: { field: "password", message: payload.response.data.error },
      });
    });
    builder.addCase(checkTokenForResetPwd.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(checkTokenForResetPwd.fulfilled, (state, { payload }) => {
      Object.assign(state, {
        checkStatusToken: payload.checkStatusToken,
      });
      state.isLoading = false;
    });

    builder.addCase(checkTokenForResetPwd.rejected, (state, action) => {
      state.errors = "Ошибка"; // todo
    });
  },
});
export default AuthSlice.reducer;
