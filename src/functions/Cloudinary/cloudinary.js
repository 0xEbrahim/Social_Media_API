import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRETS,
});

const cloudinaryUpload = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
          url: result.url,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

const uploader = async(path) => cloudinaryUpload(path, "image");
export default uploader;