import { FC } from "react";
import { Form } from "@shared/Form";
import { Grid, Typography } from "@mui/material";
import Layout from "@modules/ui/Layout";
import formContent from "@modules/Auth/consts/registration-form-const";
import Link from "next/link";
import { ETypeForm } from "@shared/Form/models/enums";
import { useAppDispatch } from "@core/hooks/redux";
import { registration } from "@modules/auth/reducer/actions";
import { TRegistrationParams } from "@modules/Auth/models/types";

const Registration: FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmitForm = (data: TRegistrationParams) => {
    dispatch(registration(data));
  };

  return (
    <Layout title="Регистрация">
      <Typography variant="h4" component="div" gutterBottom>
        Регистрация
      </Typography>
      <Grid container>
        <Typography component="div" gutterBottom>
          Есть аккаунт?
        </Typography>
        <Typography style={{ marginLeft: "4px" }} component="div" gutterBottom>
          <Link href="/auth/login">
            <a>Авторизоваться</a>
          </Link>
        </Typography>
      </Grid>

      <Form
        onSubmitForm={handleSubmitForm}
        formContent={formContent}
        typeForm={ETypeForm.REGISTRATION}
      />
    </Layout>
  );
};

export default Registration;
