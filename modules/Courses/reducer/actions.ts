import { makeError } from "@core/utils/makeError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import CoursesApi from "../api/CoursesApi";
import {
  IAddCourseResponse,
  ICourse,
  IEditCourseResponse,
  IRemoveCourseResponse,
} from "../modules/interfaces";

export const editCourse = createAsyncThunk<IEditCourseResponse, ICourse>(
  "courseSingle/editCourse",
  async (params, { rejectWithValue }) => {
    try {
      const response = await CoursesApi.editCourse(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(makeError(error));
    }
  }
);

export const addCourse = createAsyncThunk<IAddCourseResponse, ICourse>(
  "courseSingle/addCourse",
  async (params, { rejectWithValue }) => {
    try {
      const response = await CoursesApi.addCourse(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(makeError(error));
    }
  }
);

export const removeCourse = createAsyncThunk<
  IRemoveCourseResponse,
  { id: string }
>("courseSingle/removeCourse", async (id, { rejectWithValue }) => {
  try {
    const response = await CoursesApi.removeCourse({ id });
    return response.data;
  } catch (error) {
    return rejectWithValue(makeError(error));
  }
});
