import * as slices from "./CoursesSlice";
import * as actions from "./actions";

export const reducers = {
  courses: slices.CoursesSlice.reducer,
  courseSingle: slices.CourseSingleSlice.reducer,
};

export { actions };
