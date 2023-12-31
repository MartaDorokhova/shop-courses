const { Router } = require("express");
const Course = require("../models/course");
const auth = require("../midlleware/auth");

const router = Router();

function mapCartItems(cart) {
  return cart.items.map((c) => ({
    ...c.courseId._doc,
    id: c.courseId.id,
    count: c.count,
  }));
}

function conputePrice(courses) {
  return courses.reduce((total, course) => {
    total += course.price * course.count;
    return total;
  }, 0);
}

router.post("/add", auth, async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);
  res.redirect("/card");
});

router.get("/", auth, async (req, res) => {
  const user = await req.user.populate(["cart.items.courseId"]);

  const courses = mapCartItems(user.cart);

  res.render("card", {
    title: "Корзина",
    courses: courses,
    price: conputePrice(courses),
    isCard: true,
  });
});

router.delete("/remove:id", auth, async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate(["cart.items.courseId"]);
  const courses = mapCartItems(user.cart);
  const cart = { courses, price: conputePrice(courses) };
  res.status(200).json(cart);
});

module.exports = router;
