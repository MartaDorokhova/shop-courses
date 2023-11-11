import { useAppDispatch } from "@core/hooks/redux";
import { getIsAuth } from "@modules/Auth/reducer/selectors";
import Layout from "@modules/ui/Layout";
import { Typography } from "@mui/material";
import { Form } from "@shared/Form";
import { ETypeForm } from "@shared/Form/models/enums";
import { useSelector } from "react-redux";
import formContent from "@modules/Courses/consts/course-form-const";
import { addCourse } from "@modules/Courses/reducer/actions";
import { getActionsCourse } from "@modules/Courses/reducer/selectors";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const AddCourseContainer = () => {
  const isAuth = useSelector(getIsAuth);
  const { isSaveCourse } = useSelector(getActionsCourse);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmitForm = (data: any) => {
    dispatch(addCourse(data));
  };
  console.log(isSaveCourse);

  useEffect(() => {
    if (isSaveCourse) router.push("/courses");
  }, [isSaveCourse]);

  return (
    <Layout title="Добавление курса">
      <Typography variant="h4" component="div" gutterBottom>
        Добавление курса
      </Typography>
      {isAuth && (
        <Form
          onSubmitForm={handleSubmitForm}
          typeForm={ETypeForm.ADD_COURSE}
          formContent={formContent}
        />
      )}
    </Layout>
  );
};
