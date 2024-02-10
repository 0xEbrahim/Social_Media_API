import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, __, callback) => {
    const { baseUrl } = req;
    const isProfilePic = baseUrl === "/api/v1/user/profile";
    const isPost = baseUrl === "/api/v1/post";
    const isStory = baseUrl === "/api/v1/story";
    callback(
      null,
      `./public/${
        isProfilePic ? "profile" : isPost ? "post" : isStory ? "story" : ""
      }`
    );
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.user.id +
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

const uploadSinglePhoto = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 },
}).single('img');

const uploadMultiPhotos = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 },
}).array();

export {uploadMultiPhotos, uploadSinglePhoto}

