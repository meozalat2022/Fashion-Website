import express from "express";

const router = express.Router();

import {
  registerUser,
  userLogin,
  getUser,
  getUsers,
  userStatusUpdate,
  signOut,
} from "../controllers/user.js";
import { authVerification } from "../middleware/authVerification.js";
router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/get-user", authVerification, getUser);
router.get("/getAllUsers", authVerification, getUsers);
router.put("/updateUserStatus/:id", authVerification, userStatusUpdate);
router.get("/signOut", signOut);
export default router;
