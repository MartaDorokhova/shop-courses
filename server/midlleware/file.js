const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "images");
  },
  filename(req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const allowesTypes = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  if (allowesTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});
