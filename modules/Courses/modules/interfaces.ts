export interface ICourse {
  _id: string;
  title: string;
  price: number;
  img: string;
  userId: string;
}

export interface ICoursesResponse {
  courses: ICourse[];
}

export interface ICourseResponseResponse {
  course: ICourse;
}

export interface IInitialStateCourses {
  courses: ICoursesResponse | null;
  isLoading: boolean;
  errors: unknown;
}

export interface ISingleCourseInitialState
  extends Omit<IInitialStateCourses, "courses"> {
  courseSingle: ICourse | null;
  saveCourse: boolean;
  editCourse: boolean;
  removeCourse: boolean;
}

export interface IEditCourseResponse {
  editCourse: boolean;
}

export interface IAddCourseResponse {
  saveCourse: boolean;
}

export interface IRemoveCourseResponse {
  removeCourse: boolean;
}
