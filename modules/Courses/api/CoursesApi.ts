import api from "@core/http";
import { AxiosResponse } from "axios";
import {
  ICourse,
  IEditCourseResponse,
  IAddCourseResponse,
  IRemoveCourseResponse,
} from "../modules/interfaces";

export default class CoursesApi {
  static async editCourse(
    params: ICourse
  ): Promise<AxiosResponse<IEditCourseResponse>> {
    return api.post<IEditCourseResponse>("courses/edit", params);
  }

  static async addCourse(
    params: ICourse
  ): Promise<AxiosResponse<IAddCourseResponse>> {
    return api.post<IAddCourseResponse>("add", params);
  }

  static async removeCourse(id: {
    id: { id: string };
  }): Promise<AxiosResponse<IRemoveCourseResponse>> {
    return api.post<IRemoveCourseResponse>("courses/remove", id);
  }
}
