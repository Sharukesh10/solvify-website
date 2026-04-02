const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { uploadMedia, getMedia, deleteMedia } = require("../controllers/mediaController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|svg/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error("Only image files are allowed."));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

router.post("/upload", upload.single("image"), uploadMedia);
router.get("/", getMedia);
router.delete("/:id", deleteMedia);

module.exports = router;
