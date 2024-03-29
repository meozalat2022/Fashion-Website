import express from "express";

const router = express.Router();

import { registerUser, userLogin, getUser } from "../controllers/user.js";
import { authVerification } from "../middleware/authVerification.js";
router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/get-user", authVerification, getUser);
export default router;
