import express from "express";

const router = express.Router();

import { registerUser, userLogin } from "../controllers/user.js";

router.post("/register", registerUser);
router.post("/login", userLogin);
export default router;
