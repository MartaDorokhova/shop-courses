import { FC } from "react";
import { Form } from "@shared/Form";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Layout from "@modules/ui/Layout";
import formContent from "@modules/Auth/consts/reset-form-const";
import { ETypeForm } from "@shared/Form/models/enums";
import { TResetParams } from "@modules/Auth/models/types";
import { useAppDispatch } from "@core/hooks/redux";
import { reset } from "@modules/auth/reducer/actions";
import { useSelector } from "react-redux";
import { getStatusSendMail } from "@modules/Auth/reducer/selectors";

const Reset: FC = () => {
  const sendMail = useSelector(getStatusSendMail);
  const dispatch = useAppDispatch();

  const handleSubmitForm = (data: TResetParams) => {
    dispatch(reset(data));
  };

  return (
    <Layout title="Сброс пароля">
      <Typography variant="h4" component="div" gutterBottom>
        Сброс пароля
      </Typography>
      {sendMail ? (
        <Alert severity="success">
          Письмо отправлено! Проверьте Вашу почту
        </Alert>
      ) : (
        <Form
          onSubmitForm={handleSubmitForm}
          formContent={formContent}
          typeForm={ETypeForm.RESET}
        />
      )}
    </Layout>
  );
};

export default Reset;
