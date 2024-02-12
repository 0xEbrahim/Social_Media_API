import express from "express";
const router = express.Router();
import { login, logout, refresh, register } from "../controllers/Auth/Auth.index.js";
import { registerValidator } from "../utils/validation/auth.validator.js";
import { uploadSinglePhoto } from "../functions/multer/multer.js";

router.post("/register",uploadSinglePhoto, register);
router.post('/login', login)
router.get('/logout', logout)
router.get('/refresh', refresh)
export default router;
