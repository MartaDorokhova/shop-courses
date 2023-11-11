import { ETypeForm } from "@shared/Form/models/enums";
import * as yup from "yup";

export const schema = (typeForm: ETypeForm) => {
  switch (typeForm) {
    case ETypeForm.LOGIN:
      return yup.object().shape({
        email: yup
          .string()
          .matches(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+/, "Некорректный  Email")
          .required("Поле должно быть заполненно"),
        password: yup
          .string()
          .min(6, "Минимум 6 символов")
          .max(56, "Максимум 56 символов")
          .required("Поле должно быть заполненно"),
      });
    case ETypeForm.REGISTRATION:
      return yup.object().shape({
        email: yup
          .string()
          .matches(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+/, "Некорректный  Email")
          .required("Поле должно быть заполненно"),
        name: yup
          .string()
          .min(3, "Минимум 6 символов")
          .required("Поле должно быть заполненно"),
        password: yup
          .string()
          .min(6, "Минимум 6 символов")
          .max(56, "Максимум 56 символов")
          .required("Поле должно быть заполненно"),
        confirm: yup
          .string()
          .oneOf([yup.ref("password")], "Пароли не совпадают"),
      });
    case ETypeForm.RESET:
      return yup.object().shape({
        email: yup
          .string()
          .matches(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+/, "Некорректный  Email")
          .required("Поле должно быть заполненно"),
      });
    case ETypeForm.RESETPWD:
      return yup.object().shape({
        password: yup
          .string()
          .min(6, "Минимум 6 символов")
          .max(56, "Максимум 56 символов")
          .required("Поле должно быть заполненно"),
      });
    case ETypeForm.EDIT_COURSE:
    case ETypeForm.ADD_COURSE:
      return yup.object().shape({
        title: yup
          .string()
          .min(3, "Минимум 3 символов")
          .required("Поле должно быть заполненно"),
        img: yup
          .string()
          .matches(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
            "Должна быть ссылка на картинку"
          )
          .required("Поле должно быть заполненно"),
        price: yup
          .number()
          .min(1, "Введите цену")
          .required("Поле должно быть заполненно")
          .typeError("Только числа"),
      });
  }
};
