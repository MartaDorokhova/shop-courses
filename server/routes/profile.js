const { Router } = require("express");
const auth = require("../midlleware/auth");
const User = require("../models/user");

const router = Router();

router.get("/", auth, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  return res.json(user);
});

router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const toChange = {
      name: req.body.name,
    };
    if (req.file) {
      toChange.avatarUrl = `images/${req.file.filename}`;
    }
    Object.assign(user, toChange);

    await user.save();
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
