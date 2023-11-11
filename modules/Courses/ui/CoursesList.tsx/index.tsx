import { FC } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { CardCourses } from "../CardCourses";
import { getCourses } from "../../reducer/selectors";
import { ICourse } from "@modules/Courses/modules/interfaces";
import { getAuthUserId } from "@modules/Auth/reducer/selectors";

export const CoursesList: FC = () => {
  const courses = useSelector(getCourses);
  const authUserId = useSelector(getAuthUserId);

  return (
    <Grid>
      {courses.map((course: ICourse) => (
        <CardCourses key={course._id} course={course} authUserId={authUserId} />
      ))}
    </Grid>
  );
};
