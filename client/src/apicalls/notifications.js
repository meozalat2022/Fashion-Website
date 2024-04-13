import { axiosInstance } from "./axiosInstance";

// add new notification

export const AddNotification = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/notifications/add-notification",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all notifications

export const GetAllNotifications = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/notifications/get-notifications"
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete notification

export const DeleteNotification = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/notifications/delete-notification/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// read all notifications

export const ReadNotifications = async () => {
  try {
    const response = await axiosInstance.put(
      "/api/notifications/read-all-notifications"
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
