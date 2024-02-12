import multer from "multer";
import fs from "fs";
import { URL } from "url";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, __, callback) => {
    const { baseUrl } = req;
    const isProfilePic =
      baseUrl === "/api/v1/user" || baseUrl === "/api/v1/auth";
    const isPost = baseUrl === "/api/v1/post";
    const isStory = baseUrl === "/api/v1/story";
    callback(
      null,
      path.join(
        __dirname,
        `../../public/${
          isProfilePic ? "profile" : isPost ? "posts" : isStory ? "stories" : ""
        }`
      )
    );
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Math.random() * Date.now() +
        "_" +
        parseInt(
          Math.ceil(Math.random() * Date.now())
            .toPrecision(16)
            .toString()
            .replace(".", "")
        ) +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  )
    cb(null, true);
  else cb({ message: "Unsupported file format" }, false);
};
const uploadSinglePhoto = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 },
  fileFilter,
}).single("image");

const uploadMultiPhotos = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 },
}).array("image");

export { uploadMultiPhotos, uploadSinglePhoto };
