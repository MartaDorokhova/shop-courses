import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Typography, Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { IForm } from "./models/interfaces";
import { ETypeForm } from "./models/enums";
import { schema } from "@shared/Form/schema";
import { useSelector } from "react-redux";
import { getInputErrors } from "@modules/Auth/reducer/selectors";
import { TInputError } from "./models/types";

export const Form: FC<IForm> = ({
  defaultValues,
  onSubmitForm,
  formContent,
  typeForm,
  onExtraHandler,
}) => {
  const serverErrors = useSelector(getInputErrors);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: defaultValues || {},
    resolver: yupResolver(schema(typeForm)),
  });

  const onSubmit = (data: unknown) => {
    onSubmitForm(data);
    reset();
  };

  useEffect(() => {
    if (serverErrors) {
      serverErrors.map((error: TInputError) => {
        setError(error.param, {
          message: error.msg,
        });
      });
    }
  }, [serverErrors]);

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      spacing={2}
      noValidate
      autoComplete="off"
    >
      {formContent?.map(({ name, type, label }) => (
        <TextField
          {...register(name)}
          fullWidth
          label={label}
          type={type}
          variant="standard"
          key={name}
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      ))}
      {typeForm === ETypeForm.LOGIN && (
        <Grid container>
          <Typography component="div" gutterBottom>
            Забыли пароль?
          </Typography>
          <Typography
            style={{ marginLeft: "4px" }}
            component="div"
            gutterBottom
          >
            <Link href="/auth/reset">
              <a>Сбросить</a>
            </Link>
          </Typography>
        </Grid>
      )}

      <Button disabled={!isValid} type="submit" variant="contained">
        Отправить
      </Button>
      {typeForm === ETypeForm.EDIT_COURSE && (
        <Button
          disabled={!isValid}
          color="error"
          type="button"
          variant="outlined"
          onClick={onExtraHandler}
        >
          Удалить
        </Button>
      )}
    </Stack>
  );
};
