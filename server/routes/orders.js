const { Router } = require("express");
const Order = require("../models/order");
const auth = require("../midlleware/auth");

const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({
      "user.userId": req.user._id,
    }).populate("user.userId");

    res.render("orders", {
      title: "Заказы",
      orders: orders.map((o) => ({
        ...o._doc,
        price: o.courses.reduce((a, b) => {
          return (a += b.count * b.course.price);
        }, 0),
      })),

      isOrder: true,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const user = await req.user.populate(["cart.items.courseId"]);
    const courses = user.cart.items.map((i) => ({
      count: i.count,
      course: { ...i.courseId._doc },
    }));
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      courses,
    });

    await order.save();
    await req.user.clearCart();
    res.redirect("/orders");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
