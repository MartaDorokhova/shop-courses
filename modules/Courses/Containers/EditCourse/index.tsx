import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "@modules/ui/Layout";
import { Alert, Typography } from "@mui/material";
import {
  getSingleCourse,
  getActionsCourse,
  getIsLoading,
} from "@modules/Courses/reducer/selectors";
import { Form } from "@shared/Form";
import { ETypeForm } from "@shared/Form/models/enums";
import { useAppDispatch } from "@core/hooks/redux";
import formContent from "@modules/Courses/consts/course-form-const";
import { getIsAuth } from "@modules/Auth/reducer/selectors";
import { editCourse, removeCourse } from "@modules/Courses/reducer/actions";

const EditCourse = () => {
  const course = useSelector(getSingleCourse);
  const isAuth = useSelector(getIsAuth);
  const { isEditCourse, isRemoveCourse } = useSelector(getActionsCourse);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmitForm = (data: any) => {
    dispatch(editCourse(data));
  };

  const handleRemoveCourse = () => {
    dispatch(removeCourse(course._id));
  };

  useEffect(() => {
    if (isEditCourse || isRemoveCourse) router.push("/courses");
  }, [isEditCourse, isRemoveCourse]);

  return (
    <Layout title={`Редактирование курса ${course.title}`}>
      <Typography variant="h4" component="div" gutterBottom>
        {`Редактирование курса ${course.title}`}
      </Typography>
      {isAuth && (
        <Form
          onSubmitForm={handleSubmitForm}
          defaultValues={course}
          typeForm={ETypeForm.EDIT_COURSE}
          formContent={formContent}
          onExtraHandler={handleRemoveCourse}
        />
      )}
    </Layout>
  );
};

export default EditCourse;
