import { GetServerSideProps } from "next";
import EditCourseContainer from "@modules/Courses/Containers/EditCourse";
import { ICourseResponseResponse } from "@modules/Courses/modules/interfaces";
import axios from "axios";
import { API_URL } from "@core/http";
import { useAsyncSlice } from "@core/store";
import { CourseSingleSlice } from "@modules/Courses/reducer/CoursesSlice";

const EditCourses = ({ course }: ICourseResponseResponse) => {
  useAsyncSlice({ courseSingle: CourseSingleSlice }, course);

  return <EditCourseContainer />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get<ICourseResponseResponse>(
    `${API_URL}/courses/${ctx.query.id}`,
    {
      withCredentials: true,
    }
  );

  return {
    props: {
      course: res.data.course,
    },
  };
};

export default EditCourses;
