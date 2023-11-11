import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICourseResponseResponse,
  ICoursesResponse,
  IInitialStateCourses,
  ISingleCourseInitialState,
} from "../modules/interfaces";
import { addCourse, editCourse, removeCourse } from "./actions";

const coursesInitialState: IInitialStateCourses = {
  courses: null,
  isLoading: false,
  errors: null,
};

const singleCourseInitialState: ISingleCourseInitialState = {
  isLoading: false,
  errors: null,
  courseSingle: null,
  saveCourse: false,
  editCourse: false,
  removeCourse: false,
};

const prepareCoursesState = (
  state: IInitialStateCourses,
  { payload }: PayloadAction<ICoursesResponse>
) => {
  const { courses } = payload;
  Object.assign(state, {
    courses,
  });
};

const prepareCourseSingleState = (
  state: ISingleCourseInitialState,
  { payload }: PayloadAction<ICourseResponseResponse>
) => {
  Object.assign(state, {
    courseSingle: payload,
  });
};

export const CoursesSlice = createSlice({
  name: "courses",
  initialState: coursesInitialState,
  reducers: { resetState: prepareCoursesState },
  extraReducers: (builder) => {},
});

export const CourseSingleSlice = createSlice({
  name: "courseSingle",
  initialState: singleCourseInitialState,
  reducers: { resetState: prepareCourseSingleState },
  extraReducers: (builder) => {
    builder.addCase(editCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editCourse.fulfilled, (state, { payload }) => {
      const { editCourse } = payload;
      Object.assign(state, { editCourse });
      state.isLoading = false;
    });
    builder.addCase(editCourse.rejected, (state, { payload }) => {
      state.errors = payload;
      state.isLoading = false;
    });

    builder.addCase(addCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addCourse.fulfilled, (state, { payload }) => {
      const { saveCourse } = payload;
      Object.assign(state, { saveCourse });
      state.isLoading = false;
    });
    builder.addCase(addCourse.rejected, (state, { payload }) => {
      state.errors = payload;
      state.isLoading = false;
    });

    builder.addCase(removeCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeCourse.fulfilled, (state, { payload }) => {
      const { removeCourse } = payload;
      Object.assign(state, { removeCourse });
      state.isLoading = false;
    });
    builder.addCase(removeCourse.rejected, (state, { payload }) => {
      state.errors = payload;
      state.isLoading = false;
    });
  },
});
