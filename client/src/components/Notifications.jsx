import { Modal, message } from "antd";
import React from "react";
import Divider from "./Divider";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DeleteNotification } from "../apicalls/notifications";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loaderSlice";

const Notifications = ({
  reloadNotifications,
  notifications,
  showNotifications,
  setShowNotifications,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteNotification = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteNotification(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        reloadNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            onClick={() => {
              navigate(notification.onClick);
              setShowNotifications(false);
            }}
            className="flex flex-col cursor-pointer  border-slate-300 border border-solid p-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-gray-700">{notification.title}</h1>
                <span className="text-gray-300">{notification.message}</span>
                <h1 className="text-gray-400">
                  {moment(notification.createdAt).fromNow()}
                </h1>
              </div>
              <i
                className="ri-delete-bin-line"
                onClick={() => {
                  deleteNotification(notification._id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default Notifications;
