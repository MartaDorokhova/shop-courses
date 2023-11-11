import { RootState } from "@core/store";
import { createSelector } from "@reduxjs/toolkit";

export const getStatusSendMail = createSelector(
  (state: RootState) => state.auth.sendMail,
  (sendMail) => sendMail
);

export const getInputErrors = createSelector(
  (state: RootState) => state.auth.errors,
  (errors) => {
    if (errors?.type === "formError") {
      return errors.inputError;
    }
  }
);

export const getStatusResetPwd = createSelector(
  (state: RootState) => state.auth.resetPwd,
  (resetPwd) => resetPwd
);
export const getStatusStatusTokenResetPwd = createSelector(
  (state: RootState) => state.auth.checkStatusToken,
  (checkStatusToken) => checkStatusToken
);
export const getIsLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  (isLoading) => isLoading
);

export const getAuthUserId = createSelector(
  (state: RootState) => state.auth.user?.id,
  (id) => id
);

export const getIsAuth = createSelector(
  (state: RootState) => state.auth.isAuth,
  (isAuth) => isAuth
);
