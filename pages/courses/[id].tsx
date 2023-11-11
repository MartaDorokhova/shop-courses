import { GetServerSideProps } from "next";
import CourseSingleContainer from "@modules/Courses/Containers/CourseSingle";
import axios from "axios";
import { API_URL } from "@core/http";
import { ICourseResponseResponse } from "@modules/Courses/modules/interfaces";
import { useAsyncSlice } from "@core/store";
import { CourseSingleSlice } from "@modules/Courses/reducer/CoursesSlice";

const CourseSingle = ({ course }: ICourseResponseResponse) => {
  useAsyncSlice({ courseSingle: CourseSingleSlice }, course);

  return <CourseSingleContainer />;
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

export default CourseSingle;
