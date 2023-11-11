export type TRegistrationParams = {
  email: string;
  password: string;
  name: string;
  confirm: string;
};

export type TLoginParams = Omit<TRegistrationParams, "confirm" | "name">;
export type TResetParams = Omit<
  TRegistrationParams,
  "confirm" | "name" | "password"
>;

export type TResetPwdParams = {
  password: string;
  token: string;
};

export type TCheckTokenResetPwdParams = Omit<TResetPwdParams, "password">;
