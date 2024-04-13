import express from "express";
import { authVerification } from "../middleware/authVerification.js";
import {
  addNotification,
  deleteNotification,
  getAllNotifications,
  readNotifications,
} from "../controllers/notification.js";
const router = express.Router();

// add ne notification
router.post("/add-notification", authVerification, addNotification);

// get all notifications

router.get("/get-notifications", authVerification, getAllNotifications);

// delete a notification

router.delete("/delete-notification/:id", authVerification, deleteNotification);

// read all notifications

router.put("/read-all-notifications", authVerification, readNotifications);
export default router;
