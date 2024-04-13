import React, { useState, useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { Avatar, Badge, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../redux/usersSlice";
import Notifications from "./Notifications";
import { setLoader } from "../redux/loaderSlice";
import {
  GetAllNotifications,
  ReadNotifications,
} from "../apicalls/notifications";
const ProtectedRoutes = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { users } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getNotifications = async () => {
    try {
      const response = await GetAllNotifications();
      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const readNotification = async () => {
    try {
      const response = await ReadNotifications();
      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await GetCurrentUser();
        if (response.success) {
          dispatch(setUsers(response.data));
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
        message.error(error.message);
      }
    };
    validateToken();
    getNotifications();
  }, []);
  return (
    users && (
      <div className="">
        {/*  header */}

        <div className="flex justify-between items-center bg-primary py-6">
          <h1
            onClick={() => navigate("/")}
            className="text-white text-2xl cursor-pointer"
          >
            Fashion
          </h1>
          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
            <i className="ri-shield-user-line"></i>
            <span
              onClick={() => {
                if (users?.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
              className="cursor-pointer underline"
            >
              {users && users?.name}
            </span>
            <Badge
              count={
                notifications?.filter((notification) => !notification.read)
                  .length
              }
              onClick={() => {
                readNotification();
                setShowNotifications(true);
              }}
              className="cursor-pointer"
            >
              <Avatar
                shape="circle"
                icon={<i className="ri-notification-3-line"></i>}
              />
            </Badge>
            {/* <i
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="ri-logout-box-line"
            ></i> */}
          </div>
        </div>

        {/*  body */}
        <div className="p-5">{children}</div>

        {/* notification modal */}

        <Notifications
          notifications={notifications}
          reloadNotifications={getNotifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
      </div>
    )
  );
};

export default ProtectedRoutes;
