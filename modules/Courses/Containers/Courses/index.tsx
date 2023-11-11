import Layout from "@modules/ui/Layout";
import { Typography } from "@mui/material";
import { CoursesList } from "../../ui/CoursesList.tsx";

const CoursesContainer = () => {
  return (
    <Layout title="Курсы">
      <Typography variant="h4" component="div" gutterBottom>
        Курсы
      </Typography>
      <CoursesList />
    </Layout>
  );
};

export default CoursesContainer;
