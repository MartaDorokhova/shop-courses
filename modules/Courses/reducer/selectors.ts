import { RootState } from "@core/store";
import { createSelector } from "@reduxjs/toolkit";

export const getCourses = createSelector(
  (state: RootState) => state.courses,
  ({ courses }) => {
    return courses;
  }
);

export const getSingleCourse = createSelector(
  (state: RootState) => state.courseSingle,
  ({ courseSingle }) => {
    return courseSingle;
  }
);

export const getActionsCourse = createSelector(
  (state: RootState) => state.courseSingle,
  (courseSingle) => {
    return {
      isSaveCourse: courseSingle?.saveCourse,
      isEditCourse: courseSingle?.editCourse,
      isRemoveCourse: courseSingle?.removeCourse,
    };
  }
);

export const getIsLoading = createSelector(
  (state: RootState) => state.courseSingle.isLoading,
  (isLoading) => {
    return isLoading;
  }
);
