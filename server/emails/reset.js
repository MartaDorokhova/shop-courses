const keys = require("../keys");

module.exports = function (email, token) {
  return {
    from: "Восстановить пароль <shop-courses@yandex.ru>",
    to: email,
    subject: "Восстановить пароль",
    text: "Восстановить пароль",
    html: `<h1>Забыли пароль?</h1>
    <p>Нажите на ссылку: <a href="${keys.BASE_URL}/auth/password/${token}">Восстановить пароль</a> </p>
    `,
  };
};
