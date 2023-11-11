import { useSelector } from "react-redux";
import Layout from "@modules/ui/Layout";
import { Typography } from "@mui/material";
import { getSingleCourse } from "@modules/Courses/reducer/selectors";
import CardSingleCourse from "@modules/Courses/ui/CardSingleCourse.tsx";

const CourseSingleContainer = () => {
  const course = useSelector(getSingleCourse);

  return (
    <Layout title={course.title}>
      <Typography variant="h4" component="div" gutterBottom>
        {course.title}
      </Typography>
      <CardSingleCourse course={course} />
    </Layout>
  );
};

export default CourseSingleContainer;
