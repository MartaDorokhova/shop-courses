import { IUser } from "@modules/Profile/models/interfaces";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface AuthResetResponse {
  sendMail: string;
  token: string;
}
export interface AuthResetPwdResponse {
  resetPwd: boolean;
}

export interface AuthStatusTokenForResetPwdResponse {
  checkStatusToken: boolean;
}

export interface IAuthInitialState {
  isAuth: boolean;
  isLoading: boolean;
  sendMail: boolean;
  user: IUser | null;
  errors: unknown;
}
