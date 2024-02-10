import express from "express";
const router = express.Router();
import { register } from "../controllers/Auth/Auth.index.js";
import { registerValidator } from "../utils/validation/auth.validator.js";

router.post("/register", registerValidator, register);

export default router;
