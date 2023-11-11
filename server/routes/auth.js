const { Router } = require("express");
const keys = require("../keys");
const nodemailer = require("nodemailer");
const uuid = require("uuid");
const regEmail = require("../emails/registration");
const resetEmail = require("../emails/reset");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const crypto = require("crypto"); // усстнавливать не нужно, встроена в nodjs
const { registerValidators, loginValidators } = require("../utils/validators");
const UserController = require("../controllers/user-controller");

const router = new Router();

let transporter = nodemailer.createTransport({
  host: keys.SMTP_HOST,
  port: keys.SMTP_PORT,
  auth: {
    user: keys.SMTP_USER,
    pass: keys.SMTP_PASS,
  },
});

router.post("/logout", UserController.logout);
router.post("/login", loginValidators, UserController.login);
router.post("/register", registerValidators, UserController.registration);
router.post("/reset", async (req, res) => {
  try {
    crypto.randomBytes(32, async (err, buf) => {
      if (err) {
        return res.status(500);
      }

      const token = buf.toString("hex");

      const condidate = await User.findOne({ email: req.body.email });
      if (condidate) {
        condidate.resetToken = token;
        condidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
        await condidate.save();
        await transporter.sendMail(resetEmail(condidate.email, token));
        return res.json({ sendMail: true, token });
      } else {
        return res.status(401).json({
          errors: [
            {
              value: req.body.email,
              msg: "Пользователь не найден",
              param: "email",
              location: "body",
            },
          ],
          message: "Ошибка валидации",
        });
      }
    });
  } catch (error) {
    log.error(error);
  }
});

router.get("/password/:token", async (req, res) => {
  if (!req.params.token) {
    res.status(401).json({ error: "Истек срок действия ссылки" });
  }

  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExp: { $gt: Date.now() },
    });
    if (user) {
      res.json({ checkStatusToken: true });
    } else {
      res.status(401).json({ error: "Истек срок действия ссылки" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/password", async (req, res) => {
  try {
    const condidate = await User.findOne({
      resetToken: req.body.token,
      resetTokenExp: { $gt: Date.now() },
    });
    if (condidate) {
      condidate.password = await bcrypt.hash(req.body.password, 10);
      condidate.resetToken = undefined;
      condidate.resetTokenExp = undefined;
      await condidate.save();
      return res.json({ resetPwd: true });
    } else {
      return res.status(401).json({ error: "Время жизни токена истекло" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
module.exports = router;
