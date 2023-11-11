export default [
  {
    title: "Главная",
    link: "/",
    visible: ["all"],
  },
  {
    title: "Курсы",
    link: "/courses",
    visible: ["all"],
  },
  {
    title: "Добавить курс",
    link: "/add",
    visible: ["auth"],
  },
  {
    title: "Профиль",
    link: "/profile",
    visible: ["auth"],
  },
  {
    title: "Корзина",
    link: "/cart",
    visible: ["auth"],
  },
  {
    title: "Заказы",
    link: "/order",
    visible: ["auth"],
  },
];
