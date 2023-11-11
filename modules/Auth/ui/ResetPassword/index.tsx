import { FC, useEffect } from "react";
import { Form } from "@shared/Form";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Layout from "@modules/ui/Layout";
import formContent from "@modules/Auth/consts/resetPwd-form-const";
import { ETypeForm } from "@shared/Form/models/enums";
import { TResetPwdParams } from "@modules/Auth/models/types";
import { useAppDispatch } from "@core/hooks/redux";
import { resetPwd, checkTokenForResetPwd } from "@modules/auth/reducer/actions";
import { useSelector } from "react-redux";
import {
  getStatusResetPwd,
  getStatusStatusTokenResetPwd,
  getIsLoading,
} from "@modules/Auth/reducer/selectors";
import { useRouter } from "next/router";

const ResetPwd: FC = () => {
  const resetPwdStatus = useSelector(getStatusResetPwd);
  const checkStatusToken = useSelector(getStatusStatusTokenResetPwd);
  const isLoading = useSelector(getIsLoading);

  const dispatch = useAppDispatch();
  const {
    query: { slug },
  } = useRouter();

  const handleSubmitForm = (data: TResetPwdParams) => {
    dispatch(resetPwd(Object.assign(data, { token: slug })));
  };

  useEffect(() => {
    if (slug) {
      dispatch(
        checkTokenForResetPwd({
          token: slug,
        })
      );
    }
  }, [slug]);

  return (
    <Layout title="Сброс пароля">
      {checkStatusToken || !isLoading ? (
        <>
          <Typography variant="h4" component="div" gutterBottom>
            Введите новый пароль
          </Typography>
          {resetPwdStatus ? (
            <Alert severity="success">Пароль обновлен</Alert>
          ) : (
            <Form
              onSubmitForm={handleSubmitForm}
              formContent={formContent}
              typeForm={ETypeForm.RESETPWD}
            />
          )}
        </>
      ) : (
        <Alert severity="error">Неверный токен</Alert>
      )}
    </Layout>
  );
};

export default ResetPwd;
