const { Router } = require("express");
const router = Router();
const Course = require("../models/course");
const auth = require("../midlleware/auth");
const { validationResult } = require("express-validator/check");
const { coursesValidators } = require("../utils/validators");
const ApiError = require("../exeptions/api-error");

router.post("/", auth, coursesValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        Object.assign(
          {},
          { errors: errors.array(), message: "Ошибка валидации" }
        )
      );
  }

  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    userId: req.user.id, // req.user так тоже можно
  });
  try {
    await course.save();
    res.json({ saveCourse: true });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
