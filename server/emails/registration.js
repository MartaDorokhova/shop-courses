const keys = require("../keys");

module.exports = function (email, link) {
  return {
    from: '"Node js" <shop-courses@yandex.ru>',
    to: email,
    subject: `Активация на сайте ${keys.API_URL}`,
    text: "",
    html: `<h1>Добро пожаловать</h1>
    <p>Ваш email: ${email}</p>
        <p>Для активации перейдите по <a href="${link}">${link}</a></p>

    `,
  };
};
