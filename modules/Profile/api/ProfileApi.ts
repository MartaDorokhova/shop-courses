import { AxiosResponse } from "axios";
import api from "@core/http";
import { IUser } from "../models/interfaces";

export default class ProfilehApi {
  static async fetchUser(): Promise<AxiosResponse<IUser>> {
    return api.get<IUser>("/profile");
  }
}
