import { GetServerSideProps } from "next";
import CoursesContainer from "@modules/Courses/Containers/Courses";
import axios from "axios";
import { API_URL } from "@core/http";
import { ICoursesResponse } from "@modules/Courses/modules/interfaces";
import { useAsyncSlice } from "@core/store";
import { CoursesSlice } from "@modules/Courses/reducer/CoursesSlice";

const Courses = ({ courses }: ICoursesResponse) => {
  useAsyncSlice({ courses: CoursesSlice }, courses);

  return <CoursesContainer />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get<ICoursesResponse>(`${API_URL}/courses`, {
    withCredentials: true,
  });
  return {
    props: {
      courses: res.data,
    },
  };
};

export default Courses;
