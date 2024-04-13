import Notification from "../models/notification.js";

export const addNotification = async (req, res, next) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.send({
      success: true,
      message: "Notification added successfully",
      data: notification,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// get all notifications

export const getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// delete a notification

export const deleteNotification = async (req, res, next) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// read all notifications

export const readNotifications = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { user: req.body.userId, read: false },
      { $set: { read: true } }
    );

    res.send({
      success: true,
      message: "All notifications read",
    });
  } catch (error) {
    res.send({
      success: true,
      message: error.message,
    });
  }
};
