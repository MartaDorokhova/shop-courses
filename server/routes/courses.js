const { Router } = require("express");
const router = Router();
const Course = require("../models/course");
const mongoose = require("mongoose");
const auth = require("../midlleware/auth");
const { validationResult } = require("express-validator/check");
const { coursesValidators } = require("../utils/validators");

function isOwner(course, req) {
  return course.userId.toString() === req.user.id.toString();
}

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    return res.json({
      courses,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return false;
    const course = await Course.findById(req.params.id);
    return res.json({
      course,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.status(422);
  }

  try {
    const course = await Course.findById(req.params.id);

    if (!isOwner(course, req)) {
      return res.status(422);
    }

    return res.json({
      course,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/edit", auth, coursesValidators, async (req, res) => {
  try {
    const { _id } = req.body;
    delete req.body._id;
    const course = await Course.findById(_id);
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
    if (!isOwner(course, req)) {
      return res.status(422).json({ error: "Курс не пренадлежит владельцу" });
    }
    Object.assign(course, req.body);
    await course.save();
    return res.status(200).json({ editCourse: true });
  } catch (error) {
    console.log(error);
  }
});

router.post("/remove", auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id, userId: req.user.id });

    return res.status(200).json({ removeCourse: true });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
