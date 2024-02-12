import asyncHandler from "express-async-handler";
import fs from 'fs'
import cloudinaryUpload from '../functions/Cloudinary/cloudinary.js'
const upl = asyncHandler(async (req, res, next) => {
    const uploader = async (path) => cloudinaryUpload(path, "image");
    const files = req.files;
    const urls = [];
    for(let file of files){
        const {path} = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
    }
    res.status(200).json({message : "Images uploaded successfully.", data : urls})
});

export { upl };
