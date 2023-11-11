import { FC } from "react";
import { Form } from "@shared/Form";
import { Typography, Grid } from "@mui/material";
import Layout from "@modules/ui/Layout";
import formContent from "@modules/Auth/consts/login-form-const";
import Link from "next/link";
import { ETypeForm } from "@shared/Form/models/enums";
import { TRegistrationParams } from "@modules/Auth/models/types";
import { useAppDispatch } from "@core/hooks/redux";
import { login } from "@modules/auth/reducer/actions";

const Login: FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmitForm = (data: TRegistrationParams) => {
    dispatch(login(data));
  };

  return (
    <Layout title="Авторизация">
      <Typography variant="h4" component="div" gutterBottom>
        Авторизация
      </Typography>
      <Grid container>
        <Typography component="div" gutterBottom>
          Нет аккаунта?
        </Typography>
        <Typography style={{ marginLeft: "4px" }} component="div" gutterBottom>
          <Link href="/auth/registration">
            <a>Зарегистрироваться</a>
          </Link>
        </Typography>
      </Grid>

      <Form
        onSubmitForm={handleSubmitForm}
        formContent={formContent}
        typeForm={ETypeForm.LOGIN}
      />
    </Layout>
  );
};

export default Login;
