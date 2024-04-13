import mongoose, { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  onClick: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  read: {
    type: Boolean,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
