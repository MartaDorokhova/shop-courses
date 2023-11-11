const { body } = require("express-validator/check");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Введите корректный Email")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("Такой пользователь уже есть");
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    })
    .normalizeEmail(),

  body("name", "Минимум 3 символа").isLength({ min: 3 }).trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Пароли должны совпадать");
      }
      return true;
    })
    .trim(),
  body("password", "Длинна от 6 до 56").isLength({ min: 6, max: 56 }).trim(),
];

exports.loginValidators = [
  body("email")
    .isEmail()
    .withMessage("Введите корректный Email")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject("Пользователь не найден");
        }
      } catch (error) {
        console.log(error);
      }
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6, max: 56 })
    .withMessage("Длинна от 6 до 56")
    .withMessage("Введите корректный пароль")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return Promise.reject("Пользователь не найден ( пароль )");

        const areSame = await bcrypt.compare(value, user.password);

        if (!areSame) {
          return Promise.reject("Пароли не совадают");
        }
      } catch (error) {
        console.log(error);
      }
    })
    .trim(),
];

exports.coursesValidators = [
  body("title").isLength({ min: 3 }).withMessage("Длинна от 3 символов").trim(),

  body("price", "Должно быть число").isNumeric(),
  body("img", "Введите url картинки").isURL(),
];
