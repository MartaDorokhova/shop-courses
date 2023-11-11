export interface ICart {
  count: number;
  courseId: number;
}

export interface IUser {
  email: string;
  name: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
  avatarUrl: string;
  resetToken: string;
  resetTokenExp: Date;
  cart: ICart;
  id: string;
}
